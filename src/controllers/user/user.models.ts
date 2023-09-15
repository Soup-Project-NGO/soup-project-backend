import type { IUser } from '@models/index';

export type TCreateUserParams = Omit<IUser, 'id'>;
