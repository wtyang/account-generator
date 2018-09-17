import React, { Component } from 'react';

import './App.css';
import AccountGenerator from './pages/accout/generator'
import { LocaleProvider, Layout, Menu, Icon} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false
  };
  
  /**
   * 伸展菜单
   *
   * @memberof App
   */
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <LocaleProvider locale={zhCN}>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>用户信息生成器</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={()=>window.location.href='http://wtyang.com/AA'}>
              <Icon type="calculator" />
              <span>外卖计算器</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <AccountGenerator></AccountGenerator>
          </Content>
        </Layout>
      </Layout>
      </LocaleProvider>
    );
  }
}

export default App;
