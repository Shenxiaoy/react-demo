import React from 'react'
import {Layout, Menu, Breadcrumb, Icon} from 'antd'
import LeftSider from './Sider'
import RightContent from './Content'
import './common.less'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout


export default class Siders extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <div>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '5px 5px 0px 0px', background: '#fff', minHeight: '100vh' }}>
            <LeftSider />

            <Layout style={{ padding: '10px 10px 0px 10px'}}>
              <Content style={{ background: '#fff'}}>
                <div>{this.props.children}</div>
              </Content>
            </Layout>
            
          </Layout>
        </Content>

        {/*<Footer style={{ textAlign: 'center' }}>*/}
          {/*Ant Design ©2018 Created by Ant UED*/}
        {/*</Footer>*/}
      </Layout>
    </div>
  }
}