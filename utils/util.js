//产生固定范围的随机数
const rangeRandom = (minNum, maxNum) => {
    return Math.floor(minNum + Math.random() * (maxNum - minNum + 1));
};

//随机数
const randChangeNum = () => {
    var randoms = [];  
        while (true)
        {
            var isExists = false;
            // 获取一个10000–200000范围的数
            // var random = parseInt(10000 + (200000 - 10000 + 1) * (Math.random()))
            var random = parseInt(rangeRandom(10000, 200000));
            // 判断当前随机数是否已经存在
            for (var i = 0; i < randoms.length; i++) {
                if (random === randoms[i]) {
                    isExists = true;
                    break;
                }
            }
            // 如果不存在，则添加进去
            if (!isExists)
                randoms.push(random);      
            // 如果有10位随机数了，就跳出
            if (randoms.length === 10)
                break;
        }
    return randoms;
};

//引入公用data数据
var data_index = require('../utils/data.js');

//选择所在区域
const data_region = () => {
    return data_index.casArrays;
}

//选择户型
const data_House_type = () => {
    return data_index.typeList;
}

module.exports = {
    randChangeNum: randChangeNum,
    data_House_type: data_House_type,
    data_region: data_region,
}