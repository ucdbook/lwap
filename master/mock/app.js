export default {
  'GET /api/apps': [
    {
      name: 'app1',
      entry: 'http://localhost:8001/app1',
      base: '/app1',
      mountElementId: 'root-subapp-container',
    },
    {
      name: 'app2',
      entry: 'http://localhost:8002/app2',
      base: '/app2',
      mountElementId: 'root-subapp-container',
      props: {
        testProp: 'test'
      },
    },
    {
      name: 'react16',
      entry: 'http://localhost:7100/react16',
      base: '/react16',
      mountElementId: 'root-subapp-container',
      props: {
        testProp: 'test',
      },
    },
    {
      name: 'pms-platform',
      entry: 'http://localhost:8003/pms-platform',
      base: '/pms-platform',
      mountElementId: 'root-subapp-container',
      props: {
        testProp: 'test',
      },
    },//
    {
      name: 'jmrh',
      entry: 'http://localhost:8006/jmrh/login',
      base: '/jmrh',
      mountElementId: 'root-subapp-container',
      props: {
        testProp: 'test',
      },
    }
  ],
};
