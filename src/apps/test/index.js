import React from 'react'
import {render} from 'react-dom'
import {Table, Menu, Row, Col, message} from 'antd'
import PicUpload from './PicUpload'

class Manage extends React.Component {
    constructor() {
        super()
    }

    render() {
        return <div>
            ok-666
            <div>
                <PicUpload/>
            </div>
        </div>
    }
}
render(<Manage/>, document.getElementById('root'))