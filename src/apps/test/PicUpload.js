import React from 'react'
import {uploader} from '../../../components/upload/Uploader'


export default class PicUpload extends React.Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }
  componentDidMount() {
    var uploadM = new uploader({
      multiple: true,
      isMD5:true,//允许md5校验
      accept: ["jpg", "png", "mov", "txt","xlsx"],
      onRemove: function() {
        console.log("我是删除回调函数1");
      },
      WHcontrol: {
        control: true,
        Proportion: false,
        width: 2000,
        height: 2000
      },
      maxSize: 50,
      maxFiles: 3,
      businessKey: "TEST",
      loginToken: function () {
        let name='token'
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
          return unescape(arr[2]);
        }
        else {
          return null;
        }
      },
      upContainerId: "shen",
      historyFiles: [
        //回显文件
        {
          name: "test1",
          imgUrl:
            "http://img-test.aixuexi.com/B:TEST:K/bc13f3b957c7459985eaa5dab4bbba71.jpg",
          size: "200k"
        },
        {
          name: "test2",
          imgUrl:
            "http://img-test.aixuexi.com/B:TEST:K/ad1018a4b796455493a55fdfcf6ecdb1.txt",
          size: "300k"
        }
      ]
    })
    uploadM.init()
  }

  render() {
    console.log('------')
    return <div>
      <div id="shen"></div>
      <br/>
      <div>
        <input type="file" style={{display: 'none'}}/>
        <button>上传</button>
      </div>
    </div>
  }
}