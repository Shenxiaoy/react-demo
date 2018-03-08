// 入口js

import {uploader} from "./Uploader";

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
  upContainerId: "upWrap1",
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
});

// var uploadM2 = new uploader({
//   multiple: false,
//   accept: ["jpg", "png", "mov", "txt", "xlsx","js"],
//   onRemove: function() {
//     console.log("我是删除回调函数2");
//   },
//   WHcontrol: {
//     control: true,
//     Proportion: false,
//     width: 2000,
//     height: 2000
//   },
//   maxSize: 50,
//   maxFiles: 2,
//   businessKey: "TEST",
//   loginToken: '',
//   upContainerId: "upWrap2",
//   historyFiles: [
//     //回显文件
//     {
//       name: "test1",
//       imgUrl:
//         "http://img-test.aixuexi.com/B:TEST:K/bc13f3b957c7459985eaa5dab4bbba71.jpg",
//       size: "200k"
//     }
//   ]
// });


  uploadM.init();
  // uploadM2.init();