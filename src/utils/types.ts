 
export interface IPropChild{
    children: React.ReactNode
}

export interface IStore<T>{
    key: string;
    store: T;
    setStore: (payload: Partial<T >) => void;
}


export interface IUser {
    id: string;
    tel: string;
    name: string;
    desc: string;
    avatar: string;
    refetchHandler: () => void;
    currentOrg?: string;
}

export interface IPage {
    pageNum: number;
    pageSize: number;
    total: number;
}

export interface IStore<T>{
    key: string;
    store: T;
    setStore: (payload: Partial<T >) => void;
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

// IOrganization中的所有属性均是可选属性
// type开头的一律用T开头
export type TBaseOrganization = Partial<IOrganization>;

// __typename?: 'Query'：可选字段，表示类型名为 'Query'。这是 GraphQL 查询中特有的类型标识符，用来明确查询返回的类型。
export type TOrgsQuery = { [key: string]: { __typename?: 'Query', data: IOrganization[], page: IPage } };

export type TOrgQuery = { [key: string]: { __typename?: 'Query', data: IOrganization } };

// 学员字段结构
export interface IStudent{
    name: string;
    id: string;
    avatar: string;
    account: string;
    tel: string;
}

export type TStudentQuery = { [key: string]: { __typename?: 'Query', data: IStudent[], page: IPage } };

// 课程预约周
export interface ICourse{
    id: string;
    name: string;
    desc: string;
    group: string;
    baseAbility: string;
    limitNumber: number;
    duration: number;
    reserveInfo: string;
    refundInfo: string;
    otherInfo: string;
    reducibleTime: IWeekCourse[];
}

export type TBaseCourse = Partial<ICourse>;

export type TCoursesQuery = { [key: string]: { __typename?: 'Query', data: ICourse[], page: IPage } };

export type TCourseQuery = { [key: string]: { __typename?: 'Query', data: ICourse } };

export type TWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface IDay {
    key: TWeek;
    label: string;
  }
  
export const DAYS: IDay[] = [
    {
        key: 'monday',
        label: '周一',
    },
    {
        key: 'tuesday',
        label: '周二',
    },
    {
        label: '周三',
        key: 'wednesday',
    },
    {
        label: '周四',
        key: 'thursday',
    },
    {
        label: '周五',
        key: 'friday',
    },
    {
        label: '周六',
        key: 'saturday',
    },
    {
        label: '周日',
        key: 'sunday',
    },
];

export interface IOrderTime{
    startTime: string;
    endTime: string;
    key: number;
}

export interface IWeekCourse{
    week: TWeek;
    orderTime: IOrderTime[];
}

export interface ICard{
    id: string;
    name: string;
    type: string;
    time: number;
    validityDay: number;
}

export type TBaseCard = Partial<ICard>;

export type TCardsQuery = { [key: string]: { __typename?: 'Query', data: ICard[], page: IPage } };

export type TCardQuery = { [key: string]: { __typename?: 'Query', data: ICard } };

/**
 * 商品类型
 */
export interface IProduct {
  id: string;
  limitBuyNumber: number;
  name: string;
  coverUrl?: string;
  bannerUrl?: string;
  desc: string;
  originalPrice: number;
  stock: number;
  preferentialPrice: number;
}

export type TBaseProduct = Partial<IProduct>;

export type TProductsQuery = { [key: string]: { __typename?: 'Query', data: IProduct[], page: IPage } };

export type TProductQuery = { [key: string]: { __typename?: 'Query', data: IProduct, page: IPage } };