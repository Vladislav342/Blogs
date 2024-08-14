import { UsersDto } from './UsersDto';

export type UserDataDto = Omit<UsersDto, '_id'>;
