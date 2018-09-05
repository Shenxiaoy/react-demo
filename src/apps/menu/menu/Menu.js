import React from 'react'
import {Menu, Icon} from 'antd'


const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const MenuItem = Menu.Item

export default class Menus extends React.Component {
  constructor() {
    super()
  }

  handleClick = (value) => {
    console.log('click ', value.key)
    console.log('click ', this.props)
    this.props.history.push('/notice')

  }
  
  render() {
    return <div>
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['react-demo']}
        mode="inline"
      >

        <MenuItem key="description">
          <Icon type="pie-chart"/>
          <span>介绍</span>
        </MenuItem>

        <SubMenu key="react-demo" title={<span><Icon type="setting" /><span>react demo</span></span>}>
          <Menu.Item key="redux">redux</Menu.Item>
          <Menu.Item key="mobx">mobx</Menu.Item>
          <Menu.Item key="react-dnd">react-dnd</Menu.Item>
          <Menu.Item key="edit">edit</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>undefined</span></span>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>undefined</span></span>}>
          <MenuItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    </div>
  }
}