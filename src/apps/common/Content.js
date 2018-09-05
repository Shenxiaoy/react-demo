import React from 'react'
import {Layout, Menu, Breadcrumb, Icon} from 'antd'
import './common.less'

const { SubMenu } = Menu
const { Header, Content, Footer } = Layout


export default class extends React.Component {
  constructor() {
    super()
  }


  render() {
    return <Layout style={{ padding: '10px 10px 0px 10px'}}>

      <Content style={{ background: '#fff'}}>
         <div>111111111111111111111</div>
      </Content>
     
    </Layout>
  }
}