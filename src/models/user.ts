import type { TRole, IAddress } from '@models/index';

export interface IUser {
  id: string;
  name: string;
  surname: string;
  sector: string;
  role: TRole;
  address: IAddress;
  phone: string;
  email?: string;
  password: string;
  isInterviewer: string;
}