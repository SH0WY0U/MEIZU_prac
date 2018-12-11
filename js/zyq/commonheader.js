// 渲染顶栏数据，增加划入划出效果
var insertHeader = (function () {
    return {
        init(ele1, ele2, dataUrl, targetUrl) {
            this.pointer = $(ele1);
            this.navAll = $(ele2);
            this.data = [];
            this.getData(dataUrl, targetUrl);
            this.event();
        },
        event() {
            _this = this;
            this.pointer.on('mouseenter', function () {
                _this.navAll.css('display', 'none');
                _this.navAll.eq($(this).index()).css('display', 'flex');
                $('.sec_nav').animate({ 'height': 190 }, 'fast', 'linear')
                $('#header_wrap').css('background', 'white');
                $('.sec_nav').css('background', 'white');
            })
            $('#header_wrap').on('mouseleave', function () {
                console.log(888)
                _this.navAll.css('display', 'none');
                $('#header_wrap').css('background', 'transparent');
                $('.sec_nav').css('background', 'transparent');
                $('.sec_nav').css('height', 0)
            })
        },
        getData(dataUrl, targetUrl) {
            $.get(dataUrl, res => {
                this.data[0] = res.slice(0, 8);
                this.data[1] = res.slice(11, 19);
                this.data[2] = res.slice(24, 32);
                this.data[3] = res.slice(37, 45);
                console.log(this.data);
                this.insertData(targetUrl)
            })
        },
        insertData(targetUrl) {
            for (var i = 0; i < this.navAll.length; i++) {
                for (var j = 0; j < this.data[i].length; j++) {
                    this.navAll.eq(i).children('a').eq(j).attr('href', targetUrl + '?' + 'goods_id=' + this.data[i][j]["goods_id"]);
                    this.navAll.eq(i).children('a').eq(j).children('img').attr('src', [this.data[i][j]["goods_image"]])
                    this.navAll.eq(i).children('a').eq(j).children('span').eq(0).html([this.data[i][j]["goods_name"]])
                    this.navAll.eq(i).children('a').eq(j).children('span').eq(1).html('<i>￥</i>' + [this.data[i][j]["goods_price"]])
                }
            }
        }
    }
}())
// 调用
insertHeader.init('.sec_pointer', '.sec_nav section', '/json/zyq/list.json', '/html/zyq/goods_info.html')

// 顶部购物车自动检测功能
var shopCarCountAuto = (function () {
    return {
        init(ele) {
            this.countBox = $(ele);
            this.tik = setInterval(_ => {
                this.insertData(this.getData())
            }, 1000)
        },
        insertData(num) {
            if (num > 0) {
                this.countBox.html(num);
                this.countBox.css('display', 'inline-block');
            }
        },
        getData() {
            if (localStorage.getItem('shopList')) {
                this.shopList = JSON.parse(localStorage.getItem('shopList'));
                return this.shopList.length;
            }
        }
    }
}())
// 调用
shopCarCountAuto.init('.com_shopcar span')