//host域名信息
var host = 'https://api.youjuke.com';

/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * requestReponse：成功和失败的回调函数
 */
const request = (url, postData, requestReponse) => {
  
  var reponse_data = [];
  swan.request({
    //项目的接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: postData,
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      if(res.data.status == 10200){

        reponse_data['area']       = res.data.data.area;
        reponse_data['baoming_id'] = res.data.data.baoming_id;
        requestReponse(true, '', reponse_data);

      }else{

        requestReponse(false, res.data.errorMsg, reponse_data);
      }
      
    },
    fail: function (error) {
      requestReponse(false, '请求错误请重试', reponse_data);
    },
  });
}

//GET请求，不需传参，直接URL调用，
function getData(url, doSuccess, doFail) {
  swan.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    success: function (res) {
      doSuccess(res.data);
    },
    fail: function () {
      doFail();
    },
  })
}

module.exports.request = request;
module.exports.getData = getData;