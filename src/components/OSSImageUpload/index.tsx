import React, { useRef } from 'react';
import type { UploadFile, UploadProps } from 'antd';
import { Upload } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_OSS_INFO } from '@/graphgql/oss';
import ImgCrop from 'antd-img-crop';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

// 单个文件上传
interface OSSUploadProps {
  value?: UploadFile;
  onChange?: (fileList: UploadFile) => void;
}

const OSSImageUpload = ({ value, onChange }: OSSUploadProps) => {
    // 泛型确定数据返回类型
    const { data, refetch } = useQuery<{ getOSSInfo: OSSDataType }>(GET_OSS_INFO);
    const key = useRef('');// 生成一个初始值
  // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html
    const OSSData = data?.getOSSInfo;

    const handleChange: UploadProps['onChange'] = ({ file }) => {
        const newFile = {
            ...file,
            url: `${OSSData?.host}/${key.current}`
        }
        onChange?.(newFile);
    };

    // const onRemove = (file: UploadFile) => {
    //     const files = (value || []).filter((v) => v.url !== file.url);

    //     if (onChange) {
    //         onChange(files);
    //     }
    // };

    const getExtraData: UploadProps['data'] = (file) => {
        // 获取文件的后缀
        const suffix = file.name.slice(file.name.lastIndexOf('.'));
        const filename = Date.now() + suffix;
        key.current = `${OSSData?.dir}${filename}`
        return {
            key: key.current,
            OSSAccessKeyId: OSSData?.accessId,
            policy: OSSData?.policy,
            Signature: OSSData?.signature,
        }
    };

    const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
        if (!OSSData) return false;

        const expire = Number(OSSData.expire) * 1000;

        if (expire < Date.now()) {
        await refetch();
        }

        // const suffix = file.name.slice(file.name.lastIndexOf('.'));
        // const filename = Date.now() + suffix;
        // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // // @ts-expect-error
        // file.url = OSSData.dir + filename;

        return file;
    };

    return (
        <ImgCrop rotationSlider>
            <Upload
                name="file"
                listType="picture-card"
                fileList={value ? [value] : []}
                action={OSSData?.host}
                onChange={handleChange}
                data={getExtraData}
                beforeUpload={beforeUpload}
        >
            {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}
            + 替换头像
        </Upload>
        </ImgCrop>
    );
};

export default OSSImageUpload;