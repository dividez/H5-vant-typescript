import { http } from "@/utils/http";

export interface LoginParams {
  code?: any;
}

export function getJsSdkConfig(params?: object): Promise<any> {
  return http.request({
    url: "/v1/webpage/jssdk-config",
    method: "post",
    data: params
  });
}

export function loginApi(params: LoginParams): Promise<any> {
  return http.request({
    url: "/v1/webpage/login",
    method: "post",
    data: params
  });
}

export function getAuthUrl(params?: object): Promise<any> {
  return http.request({
    url: "/v1/webpage/auth-url",
    method: "post",
    data: params
  });
}

export function getUserInfoApi(params?: any): Promise<any> {
  return http.request({
    url: "/v1/profile",
    method: "get",
    params
  });
}
