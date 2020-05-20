import { queryApps } from './services/app';

export const qiankun = queryApps().then(res => {
  const data = res.data;
  data.map(item => {
    item.props = Object.assign({}, item.props, {
      
    })
  })
  return { apps: res.data }
});
