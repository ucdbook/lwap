import { query, queryNavs } from '@/services/app';
import { qiankunStart } from 'umi';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  namespace: 'base',

  state: {
    name: '魔方-前端设计组件库',
    apps: [],
    navs: [],
  },

  effects: {
    *getApps(_, { put }) {

      const res = yield query();
      yield put({
        type: 'getAppsSuccess',
        payload: {
          apps: res.data,
        },
      });

      // 模拟手动控制 qiankun 启动时机的场景, 需要 defer 配置为 true
      setTimeout(qiankunStart, 200);
    },

    *getNavs(_, { put }) {
      const res = yield queryNavs();

      console.log(222,res);
      yield put({
        type: 'getNavsSuccess',
        payload: {
          navs: res.data,
        },
      });

      // 模拟手动控制 qiankun 启动时机的场景, 需要 defer 配置为 true
      setTimeout(qiankunStart, 200);
    },
  },

  reducers: {
    getAppsSuccess(state, { payload }) {
      state.apps = payload.apps;
    },
    getNavsSuccess(state, { payload }) {
      state.navs = payload.navs;
    },
  },
};
