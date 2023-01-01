interface LoginParams {
  account: string;
  password: string;
}

interface LoginData extends LoginParams {
  accessToken: string;
}
