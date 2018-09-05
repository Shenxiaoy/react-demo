import React from 'react'
import {Layout, Menu, Breadcrumb, Icon} from 'antd'
import statics from './static'
import './common.less'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout


export default class Siders extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: false
    }
  }

  
  onCollapse = (collapsed, type) => {
    this.setState({ collapsed })
  }

  menuRender(menuJson, parent) {
    if(!menuJson) {
      return null
    }
    return menuJson.map((item, n) => {
      if(item.list && item.list.length) {
        return (
          <SubMenu key={item.remark} title={<span><Icon type="user" /><span>{item.name}</span></span>}>
            { item.list.length ? this.menuRender(item.list, item) : '' }
          </SubMenu>
        )
      }
      else {
        return <Menu.Item key={item.remark} parent={parent}><Icon type="file" />
          <span>{item.name}</span></Menu.Item>
      }
    })
  }

  render() {
   const {menuContent} = statics
    return <div style={{background: '#404040'}}>
      <Sider
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        collapsible
      >
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['testDemo']}
        >
          {
            this.menuRender(menuContent)
          }

        </Menu>
      </Sider>
    </div>
  }
}