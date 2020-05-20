import tfRequest from 'tf-request';
import { message } from 'antd';

// url: 请求地址
// opts: 一些配置项, 具体参考: http://10.77.0.105:4873/-/web/detail/tf-request
// codes: 后端返回的code如果在该数组中, 则不会提示报错信息, 说明是正确返回
export function request(url = '', opts = {}, codes = [0, '']) {

  // 在该数组中的, 通过拦截, 不自动提示报错信息
  codes = [].concat(codes);

  return tfRequest(url, {
    type: 'json',
    csrfUrl: '/tfPassParkBasicAdmin/logincs/getCsrfTokenKey',
    hasCsrf(url) {
      // 是否需要csrf, 以及做一些特殊处理
      return false;
    },
    csrf(data, csrfType) {
      // 可选, 返回请求需要拼接的csrf参数, 默认为:
      return { csrfType, csrfToken: data.code };
    },
    interceptResponse(data) {
      //  拦截返回的请求做处理
      let { code, msg } = data;

      
      return data;
    },
    ...opts,
  });
}

export default request;