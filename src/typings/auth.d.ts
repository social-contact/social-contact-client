interface LoginParams {
  account: string;
  password?: string;
}

interface Token {
  accessToken: string;
}
interface LoginData extends LoginParams, Token {}

interface RegisterParams {
  account: string;
  password?: string;
  checkpassword?: string;
}
