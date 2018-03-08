/*
* @rows                输入框的行数
* @cols                 输入框的宽度
* @defaultValue            输入框的默认回显
* @autoSize                   是否高度自适应  true: 自适应， false: 不自适应
* @onChange                       参数：e
*
* */




import React from 'react'
import '../styles.less'

export default class TextAreas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            height: null,
            rowHeight: null
        }
    }

    handleChange=(e)=>{
        this.props.onChange(e)
      if(this.props.autoSize) {
          const {rowHeight} = this.state
          let textHeight = this.refs.textarea.scrollHeight
          if(textHeight >rowHeight*2) {
              this.setState({height: textHeight})
          }
      }
    }

    componentDidMount() {
       if(this.props.autoSize) {
           let textHeight = this.refs.textarea.scrollHeight
           let rowHeight = textHeight/2
           this.setState({rowHeight})
       }
    }

    render() {
        const { rows, defaultValue, cols, placeHolder, autoSize} = this.props
        return autoSize ? <textarea
            className="t_area"
            style={{height: this.state.height && this.state.height }}
            ref="textarea"
            rows={rows}
            cols={cols}
            defaultValue={defaultValue}
            placeholder={placeHolder}
            onChange={this.handleChange}>

        </textarea> :
            <textarea
                rows={rows}
                cols={cols}
                defaultValue={defaultValue}
                placeholder={placeHolder}
                onChange={this.handleChange}
                >

        </textarea>
    }
}