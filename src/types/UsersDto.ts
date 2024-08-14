export interface UsersDto {
  _id: string;
  login: string;
  password: string;
}

export interface UserTokenDto {
  token: string;
  user: UsersDto;
}
