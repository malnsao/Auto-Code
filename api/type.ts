/* eslint-disable camelcase */
/**
 * list接口入参
 */
export interface IListReq {
}

/**
 * list接口回参
 */
export interface IDataRow {
}
export interface IListRes {
  rows: IDataRow[];
  /** 返回条数 */
  total: number;
}

/**
 * add接口入参
 */
export interface IAddReq {
}

/**
 * edit接口入参
 */
export interface IEditReq {
}

/**
 * del接口入参
 */
export interface IDelReq {
}
