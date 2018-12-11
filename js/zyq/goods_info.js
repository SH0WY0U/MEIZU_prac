var index = parseInt(location.search.slice(1).split("=")[1]);
$.get("/json/zyq/list.json", res => {
    console.log(res[index])
})
var goodsInfo = (function () {
    return {
        init() {
            this.goodsName = $('.goods_name');
            this.goodsPrice = $('.goods_price');
            this.goodstype = $('.goods_type');
            this.goodsImage = $('.goods_image');
            this.info = [];
        },
        event() {

        },
        getData() {

        },
        insertData() {

        },
        setLocalItem(data) {
            // 现获取原有数据
            var shopList = localStorage.getItem('shopList') || '[]';
            shopList = JSON.parse(shopList);
            // 在把新数据push到原有数据
            shopList.push(data);
            // 在把全部数据存到本地
            localStorage.shopList = JSON.stringify(shopList);
            // console.log(shopList);

        }
    }
}())