//引入公用请求文件
var request = require('../utils/request.js');  

//户型选阵
var typeList = {
    "house_type": [
        [
            {
            id: 0,
            name: '0室'
            },
            {
            id: 1,
            name: '1室'
            },
            {
            id: 2,
            name: '2室'
            },
            {
            id: 3,
            name: '3室'
            },
            {
            id: 4,
            name: '4室'
            },
        ],
        [
            {
            id: 0,
            name: '0厅'
            },
            {
            id: 1,
            name: '1厅'
            },
            {
            id: 2,
            name: '2厅'
            },
            {
            id: 3,
            name: '3厅'
            },
            {
            id: 4,
            name: '4厅'
            },
        ],
        [
            {
            id: 0,
            name: '0厨'
            },
            {
            id: 1,
            name: '1厨'
            },
            {
            id: 2,
            name: '2厨'
            },
            {
            id: 3,
            name: '3厨'
            },
            {
            id: 4,
            name: '4厨'
            },
        ],
        [
            {
            id: 0,
            name: '0卫'
            },
            {
            id: 1,
            name: '1卫'
            },
            {
            id: 2,
            name: '2卫'
            },
            {
            id: 3,
            name: '3卫'
            },
            {
            id: 4,
            name: '4卫'
            },
        ],
        [
            {
            id: 0,
            name: '0阳台'
            },
            {
            id: 1,
            name: '1阳台'
            },
            {
            id: 2,
            name: '2阳台'
            },
            {
            id: 3,
            name: '3阳台'
            },
            {
            id: 4,
            name: '4阳台'
            },
        ]
    ],
}
//区域选择
// const region = () => {
//     let casArray = [];
//     swan.request({
//         url: 'https://api.youjuke.com/Wxsmallprogram/get_district_data',
//         header: {
//         'content-type': 'application/json' // 默认值
//         },
//         success: function (res) {
//             // console.log(res)
//             for (var key in res.data) {
//                 //key是属性,object[key]是值
//                 casArray.push(res.data[key]); //往数组中放属性
//             }
//             casArray.unshift({id: "0", name:"请选择所在区域"})
//         }
//     })
//     return casArray;
// };
request.getData('/Wxsmallprogram/get_district_data', shuffleSuc, fail); //调用封装的方法
var casArray = []; //存放区域数据
function shuffleSuc(data) {
    for (var key in data) {
        //key是属性,object[key]是值
        casArray.push(data[key]); //往数组中放属性
    }
    casArray.unshift({id: "0", name:"请选择所在区域"})
    return casArray;
}
function fail() {
    wx.hideLoading();
    wx.showToast({
        title     :   '请求超时',
        icon      :   'loading',
        duration  :   2000
    })
}
 
var casArrays = casArray; //指向对象

module.exports.typeList = typeList;
module.exports.casArrays = casArrays;