import request from "@/plugins/request/index";

export function UserLogin(data: LoginParams): Promise<string> {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function UserRegister(data: RegisterParams): Promise<null> {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
}

export function UserSendMessage(data: EmailParams): Promise<null> {
  return request({
    url: "/user/sendMessage",
    method: "post",
    params: data,
  });
}
