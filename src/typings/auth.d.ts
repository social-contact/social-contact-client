interface LoginParams {
  account: string;
  password: string;
}

interface LoginData extends LoginParams {
  accessToken: string;
}

interface RegisterParams {
  account: string;
  password: string;
  checkpassword: string;
}
