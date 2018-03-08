import styles from './Uploader.css';
import { initConfig } from "./javascripts/Tool";
import { setInterval, clearInterval } from 'timers';
// var browserMD5File = require('browser-md5-file');


/**上传组件类
 *userConfig: 用户初始化uploader实例参数
 * uploadConfig: 初始化上传组件实例参数
 * bucketType: 上传空间类型（七牛||阿里）
 * bucketName: 上传空间名称
 * uploader: 实例化对象
 */
export function uploader(config) {
  let self = this;
  this.userConfig = config;
  this.uploadConfig = {
    runtimes: "html5,html4,flash",
    browse_button: "pickfiles",
    uptoken:
      "xozWSPMxkMjIVoHg2JyXq4-7-oJaEADLOKHVR0vU:q3UZ01QqSZMyRxVbK2ArkHMqP_U=:eyJkZWxldGVBZnRlckRheXMiOjcsInNjb3BlIjoianNzZGsiLCJkZWFkbGluZSI6MTUxNjM0NTAzN30=",
    domain: "https://storage.aixuexi.com/",
    unique_names: false,
    save_key: false,
    get_new_uptoken: false,
    max_file_size: "100mb",
    max_retries: 3,
    multi_selection: true,
    dragdrop: false,
    chunk_size: "4mb",
    auto_start: true,
    init: {
      FilesAdded: function (up, file) {
      },
      BeforeUpload: function (up, file) {
        if (up.files.length) {
          initConfig.Tool.progressShow(up, file, self);
        }else{
          up.stop()
        }
      },
      UploadProgress: function (up, file) {
        if (file.percent <= 100) {
          self.setProgress(file.percent, self);
        }
      },

      FileUploaded: function (up, file, info) {
        let resInfo = JSON.parse(info.response);
        if (initConfig.Tool.isImage(file.name)) {
          document.getElementById(
            self.userConfig.upContainerId + 'fileTable'
          ).rows[1].cells[0].childNodes[0].src = resInfo.body.url;
        }
        document.getElementById(
          self.userConfig.upContainerId + 'fileTable'
        ).rows[1].cells[3].innerHTML =
          `<a target="_block" href="${resInfo.body.url}"> ${resInfo.body.url}</a>`;
      },
      UploadComplete: function (up) { },
      Error: function (up, err, errTip) {
        initConfig.Tool.delFile(1, self.userConfig.onRemove());
        initConfig.Tool.showErrorTips(errTip);
        up.stop();
        return false;
      },
      Key: function (up, file) {
        var key = "";
        var MD5 = "";
        // if (self.userConfig.isMD5) {
        //   // MD5 = initConfig.Tool.getFileMD5(file)
        //   file=file.getNative()
        //   browserMD5File(file,function(err,md5){
        //     MD5 =md5
        //   })
        // }
        key = initConfig.Tool.getKeyFromServer(
          up,
          self.userConfig.businessKey,
          file,
          MD5,
          self);
        console.log(0, key)
        console.log(1, MD5)
        return key;
      }
    }


  };
  this.bucketType = "";
  this.bucketName = "";
  this.uploader = {};
  this.setProgress = function (percent, thisUpModel) {
    var barId = thisUpModel.userConfig.upContainerId + "bar";
    let bar = document.getElementById(barId);
    if (bar) {
      bar.style.width = parseInt(percent) + "%";
      bar.innerHTML = bar.style.width;
      if (bar.style.width >= "98%") {
        clearTimeout(jindu);
        return;
      }
      let jindu = setTimeout("self.setProgress", 3000);
    }
  };
}

uploader.prototype.init = function () {
  try {
    if (this.userConfig.loginToken && typeof (this.userConfig.loginToken) === 'function') {
      let token = this.userConfig.loginToken();
      initConfig.Tool.setCookie('token_oss', token, 30);
    } else {
      initConfig.Tool.showErrorTips('初始化uploader时loginToken有误!');
      return false;
    }

    initConfig.Tool.prodUpContainer(this.userConfig.upContainerId)
    let self = Object.assign({}, this);
    if (this.userConfig.historyFiles) {
      this.userConfig.historyFiles.map(function (item) {
        if (initConfig.Tool.isImage(item.imgUrl)) {
          initConfig.Tool.insRow(item, true, self, true);
        } else {
          initConfig.Tool.insRow(item, false, self, true);
        }
      });
    }
    initConfig.Tool.getBucketSpace(this.userConfig.businessKey, this).then(() => {
      initConfig.Tool.getUploadToken(
        this.userConfig.businessKey,
        this.bucketType,
        this.bucketName,
        this
      ).then(() => {
        // 上传按钮id
        this.uploadConfig.browse_button = this.userConfig.upContainerId + 'selId';
        // 是否多选
        if (this.userConfig.multiple != undefined) {
          this.uploadConfig.multi_selection = this.userConfig.multiple
        }

        this.uploader = Qiniu.uploader(this.uploadConfig);
      });
    });
  } catch (err) {
    initConfig.Tool.showErrorTips("inituploader出错了:" + err);
  }
};

uploader.prototype.start = function () {
  if (this.uploader.files.length > 0) {
    return this.uploader.start();
  } else {
    initConfig.Tool.showErrorTips("请先选择上传文件");
    return false;
  }
}


/**
  * 获取选择上传的文件列表
  * return Aarry
  */
uploader.prototype.getAddedFiles = function (AddedFilesFunc) {
  this.uploader.bind("FilesAdded", function (up, file) {
    AddedFilesFunc();
    return up.files;
  });
};

/**
 * 获取当前上传文件的进度
 * return Number
 */
uploader.prototype.getFileProgress = function (FileProgressFunc) {
  this.uploader.bind("UploadProgress", function (up, file) {
    FileProgressFunc();
    return file.percent;
  });
};

/**
 * 获取本次上传成功的文件队列
 * return Aarry
 */
uploader.prototype.getUploadFiles = function (UploadFilesFunc) {
  this.uploader.bind("UploadComplete", function (up) {
    UploadFilesFunc();
    return up.files;
  });
};







