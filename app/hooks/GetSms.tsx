import {getSMS} from '../api/api';

export const GetSms = async (phone: any, cmd: string) => {
  return await getSMS(phone, cmd);
};
