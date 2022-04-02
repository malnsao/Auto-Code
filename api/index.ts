import instance from '@/common/instance';
import { Irequest } from '@/api/common/type';
import { IAddReq, IDelReq, IEditReq, IListReq, IListRes } from './type';
import { notification } from 'tea-component';
import intl from '@/common/intl';

export const getList = async (params: IListReq): Promise<Irequest<IListRes>> => {
  const { data } = await instance({
    method: 'GET',
    params,
  });
  return data;
};

export const add = async (params: IAddReq): Promise<Irequest<any>> => {
  const { data } = await instance({
    method: 'POST',
    data: params,
  });
  notification.success({
    title: intl('SUCCESS'),
    description: intl('CREATED_SUCCESSFULLY'),
  });
  return data;
};

export const edit = async (params: IEditReq): Promise<Irequest<any>> => {
  const { data } = await instance({
    method: 'POST',
    data: params,
  });
  notification.success({
    title: intl('SUCCESS'),
    description: intl('MODIFIED_SUCCESSFULLY'),
  });
  return data;
};

export const del = async (params: IDelReq): Promise<Irequest<any>> => {
  const { data } = await instance({
    method: 'POST',
    data: params,
  });
  notification.success({
    title: intl('SUCCESS'),
    description: intl('SUBMITTED_SUCCESSFULLY'),
  });
  return data;
};
