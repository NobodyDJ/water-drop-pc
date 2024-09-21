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
    value?: UploadFile[];
    label?: string;
    maxCount?: number;
    imgCropAspect?: number;
    onChange?: (fileList: UploadFile[]) => void;
}

const UploadImage = ({label, maxCount, value, imgCropAspect, onChange }: OSSUploadProps) => {
    // 泛型确定数据返回类型
    const { data, refetch } = useQuery<{ getOSSInfo: OSSDataType }>(GET_OSS_INFO);
  // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html
    const OSSData = data?.getOSSInfo;

    const getKey = (file: UploadFile) => {
        const suffix = file.name.slice(file.name.lastIndexOf('.'));
        const key = `${OSSData?.dir}${file.uid}${suffix}`;
        const url = `${OSSData?.host}/${key}`;
        return {key, url}
    }

    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
        const newFile = fileList.map((file) => {
            return {
                ...file,
                url: file.url || getKey(file).url
            }
        })
        onChange?.(newFile);
    };

    const getExtraData: UploadProps['data'] = (file) => {
        return {
            key: getKey(file).key,
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
        <ImgCrop rotationSlider aspect={imgCropAspect ? imgCropAspect : 1}>
            <Upload
                name="file"
                listType="picture-card"
                maxCount={maxCount? maxCount : 1}
                fileList={value ? value : []}
                action={OSSData?.host}
                onChange={handleChange}
                data={getExtraData}
                beforeUpload={beforeUpload}
            >
                + {label ? label : '上传图片'}
            </Upload>
        </ImgCrop>
    );
};

export default UploadImage;