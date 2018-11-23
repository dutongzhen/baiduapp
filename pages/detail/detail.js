Page({
    data: {

    },
    onLoad: function (options) {
        // 监听页面加载的生命周期函数
        var that = this;
        let baoming_id = options.baoming_id,
            area       = options.area;
            house_info = options.house_info;
        if(baoming_id == 'undefined'){
            swan.showToast({
                title: '提交过于频繁！',
                icon: 'loading',
                duration: 1000,
                mask: true
            })
        } else {
            that.setData({
                baoming_id: baoming_id,
                area      : area,
                house_info: house_info,
            })
        }
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function() {
        // 监听页面显示的生命周期函数
    },
    onHide: function() {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function() {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function() {
        // 监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});