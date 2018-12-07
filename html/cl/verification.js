var verification = (function () {
    var $from = document.querySelector('.form-box');
    var $btn = document.querySelector('.btn');
    var $inpALl = $from.querySelectorAll('input');
    var checkInput = {
        repassword: function (val) {
            var ele = document.getElementById('password');
            return ele.value == val ? 1 : 0;
        },
        password: function (val) {
            var reg = /^\w{6,13}$/;
            return reg.test(val) ? 1 : 0;
        },
        phone: function (val) {
            var reg = /^1[35789]\d{9}$/;
            return reg.test(val) ? 1 : 0;
        },
        username: function (val) {
            var reg = /^\w{6,13}$/;
            return reg.test(val) ? 1 : 0;
        }
    }
    return {
        init: function () {
            this.event();
        },
        event: function () {
            var _this = this;
            for (var i = 0; i < $inpALl.length; i++) {
                $inpALl[i].onblur = function () {
                    // 文本值去除前后空格
                    var val = this.value.trim();
                    //展示的文本元素节点
                    var $tipText = this.nextElementSibling;

                    if (val == '') {
                        // 文本框内容为空
                        $tipText.className = 'bg-danger';
                        $tipText.innerHTML = '输入内容不能为空';
                    } else {
                        // 文本内容不为空
                        var bool = checkInput[this.name](val);
                        if (bool) {
                            $tipText.className = 'bg-success';
                            $tipText.innerHTML = '输入正确';
                        } else {
                            $tipText.className = 'bg-danger';
                            $tipText.innerHTML = this.getAttribute('data-error');
                        }
                    }
                }
            }
            $btn.onclick = function (ev) {
                ev = ev || window.event;
                for (var i = 0; i < $inpALl.length; i++) {
                    $inpALl[i].focus()
                    $inpALl[i].blur()
                }
                // 获取失败元素
                // 如果有一个， 证明至少有一个表单没有通过验证
                var errorInput = $from.querySelector('.bg-danger');
                if(errorInput) {
                    errorInput.parentNode.querySelector('input').focus();
                } else {
                    console.log('恭喜成功')
                }
                // ev.preventDefault()
            }
        }
    }
}())