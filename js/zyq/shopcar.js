var shopCarList = (function () {
    return {
        init() {
            this.checkList = [];
            this.totalPrice = 0;
            this.shopList = null;
            if (this.getShopList()) {
                this.insertData(this.getShopList());
                this.liAll = $('.shoplist li');
                this.checkAll = $('.check_all');
                this.checkOne = $('.check_one');
                this.plus = $('.countplus');
                this.reduce = $('.countreduce');
                this.removeBtn = $('.shoplist button');
                this.removeAllBtn = $('.total_price em');
            } else {
                return false
            }
            this.event();

        },
        event() {
            var _this = this;
            this.checkAll.click(function () {
                _this.checkList = [];
                if ($(this).prop('checked')) {
                    _this.checkOne.prop('checked', true)
                    _this.checkAll.prop('checked', true)
                    _this.shopList.forEach((item, index) => {
                        _this.checkList.push(index)
                    })
                } else {
                    _this.checkOne.prop('checked', false)
                    _this.checkAll.prop('checked', false)
                }
                console.log(_this.checkList)
                _this.insertTotal();
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
                } else {
                    _this.checkAll.prop('checked', false)
                }
                if ($(this).prop('checked')) {
                    if (_this.checkList.indexOf($(this).parent().index()) == -1) {
                        _this.checkList.push($(this).parent().index())
                    }
                } else {
                    _this.checkList.splice(_this.checkList.indexOf($(this).parent().index()), 1)
                }
                console.log(_this.checkList);
                _this.insertTotal();
            })
            this.plus.click(function () {
                var index = $(this).parent().parent().index();
                console.log(_this.shopList[index].goods_count += 1)
                $(this).siblings('input').prop('value', _this.shopList[index].goods_count)
                $(this).parent().siblings('b').html(`￥${_this.shopList[index].goods_price * _this.shopList[index].goods_count}`)
                _this.setShopList()
                _this.insertTotal();
            })
            this.reduce.click(function () {
                var index = $(this).parent().parent().index();
                if (_this.shopList[index].goods_count > 0) {
                    console.log(_this.shopList[index].goods_count -= 1)
                    $(this).siblings('input').prop('value', _this.shopList[index].goods_count)
                    $(this).parent().siblings('b').html(`￥${_this.shopList[index].goods_price * _this.shopList[index].goods_count}`)
                    _this.setShopList();
                    _this.insertTotal();
                }
            })
            this.removeBtn.click(function () {
                _this.removeLi([$(this).parent().index()])
                $(this).parent().remove();
                window.location.reload();
                _this.insertTotal();
            })
            this.removeAllBtn.click(_ => {
                this.removeLi(this.checkList);
                // this.insertData(this.shopList);
                window.location.reload();
                this.insertTotal();
            })
        },
        insertData(data) {
            $('.shoplist').html('');
            for (var i = 0; i < data.length; i++) {
                $('.shoplist').append(`<li>
                <input type="checkbox" class="check_one" name="" id="">
                <img src="${data[i].goods_image}" alt="">
                <section>
                    <p>${data[i].goods_name}</p>
                    <span>${data[i].goods_type}</span>
                </section>
                <span>￥${data[i].goods_price}</span>
                <div>
                    <i class="countreduce">-</i><input type="text" value=${data[i].goods_count}><i class="countplus">+</i>
                </div>
                <b>￥${data[i].goods_price * data[i].goods_count}</b>
                <button>X</button>
            </li>`)
            }
            this.insertTotal();
        },
        insertTotal() {
            this.totalPrice = 0;
            $('.total_price p i:nth-of-type(1)').html(this.shopList.length);
            $('.total_price p i:nth-of-type(2)').html(this.checkList.length);
            if (this.checkList.length != 0) {
                this.checkList.forEach(item => {
                    this.totalPrice += this.shopList[item].goods_price * this.shopList[item].goods_count;
                    console.log(this.totalPrice)
                });
            }
            $('.total_price strong').html(`￥${this.totalPrice}`)
        },
        removeLi(arr) {
            var newArr = [];
            for (var j = 0; j < this.shopList.length; j++) {
                if (arr.indexOf(j) == -1) {
                    newArr.push(this.shopList[j]);
                }
            }
            for (var k = 0; k < arr.length; k++) {
                this.liAll.eq(arr[k]).remove();
            }
            this.shopList = newArr;
            this.checkAll.prop('checked', false)
            this.checkOne.prop('checked', false)
            this.checkList = []
            this.setShopList();
        },
        getShopList() {
            if (localStorage.getItem('shopList')) {
                this.shopList = localStorage.getItem('shopList');
                this.shopList = JSON.parse(this.shopList);
                console.log(this.shopList);
                return this.shopList
            } else {
                return null
            }
        },
        setShopList() {
            localStorage.shopList = JSON.stringify(this.shopList)
        }
    }
}())
shopCarList.init()