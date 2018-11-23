/*引入公用模块*/
var util = require('../../utils/util.js');
var http = require('../../utils/request.js');
Page({
    data: {
        showview: true,
        toView: '',
        wordindex: 'scroll',
        scrollTop: 0,
        casIndex: 0,
        multiIndex: [0, 0, 0, 0, 0],
    },
    //拨打电话功能
    CallPhone: function (e) {
        let phoneNum = e.currentTarget.dataset.tel;
        swan.makePhoneCall({
            phoneNumber: phoneNum
        });
    },
    //区域下拉绑定事件
    bindCasPickerChange: function (e) {
        var that = this;
        // console.log('老杜选择的是', that.data.casArray[e.detail.value]);
        that.setData({
            casIndex: e.detail.value
        })
    },
    /** 
     *监听多列下拉选择器列表 
    */
    bindMultiPickerChange: function (e) {
        var that = this;
        that.setData({
            multiIndex: e.detail.value
        })
    },
    /*
     * 房屋面积输入
    */
    areaInput: function (e) {
        var that = this;
        let areaValue = e.detail.value;
        if (areaValue == 0) {  //根据输入面积大小，动态设置下拉框的值
            that.setData({ multiIndex: [0, 0, 0, 0, 0] });
        } else if (areaValue <= 60) {
            that.setData({ multiIndex: [1, 1, 1, 1, 1] });
        } else if (areaValue > 60 && areaValue <= 90) {
            that.setData({ multiIndex: [2, 1, 1, 1, 1] });
        } else if (areaValue > 90 && areaValue <= 110) {
            that.setData({ multiIndex: [3, 1, 1, 1, 1] });
        } else if (areaValue > 110 && areaValue <= 130) {
            that.setData({ multiIndex: [3, 2, 1, 1, 1] });
        } else if (areaValue > 130 && areaValue <= 150) {
            that.setData({ multiIndex: [3, 2, 1, 2, 1] });
        } else if (areaValue > 150) {
            that.setData({ multiIndex: [4, 2, 1, 2, 1] });
        }
        that.setData({
            area: e.detail.value
        })
    },
    //报名表单提交
    formSubmit: function (e) {
        var that = this,
            myreg = /^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57]|19[89])[0-9]{8}$/,
            region = that.data.casArray[that.data.casIndex].id,
            typeText = that.data.multiArray[0][that.data.multiIndex[0]].name + that.data.multiArray[1][that.data.multiIndex[1]].name + that.data.multiArray[2][that.data.multiIndex[2]].name +
                       that.data.multiArray[3][that.data.multiIndex[3]].name + that.data.multiArray[4][that.data.multiIndex[4]].name;
        // console.log(typeText);               
            if(region == '0') {
                this.modelTip('请选择区域！','loading',1500);
                return false;
            } else if (e.detail.value.area == '' || e.detail.value.area == 0) {
                this.modelTip('请输入面积！','loading',1500);
                return false;
            } else if (JSON.stringify(e.detail.value.housetype) == JSON.stringify([0, 0, 0, 0, 0])) {
                this.modelTip('请选择户型！','loading',1500);
                return false;
            } else if (e.detail.value.name == '') {
                this.modelTip('请输入姓名！','loading',1500);
            } else if (e.detail.value.mobile.length == 0 || !myreg.test(e.detail.value.mobile)) {
                this.modelTip('手机号码有误！','loading',1500);
                return false;
            } else {
                that.setData({
                    viewText : typeText 
                }) 
                //报名接口调用
                http.request(
                    '/BaiduApp/baidu_xcxbmCommit',
                    {
                        name:e.detail.value.name,
                        area:e.detail.value.area,
                        mobile:e.detail.value.mobile,
                        utm_page:'XCX_百度小程序'
                    },
                    this.requestReponse,
                );
            }
            return true;
    },
    //成功和失败的回调函数
    requestReponse: function (status, errorMsg, data){
        var that = this;
        if(status){
            swan.navigateTo({
                url: '../detail/detail?baoming_id=' + data['baoming_id'] + '&area=' + data['area'] + '&house_info=全屋',
            });
            // swan.showToast({
            //     title   : '报名成功！',
            //     icon    : 'success'
            // });
        }else{

            swan.showToast({
                title   : errorMsg,
                icon    : 'loading'
            });
        }
    },
    //model消息提示
    modelTip: function (title,icon,duration) {
        swan.showToast({
            title   : title,
            icon    : icon,
            duration: duration
        })
    },
    //底部立即报价定位滚动效果
    scrollView: function (e) {
        var that = this;
        let wordindex = e.currentTarget.dataset.wordindex;
        if(wordindex == '#') {
            that.setData({
                toView: 'scroll',
            })
        } else {
            that.setData({
                toView: wordindex,
            })
        }
    },
    //滚动监听
    scroll: function (e) {
        var that = this,
            scrollTop = that.data.scrollTop;
        that.setData({
            scrollTop: e.detail.scrollTop
        })
        if(scrollTop >= 150) {
            that.setData({
                showview: false,
                toView: ''
            })
        }else{
            that.setData({
                showview: true,
            })
        }
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
        var that = this; 
        setInterval (function(){
            let randoms = util.randChangeNum(),
                index = Math.floor((Math.random()*randoms.length));     
            that.setData({
                randNum : randoms[index]
            })
        },200)
    },  
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
        var that = this,
            feed_data = util.data_House_type(),
            region = util.data_region();
        that.setData({
            casArray: region,
            multiArray: feed_data.house_type
        })
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
        return {
            title: '秋名山车神争霸赛',
            content: '杜老司机飙车，闪开!',
            path: '/pages/index/index'
        }
    }
});