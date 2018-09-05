//var Bmob = require('../../utils/bmob.js');
var utils = require('../../utils/util.js');
var that;
var app = getApp();

Page({
  data: {
    inputText: '',

    sexArray: ['女士', '先生'],
    sexIndex: 0,
    sex: '请选择您的性别',

    universityArray: ['中国海洋大学', '中国石油大学', '青岛大学', '青岛理工大学', '青岛科技大学', '山东科技大学'],
    universityIndex: 0,
    university: '请选择您的学校',

    trait: '',

    //district: '请选择您的区域',
    //address: '请输入您的地址',

    degreeArray: ['本科', '研究生'],
    degreeIndex: 0,
    degree: '请选择您的学历',

    courseList: [{
      name: "数学",
      chose: "false"
    }, {
      name: "英语",
      chose: "false"
    }, {
      name: "语文",
      chose: "false"
    }, {
      name: "物理",
      chose: "false"
    }, {
      name: "化学",
      chose: "false"
    }, {
      name: "生物",
      chose: "false"
    }, {
      name: "历史",
      chose: "false"
    }, {
      name: "地理",
      chose: "false"
    }, {
      name: "美术",
      chose: "false"
    }, {
      name: "钢琴",
      chose: "false"
    }, {
      name: "日语",
      chose: "false"
    }, {
      name: "韩语",
      chose: "false"
    }],
    // ["数学", "英语", "语文", "物理", "化学", "生物", "历史", "地理", "美术", "钢琴", "日语", "韩语"],
    // id: null,
    choseCourse: [],

    traitList: [{
      name: "教学经验丰富",
      chose: "false"
    }, {
      name: "有成功案例",
      chose: "false"
    }, {
      name: "提分快",
      chose: "false"
    }, {
      name: "注重基础",
      chose: "false"
    }, {
      name: "严厉",
      chose: "false"
    }, {
      name: "有耐心",
      chose: "false"
    }, {
      name: "和学生交朋友",
      chose: "false"
    }, {
      name: "心理辅导",
      chose: "false"
    }, {
      name: "幽默风趣",
      chose: "false"
    }, {
      name: "沟通能力强",
      chose: "false"
    }, {
      name: "备课详细",
      chose: "false"
    }, {
      name: "引导学生自主学习",
      chose: "false"
    }, {
      name: "善于鼓励",
      chose: "false"
    }],
    choseTrait: [],

    photo: "../../images/photo111.png",
    loading: true,

    image_width: getApp().screenWidth / 4 - 10,
    loading: false,
    images: [],
    urlArr: [],

    remark:'',

    inputName: null,
    inputSex: null,
    inputTelephone: null,
    inputTech1: null,
    inputTech2: null,
    inputDistrict: null,
    inputAddress: null,
    inputUniversity: null,
    inputDegree: null,
    inputMajor: null,
    inputScore: null,
    inputSalary: null,
  },

  onLoad: function() {
    that = this;
    wx.showModal({
      title: '您的电话不会公开显示',
      content: '为保护您的隐私，仅当您主动向客户发送申请时，对方才可看到您的电话',
      showCancel: false,
      confirmText: '我知道啦',
      success: function(res) {
        if (res.confirm) {}
      }
    })
    var abc = new Array();
    abc = that.data.courseList;
    // for(var i=0;i<abc.length;i++){
    // console.log(abc[i])
    // }
    console.log(abc[1].name)
  },

  uploadPhoto: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed', 'original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        wx.showNavigationBarLoading()
        that.setData({
          loading: false
        })
        var photo = that.data.photo;
        //var images = that.data.images;
        var tempFilePaths = res.tempFilePaths; //上传的图片的路径
        //var imgsrc = tempFilePaths;
        console.log(tempFilePaths)
        
        var newDate = new Date();
        var newDateStr = newDate.toLocaleDateString();
        var extension = /\.([^.]*)$/.exec(tempFilePaths);
        if (extension) {
          extension = extension[1].toLowerCase();
        }
        var name = newDateStr + "." + extension; //上传的图片的别名
        //var name = newDateStr + extension; //上传的图片的别名

        //必须通过setData才能生效
        that.setData({
          //images: res.tempFilePaths,
          photo: res.tempFilePaths
        })
        console.log(res)
        wx.uploadFile({
          url: 'https://www.zhuhaojia360.com/technician_upload_file.php',
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
            'user':'test'
          },
          success: function(res){
            wx.hideNavigationBarLoading()
            var data = res.data
          },
          fail: function () {
            //fail
          },
          complete: function () {
            //complete
          }
        })

        /*wx.saveFile({
          tempFilePath: 'tempFilePaths[0]',
          success: function(res){
            wx.hideNavigationBarLoading()
            var saveFilePath = res.savedFilePath
          },
          fail: function () {
            //fail
          },
          complete: function () {
            //complete
          }
        })*/
      },
      fail: function() {
        //fail
      },
      complete: function() {
        //complete
      }
    })
  },

  /*images = images.concat(imgsrc);
  that.setData({
    images: images
  })*/

  /*uploadimg: function (data) { //这里触发图片上传的方法
          wx.hideNavigationBarLoading()
          var images = this.data.images; //这里是你图片上传的接口
          app.uploading({
            url: 'https://www.zhuhaojia360.com/technician_upload_file.php',
            path: images //这里是选取的图片的地址数组
          });
        }

      },
      fail: function() {
        //fail
      },
      complete: function() {
        //complete
      }
    })
  },*/

  uploadimg: function() {
    var that = this;
    /*i = data.i ? data.i : 0, //当前上传哪张照片
      success = data.success ? data.success : 0, //上传成功的个数
      fail = data.fail ? data.fail : 0*/ //上传失败的个数
    wx.uploadFile({
      url: 'https://www.zhuhaojia360.com/technician_upload_file.php',
      filePath: that.data.images,
      name: 'file', //根据实际情况修改
      //formData: null, //上传图片时一起上传的数据
      formData: {
        'user': 'test'
      },
      success: function(res) {
        wx.hideNavigationBarLoading()
        //success++; //图片上传成功，数量+1
        var data = res.data;
        console.log(data);
        //console.log(res);
        //console.log(i);
      },
      fail: function() {
        //fail++;
        //console.log('Fail:' + i + 'Fail:' + fail);
        console.log(error);
      },
      complete: function() {
        /*console.log(i);
        i++;
        if (i == data.path.length) {
          console.log('上传完毕')
          console.log('成功：' + success + '失败：' + fail)
        } else {
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }*/
      }
    })
  },

  preview_img: function() {
    wx.previewImage({
      urls: this.data.images, //需要预览的图片http链接列表
      current: this.data.images //当前显示图片的http链接
    })
  },

  teacherInput: function(e) {
    var Firts = e.detail.value.substring(0, 1);
    var inputText = Firts + "老师"
    this.setData({
      inputText: inputText
    })
    console.log(this.data.inputText)
    if (!e.detail.value || e.detail.value == '老师' || e.detail.value == '老老师') {
      this.setData({
        inputName: false
      })
    } else {
      this.setData({
        inputName: true
      })
    }
  },

  inputTelephoneRight: function(e) {
    if (!e.detail.value) {
      this.setData({
        inputTelephone: false
      })
    } else {
      this.setData({
        inputTelephone: true
      })
    }
  },

  inputMajorRight: function(e) {
    if (!e.detail.value) {
      this.setData({
        inputMajor: false
      })
    } else {
      this.setData({
        inputMajor: true
      })
    }
  },

  inputScoreRight: function(e) {
    if (!e.detail.value) {
      this.setData({
        inputScore: false
      })
    } else {
      this.setData({
        inputScore: true
      })
    }
  },

  inputSalaryRight: function(e) {
    if (!e.detail.value) {
      this.setData({
        inputSalary: false
      })
    } else {
      this.setData({
        inputSalary: true
      })
    }
  },

  sexChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexIndex: e.detail.value,
      sex: that.data.sexArray[e.detail.value]
    })
    if (!that.data.sexArray[e.detail.value]) {
      this.setData({
        inputSex: false
      })
    } else {
      this.setData({
        inputSex: true
      })
    }
  },

  universityChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      universityIndex: e.detail.value,
      university: that.data.universityArray[e.detail.value]
    })
    if (!that.data.universityArray[e.detail.value]) {
      this.setData({
        inputUniversity: false
      })
    } else {
      this.setData({
        inputUniversity: true
      })
    }
  },

  degreeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      degreeIndex: e.detail.value,
      degree: that.data.degreeArray[e.detail.value]
    })
    if (!that.data.degreeArray[e.detail.value]) {
      this.setData({
        inputDegree: false
      })
    } else {
      this.setData({
        inputDegree: true
      })
    }
  },

  choseCourse: function(e) {
    var index = e.currentTarget.dataset.index; //获取自定义的ID值 
    var choseCourse = that.data.choseCourse;
    var courseListNow = that.data.courseList;
    if (that.data.courseList[index].chose == 'false') {
      if (that.data.choseCourse.length >= 3) {
        wx.showToast({
          title: '最多只可选择三项教学科目',
          image: '../../images/warn.png',
          duration: 2000
        })
      } else {
        choseCourse.push(that.data.courseList[index].name);
        courseListNow[index].chose = "true";
        this.setData({
          // id: index,
          courseList: courseListNow,
          choseCourse: choseCourse
        })
        console.log(that.data.courseList)
        console.log(that.data.choseCourse)
      }
    } else if (that.data.courseList[index].chose == 'true') {
      courseListNow[index].chose = "false";
      for (var i = 0; i < choseCourse.length; i++) {
        if (choseCourse[i] == courseListNow[index].name) {
          choseCourse.splice(i, 1);
          break;
        }
      }
      this.setData({
        // id: index,
        courseList: courseListNow,
        choseCourse: choseCourse
      })
      console.log(that.data.courseList)
      console.log(that.data.choseCourse)
    }
  },

  choseTrait: function(e) {
    var index = e.currentTarget.dataset.index; //获取自定义的ID值 
    var choseTrait = that.data.choseTrait;
    var traitListNow = that.data.traitList;
    if (that.data.traitList[index].chose == 'false') {
      if (that.data.choseTrait.length >= 5) {
        wx.showToast({
          title: '最多只可选择五项教学特点',
          image: '../../images/warn.png',
          duration: 2000
        })
      } else {
        choseTrait.push(that.data.traitList[index].name);
        traitListNow[index].chose = "true";
        this.setData({
          // id: index,
          traitList: traitListNow,
          choseTrait: choseTrait
        })
        console.log(that.data.traitList)
        console.log(that.data.choseTrait)
      }
    } else if (that.data.traitList[index].chose == 'true') {
      traitListNow[index].chose = "false";
      for (var i = 0; i < choseTrait.length; i++) {
        if (choseTrait[i] == traitListNow[index].name) {
          choseTrait.splice(i, 1);
          break;
        }
      }
      this.setData({
        // id: index,
        traitList: traitListNow,
        choseTrait: choseTrait
      })
      console.log(that.data.traitList)
      console.log(that.data.choseTrait)
    }
  },

  registerSuccess: function(e) {
    //var nowTime = utils.getTime();
    var detailTime = utils.detailTime();
    var c_name = e.detail.value.teacherName;
    var c_sex = this.data.sexArray[this.data.sexIndex];
    var c_phone = e.detail.value.telephone;
    var c_imgurl = this.data.photo;
    var c_tech_1 = this.data.choseCourse;
    var c_tech_2 = this.data.choseTrait;
    //var c_district = this.data.district;
    var c_district = e.detail.value.district;
    //var c_address = this.data.address;
    var c_address = e.detail.value.address;
    //var major = e.detail.value.major;
    //var teacherScore = e.detail.value.teacherScore;
    //var salary = e.detail.value.salary;
    var c_remark = e.detail.value.remark;
    //var c_remark = this.data.remark;
    //var university = this.data.universityArray[this.data.universityIndex];
    //var degree = this.data.degreeArray[this.data.degreeIndex];
    /*if (university == '中国海洋大学') {
      this.setData({
        trait: '985'
      })
    } else if (university == '中国石油大学') {
      this.setData({
        trait: '211'
      })
    } else if (university == '中国海洋大学' && university == '中国石油大学' || degree == '研究生') {
      this.setData({
        trait: '研究生'
      })
    } else if (university != '中国海洋大学' || university != '中国石油大学' || degree != '研究生') {
      this.setData({
        trait: 'null'
      })
    }*/

    if (!c_name || c_name == '师傅' || c_name == '阿姨') {
      wx.showToast({
        title: '请填写您的称呼',
        image: '../../images/warn.png',
        duration: 2000
      })
      this.setData({
        inputName: false
      })
    } else if (!c_sex) {
      wx.showToast({
        title: '请填写您的称谓',
        image: '../../images/warn.png',
        duration: 2000
      })
      this.setData({
        inputSex: false
      })
    } else if (!c_phone) {
      wx.showToast({
        title: '请填写您的电话',
        image: '../../images/warn.png',
        duration: 2000
      })
      this.setData({
        inputTelephone: false
      })
    } else if (c_imgurl == "../../images/photo111.png") {
      wx.showToast({
        title: '请添加您的头像',
        image: '../../images/warn.png',
        duration: 2000
      })
    } else if (!c_tech_1) {
      wx.showToast({
        title: '请填写您的技能一',
        image: '../../images/warn.png',
        duration: 2000
      })
      this.setData({
        inputTech1: false
      })
    } else if (!c_tech_2) {
      wx.showToast({
        title: '请填写您的技能二',
        image: '../../images/warn.png',
        duration: 2000
      })
      this.setData({
        inputTech2: false
      })
    } else if (!c_district) {
      wx.showToast({
        title: '请填写您所在区域',
        image: '../../images/warn.png',
        duration: 2000
      })
      this.setData({
        inputDistrict: false
      })
    } else if (!c_address) {
      wx.showToast({
        title: '请填写您所在详细地址',
        image: '../../images/warn.png',
        duration: 2000
      })
      this.setData({
        inputAddress: false
      })
    }
    /*else if (!major) {
      wx.showToast({
        title: '请填写您的专业',
        image: '../../images/warn.png',
        duration: 2000
      })
      this.setData({
        inputMajor: false
      })
    }
    else if (!teacherScore) {
      wx.showToast({
        title: '请填写您的高考分数',
        image: '../../images/warn.png',
        duration: 2000
      })
      this.setData({
        inputScore: false
      })
    }
    else if (!salary) {
      wx.showToast({
        title: '请填写您的期望薪资',
        image: '../../images/warn.png',
        duration: 2000
      })
      this.setData({
        inputSalary: false
      })
    }
    else if (choseCourse.length == 0) {
      wx.showToast({
        title: '请选择教学科目',
        image: '../../images/warn.png',
        duration: 2000
      })
    }*/
    else if (!c_remark) {
      wx.showToast({
        title: '请尽量详细填写你的备注',
        image: '../../images/warn.png',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://www.zhuhaojia360.com/technician_list_insert.php',
        data: {
          c_reg_date: detailTime,
          c_name: c_name,
          c_sex: c_sex,
          c_phone: c_phone,
          c_imgurl: c_imgurl,
          c_tech_1: c_tech_1,
          c_tech_2: c_tech_2,
          c_district: c_district,
          c_address: c_address,
          c_remark: c_remark
          //cuserid: userId
          //var objectId, that = this;
          //var currentUser = Bmob.User.current();
          //objectId = currentUser.id;
        },
        method: 'POST',
        header: {
          //'content-type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res.data);
          console.log('submit success');
          //var releaseId = result.id;
          //console.log("日记创建成功, objectId:" + result.id);
          //query.get(objectId, {
          //success: function (result) {
          //result.set('release', releaseId);
          //result.set('register', true);
          //result.set('role', "teacher");
          //result.save();

          wx.showToast({
            title: '发布成功',
            icon: 'success',
            success: function() {
              setTimeout(function() {
                if (wx.reLaunch) {
                  wx.reLaunch({
                    url: 'pages/booking/booking'
                  });
                } else {
                  wx.switchTab({
                    url: 'pages/booking/booking'
                  })
                }
              }, 2000);
            }
          });
        },
        error: function(object, error) {
          wx.showToast({
            title: '网络错误',
            image: '../../images/warn.png',
            duration: 2000
          })
        },
        fail: function(res) {
          console.log('submit fail');
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          })
        },
        complete: function(res) {
          console.log('submit complete');
          wx.hideLoading();
        }
      });
    }
  },

  jumpTeacher: function() {
    wx.redirectTo({
      url: '../customerRegister/customerRegister'
    })
  },

  upImg: function() {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        wx.showNavigationBarLoading()
        that.setData({
          loading: false
        })
        var urlArr = that.data.urlArr;
        // var urlArr={};
        var tempFilePaths = res.tempFilePaths;
        var images = that.data.images;
        that.setData({
          images: images.concat(tempFilePaths)
        });
        var imgLength = tempFilePaths.length;
        if (imgLength > 0) {
          var newDate = new Date();
          var newDateStr = newDate.toLocaleDateString();
          var j = 0;
          //如果想顺序变更，可以for (var i = imgLength; i > 0; i--)
          for (var i = 0; i < imgLength; i++) {
            var tempFilePath = [tempFilePaths[i]];
            var extension = /\.([^.]*)$/.exec(tempFilePath[0]);
            if (extension) {
              extension = extension[1].toLowerCase();
            }
            var name = newDateStr + "." + extension; //上传的图片的别名      
            var file = new Bmob.File(name, tempFilePath);
            file.save().then(function(res) {
              wx.hideNavigationBarLoading()
              var url = res.url();
              console.log("第" + i + "张Url" + url);
              urlArr.push({
                url
              });
              j++;
              console.log(j, imgLength);
              // if (imgLength == j) {
              //   console.log(imgLength, urlArr);
              //如果担心网络延时问题，可以去掉这几行注释，就是全部上传完成后显示。
              // showPic(urlArr, that)
              that.setData({
                urlArr: urlArr,
                loading: true
              });
              // }
            }, function(error) {
              console.log(error)
            });
          }
        }
      }
    })
    console.log(that.data.urlArr)
  },

  previewImage: function(e) {
    var current = e.currentTarget.dataset.current;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      url: that.data.images // 需要预览的图片http链接列表
    })
  },

  delete: function(e) {
    // 获取本地显示的图片数组
    var index = e.currentTarget.dataset.index;
    var images = that.data.images;
    var urlArr = that.data.urlArr;
    urlArr.splice(index, 1);
    images.splice(index, 1);
    that.setData({
      images: images,
      urlArr: urlArr
    });
    console.log(that.data.urlArr)
  }

})

function showPic(url, t) {
  t.setData({
    loading: true,
    photo: url
  })
}