interface LoginParams {
  account: string;
  password?: string;
}

interface Token {
  accessToken: string;
}
interface LoginData extends LoginParams, Token {}

interface EmailParams {
  email: string;
}

interface RegisterParams {
  account: string;
  password?: string;
  checkpassword?: string;
  email: string;
  code: string;
}
