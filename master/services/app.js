import request from './request';

export async function query() {
  return request('/componentApi/childApp/getChildApps', {
    method: 'POST'
  });
}

export async function queryApps() {
  return request('/componentApi/childApp/getChildApps', {
    method: 'POST'
  });
}

export async function queryNavs() {
  return request('/componentApi/childApp/getMasterNavs', {
    method: 'POST'
  });
}

