// 商品展示渲染封装
var insertListData = (function () {
    return {
        init(swiperEle, arr, ele, dataUrl, targetUrl) {
            this.goods = $(ele);
            this.swipers = $(swiperEle);
            this.banners = arr;
            this.getData(dataUrl, targetUrl);
        },
        getData(dataUrl, targetUrl) {
            $.get(dataUrl, (res) => {
                console.log(res);
                this.insertData(res, targetUrl);
            })
        },
        insertData(data, targetUrl) {
            for (var j = 0; j < this.banners.length; j++) {
                this.swipers.eq(j).attr('href', targetUrl + '?' + 'goods_id=' + this.banners[j]);
                this.swipers.eq(j).children('img').attr('src', data[(this.banners[j])]["banner_image"]);
            }
            for (var i = 0; i < this.goods.length; i++) {
                if (data[i]["show_image"]) {
                    this.goods.eq(i).children('img').attr('src', data[i]["show_image"]);
                } else {
                    this.goods.eq(i).children('img').attr('src', data[i]["goods_image"]);
                    this.goods.eq(i).children('.goods_name').html(data[i]["goods_name"]);
                    this.goods.eq(i).children('.goods_tag').html(data[i]["goods_tag"]);
                    this.goods.eq(i).children('.goods_price').html('<i>￥</i>' + data[i]["goods_price"]);
                }
                this.goods.eq(i).attr('href', targetUrl + '?' + 'goods_id=' + data[i]["goods_id"]);
            }
        }
    }
}())
// 调用(传入：轮播图内a标签类名，轮播展示商品索引数组，全部商品框a标签类名，商品信息json数据链接，跳转的商品详情页链接)
insertListData.init('.swiper_guys', [7, 2, 0, 3, 11], '.goods_box', '/json/zyq/list.json', '/html/zyq/goods_info.html');

// 轮播图功能封装
var swiper = (function () {
    return {
        init(ele) {
            this.client = $(ele);
            this.box = this.client.children('#box');
            this.ball = this.client.children('#ball');
            this.box.prepend(this.box.children('li:last').clone());
            this.box.append(this.box.children('li:eq(1)').clone());
            this.li = this.ball.children('li');
            this.tiktok = null;
            this.index = 0;
            this.box.css('left', -this.box.children()[0].clientWidth);
            // this.showImg(this.index);
            this.event();
            this.autoPlay();
        },
        event() {
            var _this = this;
            this.ball.on('click', 'li', function () {
                _this.autoPlay();
                _this.showImg($(this).index());
            })
        },
        showImg(n) {
            if (n < 0) {
                n = this.li.length - 1;
                this.box.css('left', -this.box.children()[0].clientWidth * (n + 2));
                // this.box.css('left', -600 * (n + 2))

            } else if (n >= this.li.length) {
                n = 0;
                this.box.css('left', 0);
            }
            this.index = n;
            // console.log(this.index);
            this.li.removeClass('now');
            this.li[n].classList.add('now');
            this.box.animate({ left: -this.box.children()[0].clientWidth * (n + 1) }, 500);
        },
        autoPlay() {
            clearInterval(this.tiktok);
            this.tiktok = setInterval(_ => {
                this.showImg(++this.index);
            }, 4000)
        }
    }
}())
// 调用轮播图
swiper.init('.client');

