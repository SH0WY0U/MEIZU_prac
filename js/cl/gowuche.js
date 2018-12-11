window.onload = function() {

	var obj = {

		userName: location.search.split("=")[1],
		showinfo:$("#showinfo"),
		
		checkAll: $(".checkAll"),
		totalCount: $(".totalCount"),
		totalPrice: $(".totalPrice"),
		delgoods: $(".delgoods"),
		deslectionBtn: $(".deslectionBtn"),
		delCartGoods: $("#delCartGoods"),

	}

	//实现购物车功能
	new ShowCartGoodsInfo(obj);

}

class ShowCartGoodsInfo {

	constructor(obj) {
		this.userName = obj.userName;
		this.showinfo = obj.showinfo;
		this.checkAll = obj.checkAll;
		this.totalCount = obj.totalCount;
		this.totalPrice = obj.totalPrice;
		this.delgoods = obj.delgoods;
		this.deslectionBtn = obj.deslectionBtn;
		this.getCartGoods();
		this.getGoods();
		this.showname();
		this.delCartGoods = obj.delCartGoods;

	};
	showname() {
		$(".uid").html(this.userName)

	};
	getCartGoods() {
		//判断购物车信息是否存在
		if(localStorage.getItem(this.userName + "Goods")) {

			var cartGoods = localStorage.getItem(this.userName + "Goods");

			var cartGoodsArr = JSON.parse(cartGoods);
			this.CartGoodsInfo = cartGoodsArr;

		} else {
			this.CartGoodsInfo = null;
		}

		//console.log(this.userName+"Goods")
	};
	getGoods() {

		var _this = this;

		$.getJSON("../../json/cl/showinfo.json", function(res) {

			_this.goods = res;

			_this.ShowCartGoodsInfo(res);

		})

	};
	ShowCartGoodsInfo(res) {

		if(this.CartGoodsInfo) {
			var str = '';
			for(var i = 0; i < res.length; i++) {
				for(var j = 0; j < this.CartGoodsInfo.length; j++) {
					if(res[i].bid == this.CartGoodsInfo[j].bid) {
						str += `
								<ul class="itemshow">
		                    	<li class="nav-item">
		                    	<input type="checkbox" name="" id="" value="" class="checkOne" />
		                    	<input class="goodBid" type="hidden" value="${this.CartGoodsInfo[j].bid}"/>
		                    	</li>
		                    	<li class="imgghu"><img  src="images/zyq/phone00 ${res[i].src}"/></li>
		                    	<li class="kop">${res[i].kop}</li>
		                    	<li class="goodprice">${res[i].price}</li>
		                    	<li class="goodcount" style="width:50px ;margin-left:190px"> ${this.CartGoodsInfo[j].count}</li>
		                    	<li class="totals">${Number(this.CartGoodsInfo[j].count)*Number(res[i].price)}</li>
		                    	<li class="actions"> <input type="button" value="-" class="del"/>|<input class="add" type="button" value="+"/></li>
		                    	</ul>
		                    	
						   `;

					}

				}

			}
			this.showinfo.html(str);
		}

		new SelectCart(this);
	}

}

class SelectCart {

	constructor(obj) {

		this.goods = obj.goods;
		this.userName = obj.userName;
		this.checkAll = obj.checkAll;
		this.showinfo = obj.showinfo;
		this.totalCount = obj.totalCount;
		this.totalPrice = obj.totalPrice;
		this.deslectionBtn = obj.deslectionBtn;
		this.deselection();
		this.selectOne();
		this.selectAll();
		this.updateCart(1, ".add");
		this.updateCart(-1, ".del");
		this.computeCart = new ComputeCart(this.userName, this.goods);
		this.delCartGoods = obj.delCartGoods;
		this.deletCartGoodsInfo();
	};
	selectAll() {

		var checkOne = this.showinfo.find(".checkOne");

		var _this = this;

		//			console.log(this.checkAll)

		this.checkAll.click(function() {

			checkOne.prop("checked", $(this).prop("checked"));
			$(this).prop("disabled", true);

			_this.deslectionBtn.prop("checkde", false).prop("disabled", false);

			var goodsCount = _this.showinfo.find(".goodcount");
			var goodBid = _this.showinfo.find(".goodBid");
			var totalCount = 0;
			var totalPrice = 0;

			for(var i = 0; i < goodsCount.length; i++) {
				console.log(goodBid.eq(i).val())
				_this.computeCart.setBid(goodBid.eq(i).val());
				_this.computeCart.setGoodCount();
				_this.computeCart.setGoodPrice();
				totalCount += _this.computeCart.count;
				totalPrice += _this.computeCart.count * _this.computeCart.price;
			}

			_this.totalCount.html(totalCount);

			_this.totalPrice.html(totalPrice);

		});
	};

	selectOne() {

		var checkOne = this.showinfo.find(".checkOne");
		//保存当前对象
		var _this = this;
		//点击单个商品的复选框
		checkOne.click(function() {
			//判断是否有没被选中的商品，true表示所有的都被选中了，false表示最少有一个没被选中
			var flag = true;
			//判断是否有商品是被选中的，false表示所有的都没有被选中，true表示最少有一个是选中的。
			var hasChecked = false;
			for(var i = 0; i < checkOne.length; i++) {
				if(!checkOne.eq(i).prop("checked")) {
					flag = false; //最少有一个没被选中
				} else {
					hasChecked = true; //最少有一个是选中的
				}
			}
			if(!flag) { //如果有一个没被选中
				//全选按钮可以点击了，状态设置为未选中状态。
				_this.checkAll.prop("checked", false).prop("disabled", false);
			} else { //所有的都被选中了
				//全选按钮禁止点击，状态设置为选中状态。
				_this.checkAll.prop("checked", true).prop("disabled", true);
			}
			if(hasChecked) { //只要有一个被选中，就可以点击取消选择按钮
				//取消选择按钮可以点击了，状态设置为未选中状态。
				_this.deslectionBtn.prop("checked", false).prop("disabled", false);
			} else { //所有商品都未选中，取消选择按钮则无法点击
				//取消选择按钮禁止点击，状态设置为选中状态。
				_this.deslectionBtn.prop("checked", true).prop("disabled", true);
			}
			//计算功能实现
			//查找到显示商品条数的元素标签
			var goodsCount = _this.showinfo.find(".goodCount");
			//查找到保存商品编号bid的隐藏域。
			var goodBid = _this.showinfo.find(".goodBid");
			//用于计算选中商品的总条数
			var totalCount = 0;
			//用于计算选中商品的总金额。
			var totalPrice = 0;
			for(var i = 0; i < checkOne.length; i++) {
				if(checkOne.eq(i).prop("checked")) {
					//保存当前商品编号
					_this.computeCart.setBid(goodBid.eq(i).val());
					//保存当前商品条数
					_this.computeCart.setGoodCount();
					//保存当前商品单价
					_this.computeCart.setGoodPrice();
					//console.log(_this.computeCart.count);
					//计算选中的商品总条数
					totalCount += _this.computeCart.count;
					//计算选中的商品总价。
					totalPrice += _this.computeCart.count * _this.computeCart.price;
				}
			}
			//在页面显示所有选中商品条数
			_this.totalCount.html(totalCount);
			//在页面显示所有选中商品总价
			_this.totalPrice.html(totalPrice);
		})

	};
	deselection() {
		var _this = this;
		//选择所有的表示单个商品的复选框
		var checkOne = this.showinfo.find(".checkOne");
		//点击取消选择按钮
		this.deslectionBtn.click(function() {
			//全选按钮可以点击了，状态设置为未选中状态。
			_this.checkAll.prop("checked", false).prop("disabled", false);
			//所有的表示单个商品的复选框，都为未选中状态。
			checkOne.prop("checked", false);
			//消选择按钮此时为禁止状态，不能被再次点击。
			$(this).prop("disabled", true);
			//没有商品被选中，商品总条数当然为0啊
			_this.totalCount.html(0);
			//没有商品被选中，商品总价也必须为0啊，不用付钱了
			_this.totalPrice.html(0);
		});
	};

	updateCart(num, className) {
		//初始化单个商品的复选框为null
		var checkOne = null;
		var _this = this;
		//为删除或增加商品的按钮添加click事件
		this.showinfo.delegate(className, "click", function() {
			//console.log(1,num);
			//获取当前商品编号
			var bid = $(this).parent().parent().find(".goodBid").val();
			//保存当前商品编号
			_this.computeCart.setBid(bid);
			//保存当前商品条数
			_this.computeCart.setGoodCount();
			//保存当前商品单价
			_this.computeCart.setGoodPrice();
			//当前商品条数加1
			_this.computeCart.updateCount(num);

			//当前商品条数小于0时，删除当前商品信息，删除购物车保存的当前商品信息。
			if(_this.computeCart.count <= 0) {
				//删除当前商品信息
				$(this).parent().parent().remove();
				//删除购物车保存的当前商品信息。
				_this.computeCart.delCartGood();
				/*
				 * 因为当商品条数小于0后，该条商品在页面被删除了，但是原来被选中的该条商品数据仍存留在
				 * 内存中没被销毁,以下三个方法重新执行，是为了重新初始化当前页面数据。
				 */
				_this.selectOne();
				_this.updateCart(0, ".add");
				_this.updateCart(0, ".del");
			} else {
				//显示当前商品数据
				$(this).parent().parent().find(".goodcount").html(_this.computeCart.count);
				//console.log(_this.computeCart.count)
				// $(this).parent().parent().find(".goodCount").html(_this.computeCart.count);//$(this).parent().parent().find(".goodCount").html(_this.computeCart.count);

				//计算当前商品总价

				$(this).parent().parent().find(".total").html(_this.computeCart.count * _this.computeCart.price);
				// $(".totalPrice").html(_this.computeCart.count*_this.computeCart.price);
			}
			checkOne = _this.showinfo.find(".checkOne");
			//计算所选商品总条数和总价格
			var totalCount = 0; //总条数
			var totalPrice = 0; //总价格

			for(var i = 0; i < checkOne.length; i++) {
				//找到所有被选中的商品
				if(checkOne.eq(i).prop("checked")) {
					//把选中的商品条数累加

					totalCount += Number(_this.showinfo.find(".goodcount").eq(i).html());
					//把选中的商品价格累加
					totalPrice += Number(_this.showinfo.find(".total").eq(i).html());

					//console.log(totalCount,totalPrice)
				}

			}
			//console.log(totalCount,totalPrice)
			/*_this.totalCount.html(totalCount);//显示总条数
			_this.totalPrice.html(totalPrice);//显示总价格*/
			//更新localstorage数据
			_this.computeCart.setLocalstorage();
			//更新当前数据
			_this.computeCart.getCart();
			_this.totalCount.html(totalCount); //显示总条数
			_this.totalPrice.html(totalPrice);
		});
	};
	deletCartGoodsInfo() {
		var _this = this;
		var checkOne = this.showinfo.find(".checkOne");
		//点击删除所选商品
		this.delCartGoods.click(function() {
			//遍历所有选中商品
			//alert(11)
			for(var i = 0; i < checkOne.length; i++) {
				if(checkOne.eq(i).prop("checked")) {
					//设置选中商品的编号
					_this.computeCart.setBid(checkOne.eq(i).parent().parent().find(".goodBid").val());
					//删除已显示的选中商品。
					checkOne.eq(i).parent().parent().remove();
					//删除选中的购物车商品。
					_this.computeCart.delCartGood();
				}
			}
			_this.totalCount.html(0); //总条数置为0
			_this.totalPrice.html(0); //总价格置为0

			/*
			 * 因为当选中商品被删除后，但是原来被选中的这些商品数据仍存留在
			 * 内存中没被销毁,以下三个方法重新执行，是为了重新初始化当前页面数据。
			 */
			_this.selectOne();
			_this.updateCart(0, ".add");
			_this.updateCart(0, ".del");
		});
	}

}

class ComputeCart {

	constructor(userName, goods) {
		this.goods = goods;
		this.bid = "";
		this.userName = userName;
		this.cartArr = null;
		this.count = 0;
		this.price = 0;
		this.getCart();

	};

	getCart() {

		if(localStorage.getItem(this.userName + "Goods")) {

			var cartStr = localStorage.getItem(this.userName + "Goods");
			this.cartArr = JSON.parse(cartStr);

		} else {
			this.cartArr = null;
		}

	};
	setBid(bid) {
		this.bid = bid;
		//console.log(this.bid)
	}

	setGoodCount() {

		if(this.cartArr) {

			for(var i = 0; i < this.cartArr.length; i++) {
				if(this.cartArr[i].bid == this.bid) {

					this.count = Number(this.cartArr[i].count);

				}
			}

		}

	};

	setGoodPrice() {
		for(var i = 0; i < this.goods.length; i++) {
			if(this.goods[i].bid == this.bid) {
				this.price = this.goods[i].price;
				//console.log(this.price)
			}
		}

	};

	updateCount(num) {
		this.count += num;
		//console.log(this.count)
	};
	setLocalstorage() {
		var storageStr = localStorage.getItem(this.userName + "Goods");
		var storageArr = JSON.parse(storageStr);
		for(var i = 0; i < storageArr.length; i++) {
			if(storageArr[i].bid == this.bid) {
				//因为该商品个数更新了，所有购物车里的该商品个数也要随之更新。
				storageArr[i].count = this.count;
			};
		}
		var storageJson = JSON.stringify(storageArr);
		//更新购物车中的商品信息。
		localStorage.setItem(this.userName + "Goods", storageJson);

	};
	delCartGood() {
		var storageStr = localStorage.getItem(this.userName + "Goods");
		var storageArr = JSON.parse(storageStr);
		for(var i = 0; i < storageArr.length; i++) {
			if(storageArr[i].bid == this.bid) {
				//删除整条该商品信息
				storageArr.splice(i, 1);
				//该条商品信息已经删除，无需再循环了。
				break;
			};
		}
		var storageJson = JSON.stringify(storageArr);
		//该条商品信息删除后，购物车中的商品信息也需要更新的。
		localStorage.setItem(this.userName + "Goods", storageJson);
	}

}