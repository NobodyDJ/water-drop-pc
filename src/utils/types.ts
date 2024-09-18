/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPropChild{
    children: React.ReactNode
}

export interface IUser {
    id: string;
    tel: string;
    name: string;
    desc: string;
    avatar: string;
    refetchHandler?: () => void;
    currentOrg?: string;
}

export interface IPage {
    pageNum: number;
    pageSize: number;
    total: number;
}

export interface IStore{
    key: string;
    store: Record<string, any>;
    setStore: (payload: Record<string, any>) => void;
}

export interface IMedia {
    id: string;
    url: string;
    remark: string;
}

export interface IOrganization {
    id: string;
    orgFrontImg?: IMedia[];
    orgRoomImg?: IMedia[];
    orgOtherImg?: IMedia[];
    name: string;
    logo: string;
    tags?: string;
    description?: string;
    address?: string;
    tel?: string;
    longitude?: string;
    latitude?: string;
    identityCardBackImg:string
    identityCardFrontImg:string
    businessLicense:string
}

// __typename?: 'Query'：可选字段，表示类型名为 'Query'。这是 GraphQL 查询中特有的类型标识符，用来明确查询返回的类型。
export type TOrgsQuery = { [key: string]: { __typename?: 'Query', data: IOrganization[], page: IPage } };