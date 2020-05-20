import { Breadcrumb, Layout, Menu } from 'antd';
import { connect } from 'dva';
import React from 'react';
import { Link } from 'umi';
import style from './style.less';

const { Header, Content, Footer, Sider } = Layout;

const renderSubMenus = (selectKey, navs, pathname) => {
  let subNavs = [];
  navs.map(item => {
    if(item.path === selectKey) {
      subNavs = item.children;
    }
  })

  return (
    <Menu mode="inline" defaultSelectedKeys={[pathname]} style={{ height: '100%', borderRight: 0 }}>
      {subNavs.map(nav => {
        return (
          <Menu.Item key={nav.path}>
            <Link to={nav.path}>{nav.title}</Link>
          </Menu.Item>
        );
      })}
  </Menu>
  );
};

const getHeaderSelectKey = (pathname, navs, parent) => {
  let parentPath;
  navs.map(item => {
    if(item.path === pathname) {
      parentPath = parent && parent.path ? parent.path : item.path;
    }
    else if(item.children) {
      parentPath = parentPath || getHeaderSelectKey(pathname, item.children, item);
    }
  })
  return parentPath;
}

@connect(({ base }) => ({ base }))
export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch({
      type: 'base/getNavs',
    });
  }

  render() {
    const { location, children, base } = this.props;
    const { name, navs } = base;

    const headerSelectKey = getHeaderSelectKey(location.pathname, navs);

    return (
      <Layout className={style.layout}>

        <Header className={style.header}>
          <div className={style.logo}>{name}</div>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            selectedKeys={[headerSelectKey]}
            style={{ lineHeight: '64px' }}
          >
            {navs.map(nav => {
              return (
                <Menu.Item key={nav.path}>
                  <Link to={nav.path}>{nav.title}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Header>
        <Layout>
        <Sider width={250} className={style.sider}>
            {renderSubMenus(headerSelectKey, navs, location.pathname)}
        </Sider>
        <Content className={style.content}>
          {// 加载master pages，此处判断较为简单，实际需排除所有子应用base打头的路径
            headerSelectKey === '/' ? children : null}
          {navs.length ? <div id="root-subapp-container"/> : null}
        </Content>
        </Layout>
        </Layout>
    );
  }
}
