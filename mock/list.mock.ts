import { defineMock } from "vite-plugin-mock-dev-server";
import Mock from "mockjs";

export default defineMock([
  {
    url: "/dev-api/list/get",
    delay: 1000,
    body: {
      code: 0,
      message: "OK",
      result: Mock.mock({
        "list|10": [
          {
            "id|+1": 1
          }
        ]
      })
    }
  },
  {
    url: "/dev-api/list/error",
    delay: 1000,
    body: {
      code: 1,
      message: "ERROR",
      result: null
    }
  },
  {
    url: "/dev-api/v1/webpage/jssdk-config",
    method: "POST",
    delay: 1000,
    body: {
      appId: "wxa23fc5cddf6a74b1",
      nonceStr: "ykKxAxKCFgVDzivU",
      timestamp: 1708997425,
      url: "https://xxxx.cn/demo?code=061WlPGa1MPyYG0jHGGa1DvXov4WlPGW&state=vNBf85uhlChO",
      signature: "0ed7eb7294bbfe5a013a540e94cafa3f53d055cd"
    }
  },
  {
    url: "/dev-api/v1/webpage/auth-url",
    method: "POST",
    delay: 1000,
    body(req) {
      const body = req.body
      return {
        url: body['redirectUri'] + `&code=${Mock.Random.guid()}&state=123123123`
      };
    },
    status: 200
  },
  {
    url: "/dev-api/v1/webpage/login",
    method: "POST",
    delay: 1000,
    body: {
      success: true,
      code: 0,
      message: "登录成功",
      token: "cmj9rheh8kncwjwfel12ydjmtltcpzf5a"
    },
    status: 200
  },
  {
    url: "/dev-api/v1/profile",
    delay: 1000,
    status: 200,
    body: {
      id: Mock.Random.id(),
      name: Mock.Random.name(),
      avatarUrl:
          "https://xxx.com",
      mobile: "176****1664",
      account: "aas123123",
    }
  },
]);
