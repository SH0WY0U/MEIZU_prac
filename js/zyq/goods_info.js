var goodsInfo = (function () {
    return {
        init(targerUrl) {
            this.goodsName = $('.goods_name');
            this.goodsPrice = $('.goods_price');
            this.goodsTag = $('.goods_tag');
            this.goodsType = $('.goods_type');
            this.goodsImage = $('.goods_image');
            this.count = $('#J_quantity');
            this.reduce = $('.mod-control .vm-minus')
            this.plus = $('.mod-control .vm-plus')
            this.addShopcar = $('#J_btnAddCart');
            this.info = {};
            this.getData(targerUrl);
            this.event()
            this.index = parseInt(location.search.slice(1).split("=")[1]);
        },
        event() {
            this.reduce.click(_ => {
                if (this.count[0].value > 1) {
                    this.count[0].value = parseInt(this.count[0].value) - 1;
                } else {
                    this.count[0].value = 1;
                }
                this.info.goods_count = parseInt(this.count[0].value);
            })
            this.plus.click(_ => {
                if (this.count[0].value >= 1) {
                    this.count[0].value = parseInt(this.count[0].value) + 1;
                } else {
                    this.count[0].value = 1;
                }
                this.info.goods_count = parseInt(this.count[0].value);
            })
            this.addShopcar.click(_ => {
                this.setItem(this.info);
            })
        },
        getData(url) {
            $.get(url, res => {
                res = JSON.parse(res);
                // console.log(res[this.index])
                this.insertData(res[this.index])
            })
        },
        insertData(data) {
            this.goodsName.html(data.goods_name);
            this.goodsPrice.html(data.goods_price);
            this.goodsImage.attr('src', data.goods_image)
            this.goodsTag.html(data.goods_tag);
            this.goodsType.html(data.goods_type[0]);
            for (var i = 1; i < data.goods_type.length; i++) {
                var newType = this.goodsType.clone()
                this.goodsType.after(newType.html(data.goods_type[i]))
            }
            this.info = {
                goods_id: data.goods_id,
                goods_name: data.goods_name,
                goods_price: data.goods_price,
                goods_image: data.goods_image,
                goods_type: data.goods_type[0],
                goods_count: 1
            }
            // console.log(this.info);
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
goodsInfo.init(getApi.getShopJson)