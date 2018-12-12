var shopCarList = (function () {
    return {
        init() {
            this.checkAll = $('.check_all');
            this.checkOne = $('.check_one');
            this.shopList = null;
            this.checkList = [];
            this.checkBox()

        },
        event() {


        },
        checkBox() {
            var _this = this;
            this.checkAll.click(function () {
                if ($(this).prop('checked')) {
                    _this.checkOne.prop('checked', true)
                    _this.checkAll.prop('checked', true)
                    _this.checkList = 'all';
                } else {
                    _this.checkOne.prop('checked', false)
                    _this.checkAll.prop('checked', false)
                    _this.checkList = null;
                }
            })
            this.checkOne.click(function () {
                var flag = true;
                _this.checkOne.each(function () {
                    if (!$(this).prop('checked')) {
                        flag = false;
                        return
                    }
                })
                if (flag) {
                    _this.checkAll.prop('checked', true)
                }
                if ($(this).prop('checked')) {
                    _this.checkList.push($(this).parent().index())
                    console.log($(this).parent().index())
                }

            })
        },
        remove(arr) {

        },
        changeCount() {

        },
        getShopList() {
            if (localStorage.getItem('shopList')) {
                this.shopList = localStorage.getItem('shopList');
                this.shopList = JSON.parse(this.shopList);
                return this.shopList
            } else {
                return null
            }
        },
        setShopList() {
            localStorage.shopList = JSON.stringify(this.shopList)
        },
        setItem(data) {
            // 现获取原有数据
            var shopList = localStorage.getItem('shopList') || '[]';
            shopList = JSON.parse(shopList);
            console.log(data, shopList);
            // 判断购物数据中, 是否存在当前商品
            for (var i = 0; i < shopList.length; i++) {
                if (data.goods_id == shopList[i].goods_id) {
                    // 此商品已经存在
                    shopList[i].goods_count += data.goods_count;
                    break;
                }
            }
            if (i == shopList.length) {
                // 商品不存在
                shopList.push(data);

            }
            // shopList[i].count += data.count;
            // 在把全部数据存到本地
            localStorage.shopList = JSON.stringify(shopList);
            // console.log(shopList);
        }
    }
}())
shopCarList.init()