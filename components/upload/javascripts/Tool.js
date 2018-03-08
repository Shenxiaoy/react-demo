var moxie = require('./moxie');
var plupload = require('./plupload.dev');
var qiniu = require('./qiniu');
var SparkMD5 = require('./spark-md5.min.js');

/**initConfig uploader初始化配置对象
 * @Tool:工具方法集合
 * @keyUrl:请求服务器获取key值的url
 * @BucketSpaceUrl:请求服务器获取上传空间信息的url
 * @UploadTokenUrl:请求服务器获取上传Token的url
 */
export var initConfig = {
  Tool: {
    // 服务端通过CORS解决跨域请求
    ajaxRequest: function (params) {
      params = params || {};
      params.data = params.data || {};
      // 判断是ajax请求还是jsonp请求
      var json = params.jsonp ? jsonp(params) : json(params);
      // ajax请求
      function json(params) {
        // 请求方式，默认是GET
        params.type = (params.type || "GET").toUpperCase();
        // 避免有特殊字符，必须格式化传输数据
        params.data = formatParams(params.data);
        var xhr = null;

        // 实例化XMLHttpRequest对象
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else {
          // IE6及其以下版本
          xhr = new ActiveXObjcet("Microsoft.XMLHTTP");
        }
        // 监听事件，只要 readyState 的值变化，就会调用 readystatechange 事件
        xhr.onreadystatechange = function () {
          // readyState属性表示请求/响应过程的当前活动阶段，4为完成，已经接收到全部响应数据
          if (xhr.readyState == 4) {
            var status = xhr.status;
            // status：响应的HTTP状态码，以2开头的都是成功
            if (status >= 200 && status < 300) {
              var response = "";
              // 判断接受数据的内容类型
              var type = xhr.getResponseHeader("Content-type");
              if (type.indexOf("xml") !== -1 && xhr.responseXML) {
                response = xhr.responseXML; //Document对象响应
              } else if (type === "application/json") {
                response = JSON.parse(xhr.responseText); //JSON响应
              } else {
                response = xhr.responseText; //字符串响应
              }
              // 成功回调函数
              params.success && params.success(response);
            } else {
              params.error && params.error(status);
            }
          }
        };

        // 连接和传输数据
        if (params.type === "GET") {
          // 三个参数：请求方式、请求地址(get方式时，传输数据是加在地址后的)、是否异步请求(同步请求的情况极少)；
          xhr.open(params.type, params.url + "?" + params.data, params.async);
          // 设置loginToken
          // xhr.setRequestHeader("token", params.token);
          xhr.send(null);
        } else {
          xhr.open(params.type, params.url, true);
          //必须，设置提交时的内容类型
          xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
          );
          // 传输数据
          xhr.send(params.data);
        }
      }

      //格式化参数
      function formatParams(data) {
        var arr = [];
        for (var name in data) {
          // encodeURIComponent() ：用于对 URI 中的某一部分进行编码
          arr.push(
            encodeURIComponent(name) + "=" + encodeURIComponent(data[name])
          );
        }
        // 添加一个随机数参数，防止缓存
        arr.push("v=" + random());
        return arr.join("&");
      }

      // 获取随机数
      function random() {
        return Math.floor(Math.random() * 10000 + 500);
      }
    },
    /**
    * 设置cookie值
    * @param  key       键名
    * @param  value     键值
    * @param  exp       cookie过期时间
    */
    setCookie: function (key, value, exp) {
      var date = new Date();
      date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
      document.cookie = key + "=" + value + expires + "; path=/";
    },
    getCookie: function (name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
      }
      else {
        return null;
      }
    },
    // 插入上传后的文件行
    insRow: function (file, isImg, thisUpModel, isHistory) {
      var sizeCell = "", linkCell = "", imgCell = "", delCell = "";
      if (isHistory) {
        sizeCell = file.size;
        linkCell = `<a target='_block' href='${file.imgUrl}'>${file.imgUrl}</a>`;
      } else {
        sizeCell = plupload.formatSize(file.size).toUpperCase();
        linkCell = `<div class='container' id='container'><div class='time' id='${thisUpModel.userConfig.upContainerId}bar' style='width:1%;'></div></div>`;
      }
      delCell = `<a  id='${thisUpModel.userConfig.upContainerId}fileTable-delRow'   herf='javascript:;'>删除</a>`;

      if (isImg) {
        imgCell = isHistory ? `<img class='td-img' src='${file.imgUrl}'>` : `<img class='td-img' src='https://q-fe.aixuexi.com/uploader/default.png'>`;
      } else {
        imgCell = `<img class='default-img td-img' src='https://q-fe.aixuexi.com/uploader/default.png'>`;
      }

      var x = document.getElementById(`${thisUpModel.userConfig.upContainerId}fileTable`)
        .insertRow(1);
      x.insertCell(0).innerHTML = imgCell;
      x.insertCell(1).innerHTML = file.name;
      x.insertCell(2).innerHTML = sizeCell;
      x.insertCell(3).innerHTML = linkCell;
      x.insertCell(4).innerHTML = delCell;
      // delete
      document
        .getElementById(`${thisUpModel.userConfig.upContainerId}fileTable-delRow`)
        .addEventListener("click", function () {
          initConfig.Tool.delFile(
            this.parentNode.parentNode.rowIndex,
            thisUpModel.userConfig.onRemove(),
            thisUpModel
          );
        });
      // pre-view
      var tdimgs = document.getElementsByClassName("td-img")
      for (let i = 0, n = tdimgs.length; i < n; i++) {
        tdimgs[i].addEventListener("click", function () {
          var url = this.src
          initConfig.Tool.showPreView(url, 'block')
        })
      }
    },

    // 已存在文件插入
    insRowUrl: function (file, isImg, thisUpModel, ) {
      var sizeCell = "", linkCell = "", imgCell = "", delCell = "";
      delCell = `<a  id='${thisUpModel.userConfig.upContainerId}fileTable-delRow'   herf='javascript:;'>删除</a>`;
      if (isImg) {
        imgCell = `<img class='td-img' src='https://q-fe.aixuexi.com/uploader/default.png'>`;
      } else {
        imgCell = `<img class='default-img td-img' src='https://q-fe.aixuexi.com/uploader/default.png'>`;
      }

      var x = document.getElementById(`${thisUpModel.userConfig.upContainerId}fileTable`)
        .insertRow(1);
      x.insertCell(0).innerHTML = imgCell;
      x.insertCell(1).innerHTML = file.name;
      x.insertCell(2).innerHTML = sizeCell;
      x.insertCell(3).innerHTML = linkCell;
      x.insertCell(4).innerHTML = delCell;
      // delete
      document
        .getElementById(`${thisUpModel.userConfig.upContainerId}fileTable-delRow`)
        .addEventListener("click", function () {
          initConfig.Tool.delFile(
            this.parentNode.parentNode.rowIndex,
            thisUpModel.userConfig.onRemove(),
            thisUpModel
          );
        });
      // pre-view
      var tdimgs = document.getElementsByClassName("td-img")
      for (let i = 0, n = tdimgs.length; i < n; i++) {
        tdimgs[i].addEventListener("click", function () {
          var url = this.src
          initConfig.Tool.showPreView(url, 'block')
        })
      }
    },
    // 删除文件
    delFile: function (rowIndex, callBackFunc, thisUpModel) {
      var table = document.getElementById(`${thisUpModel.userConfig.upContainerId}fileTable`);
      table.deleteRow(rowIndex);
      callBackFunc;
    },
    // 判断是否是图片格式
    isImage: function (url) {
      var res,
        suffix = "";
      var imageSuffixes = ["png", "jpg", "jpeg", "gif", "bmp"];
      var suffixMatch = /\.([a-zA-Z0-9]+)(\?|\@|$)/;

      if (!url || !suffixMatch.test(url)) {
        return false;
      }
      res = suffixMatch.exec(url);
      suffix = res[1].toLowerCase();
      for (var i = 0, l = imageSuffixes.length; i < l; i++) {
        if (suffix === imageSuffixes[i]) {
          return true;
        }
      }
      return false;
    },
    // 检测当前文件格式是否上传受限
    checkFileType: function (up, file, thisUpModel) {
      const { accept } = thisUpModel.userConfig;
      const upTypes =
        accept &&
        accept.some(item => {
          return (
            file.name
              .split(".")
              .pop()
              .toLowerCase() == item
          );
        });

      if (!upTypes) {
        initConfig.Tool.showErrorTips("只允许上传[" + accept + "]类型的文件");
        up.stop();
        up.removeFile(file.id);
        return false;
      }
      return true;
    },
    // 检测文件大小
    checkFileSize: function (up, file, thisUpModel) {
      if (thisUpModel.userConfig && thisUpModel.userConfig.maxSize) {
        const { maxSize } = thisUpModel.userConfig;
        const isLt2M = file.size / 1024 / 1024 < maxSize - 0;
        if (!isLt2M) {
          initConfig.Tool.showErrorTips("文件大小不能超过" + maxSize + "M!");
          up.stop();
          up.removeFile(file.id);
          return false;
        }
      }
      return true;
    },
    // 检测文件个数是否受限
    checkFilesNum: function (up, file, thisUpModel) {
      if (
        thisUpModel.userConfig &&
        thisUpModel.userConfig.multiple &&
        thisUpModel.userConfig.maxFiles
      ) {
        const { maxFiles } = thisUpModel.userConfig;
        if (up.files.length - up.total.uploaded > maxFiles - 0) {
          initConfig.Tool.showErrorTips("最多上传" + maxFiles + "个文件");
          up.stop();
          up.removeAllFile();
          return false;
        }
      }
      // up.removeAllFile();
      return true;
    },
    // 进度条加载
    setProgress: function (percent) {
      var self = this;
      var bar = document.getElementById("bar");
      if (bar) {
        bar.style.width = parseInt(percent) + "%";
        bar.innerHTML = bar.style.width;
        if (bar.style.width >= "98%") {
          clearTimeout(jindu);
          return;
        }
        var jindu = setTimeout("self.setProgress", 3000);
      }
    },
    // 上传前检查图片、进度条展示
    progressShow: function (up, file, thisUpModel) {
      // 文件类型、文件大小、文件个数校验
      if (
        !initConfig.Tool.checkFileType(up, file, thisUpModel) ||
        !initConfig.Tool.checkFileSize(up, file, thisUpModel) ||
        !initConfig.Tool.checkFilesNum(up, file, thisUpModel)
      ) {
        return false;
      }
      var isImg = false;
      var url = file.name;
      if (initConfig.Tool.isImage(url)) {
        isImg = true;
        // 图片尺寸校验
        if (thisUpModel.userConfig.WHcontrol.control) {
          var nativeFile = file.getNative();
          var img = new Image();
          img.src = URL.createObjectURL(nativeFile);
          img.onload = function () {
            var width = img.naturalWidth;
            var height = img.naturalHeight;
            // 图片尺寸校验：1.比例，2.宽高
            var ckProportion =
              thisUpModel.userConfig.WHcontrol.Proportion &&
              thisUpModel.userConfig.WHcontrol.width /
              thisUpModel.userConfig.WHcontrol.height ==
              width / height;
            var ckSize =
              thisUpModel.userConfig.WHcontrol.width >= width &&
              thisUpModel.userConfig.WHcontrol.height >= height;
            if (
              (thisUpModel.userConfig.WHcontrol.Proportion && !ckProportion) ||
              !ckSize
            ) {
              initConfig.Tool.showErrorTips("上传图片的尺寸不满足条件:" + file.name);
              up.removeFile(file);
              return false;
            } else {
              //校验通过
              initConfig.Tool.insRow(file, isImg, thisUpModel);
            }
          };
        } else {
          //不做图片尺寸校验
          initConfig.Tool.insRow(file, isImg, thisUpModel);
        }
      } else {
        initConfig.Tool.insRow(file, isImg, thisUpModel);
      }
    },
    // 获取上传资源的key
    getKeyFromServer: function (up, businessKey, file, md5, thisUpModel) {
      var key = "";
      var data = {
        businessKey: businessKey,
        originalFileName: file.name
      };
      if (md5) {
        data = Object.assign({}, data, { digest: md5 });
      }

      try {
        //获取上传空间(需要businessKey) ，返回 空间类型"bucketType":"QINIU", 空间名称"bucketName":"axx-test"
        initConfig.Tool.ajaxRequest({
          url: initConfig.keyUrl,
          type: "GET",
          async: false,
          data: data,
          success: function (res) {
            res = JSON.parse(res);
            if (res.body.exist) {//文件已存在
              up.removeFile(file.id)
              // 直接插入一行数据
              console.log(111)
              return false;
            } else {
              key = res.body.key;
            }
          },
          error: function (error) {
            console.log(error);
          }
        });
      } catch (err) {
        console.log("获取key出错了:" + err);
      }
      return key;
    },
    // 获取上传空间(需要businessKey) ，返回 空间类型"bucketType":"QINIU", 空间名称"bucketName":"axx-test"
    getBucketSpace: function (businessKey, thisUpModel) {
      return new Promise((resolve, reject) => {
        try {
          initConfig.Tool.ajaxRequest({
            url: initConfig.BucketSpaceUrl,
            type: "GET",
            // token: thisUpModel.userConfig.loginToken,
            async: true,
            data: { businessKey: businessKey },
            success: function (res) {
              res = JSON.parse(res);
              thisUpModel.bucketType = res.body.bucketType;
              thisUpModel.bucketName = res.body.bucketName;
              resolve();
            },
            error: function (error) {
              console.log("getBucketSpace ERROR:", error);
            }
          });
        } catch (err) {
          console.log("获取上传空间出错了:" + err);
        }
      });
    },
    // 获取UploadToken(需要bucketName)，返回"upload_token":"token-content"
    getUploadToken: function (businessKey, bucketType, bucketName, thisUpModel) {
      return new Promise((resolve, reject) => {
        try {
          initConfig.Tool.ajaxRequest({
            url: initConfig.UploadTokenUrl, // 请求地址
            type: "GET",
            // token: thisUpModel.userConfig.loginToken,
            async: true,
            data: {
              businessKey: businessKey,
              bucketType: bucketType,
              bucketName: bucketName
            },
            success: function (res) {
              res = JSON.parse(res);
              thisUpModel.uploadConfig.uptoken = res.body.uploadToken; //获得上传token
              resolve();
            },
            error: function (error) { }
          });
        } catch (err) {
          console.log("获取UploadToken出错了:" + err);
        }
      });
    },

    // 初始化上传容器DOM
    prodUpContainer: function (upWrapId) {
      var body = document.getElementById(upWrapId);
      // 上传容器
      var upWrap = document.createElement('div')
      upWrap.className = 'upContent'
      // 按钮
      var upBtnWrap = document.createElement("div");
      var upBtnSel = document.createElement("span");
      // var upBtnStart = document.createElement("span");
      upBtnWrap.className = 'upload-btns'
      upBtnWrap.className = 'upload-btns'
      upBtnSel.className = 'upload-select'
      upBtnSel.setAttribute('id', upWrapId + 'selId')
      upBtnSel.innerHTML = '选择文件'
      upBtnWrap.appendChild(upBtnSel)
      // upBtnStart.className = 'upload-select'
      // upBtnStart.setAttribute('id','uploads')
      // upBtnStart.innerHTML='开始上传'
      // upBtnWrap.appendChild(upBtnStart)
      upWrap.appendChild(upBtnWrap)
      // 按钮end

      var showListWrap = document.createElement("div")
      showListWrap.className = 'show-result'
      var listTableWrap = document.createElement("table")
      listTableWrap.setAttribute('id', upWrapId + 'fileTable')
      var listTr = document.createElement("tr")
      var thFirst = document.createElement("th")
      thFirst.innerHTML = 'display'
      var thSecond = document.createElement("th")
      thSecond.innerHTML = 'name'
      var thThird = document.createElement("th")
      thThird.innerHTML = 'size'
      var thFourth = document.createElement("th")
      thFourth.innerHTML = 'link'
      var thFive = document.createElement("th")
      thFive.innerHTML = 'delete'
      listTr.appendChild(thFirst)
      listTr.appendChild(thSecond)
      listTr.appendChild(thThird)
      listTr.appendChild(thFourth)
      listTr.appendChild(thFive)

      var listTbody = document.createElement("tbody")
      listTableWrap.appendChild(listTr)
      listTableWrap.appendChild(listTbody)
      showListWrap.appendChild(listTableWrap)
      upWrap.appendChild(showListWrap)

      //绘制到上传容器DOM中
      body.appendChild(upWrap)
    },

    // 点击图片预览
    showPreView: function (url, isShow) {
      if (document.getElementById('dialog-bg')) {
        var dialog = document.getElementById('dialog-bg')
        document.body.removeChild(dialog)
      }
      // 背景
      var divBg = document.createElement('div')
      divBg.className = 'dialog-bg'
      divBg.setAttribute('display', isShow)
      divBg.setAttribute('id', 'dialog-bg')
      // img容器
      var divImgWrap = document.createElement('div')
      divImgWrap.className = 'pre-img-wrap'
      // img
      var img = document.createElement('img')
      img.className = 'pre-img'
      img.setAttribute('src', url)
      divImgWrap.appendChild(img)
      divBg.appendChild(divImgWrap)
      document.body.appendChild(divBg)

      document.getElementById('dialog-bg').addEventListener('click', function () {
        this.style.display = "none"
      })

    },
    // 异常提示
    showErrorTips: function (tip) {
      if (document.getElementById('upErrWrap')) {
        var upErrWrap = document.getElementById('upErrWrap')
        document.body.removeChild(upErrWrap)
      }
      var errContainer = document.createElement('div')
      errContainer.className = 'errWrap'
      errContainer.setAttribute('id', 'upErrWrap')
      errContainer.textContent = tip;
      errContainer.style.display = "block"
      document.body.appendChild(errContainer);

      setTimeout(function () {
        errContainer.style.display = "none"
      }, 3000)
    },
    //获取文件md5值
    getFileMD5: function (file) {
      var file = file.getNative();
      var fileReader = new FileReader(),
        blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,

        //文件每块分割2M，计算分割详情
        chunkSize = 2097152,
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,

        //创建md5对象（基于SparkMD5）
        spark = new SparkMD5();

      //每块文件读取完毕之后的处理
      fileReader.onload = function (e) {
        //每块交由sparkMD5进行计算
        spark.appendBinary(e.target.result);
        currentChunk++;

        //如果文件处理完成计算MD5，如果还有分片继续处理
        if (currentChunk < chunks) {
          loadNext();
        } else {
          var md5 = spark.end();
          console.info("计算的Hash", spark.end());
        }
      };

      //处理单片文件的上传
      function loadNext() {
        var start = currentChunk * chunkSize, end = start + chunkSize >= file.size ? file.size : start + chunkSize;

        fileReader.readAsBinaryString(blobSlice.call(file, start, end));
      }

      loadNext();

      return md5;
    }

  },
  // 请求后端接口url
  // keyUrl: "//storage.aixuexi.com/component/upload/key",
  // BucketSpaceUrl: "//storage.aixuexi.com/component/business/uploadInfo",
  // UploadTokenUrl: "//storage.aixuexi.com/component/uploadToken"

  keyUrl: "http://192.168.0.226:8022/component/upload/key",
  BucketSpaceUrl: "http://192.168.0.226:8022/component/business/uploadInfo",
  UploadTokenUrl: "http://192.168.0.226:8022/component/uploadToken"
};
