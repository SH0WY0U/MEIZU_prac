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
            console.log(this.index);
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
swiper.init('.client')