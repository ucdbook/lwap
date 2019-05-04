$(function () {
    var $text = $('.login-error-msg');
    var $span = $('#get-captcha2 > span');
    var $getCaptcha1 = $('#get-captcha1');
    var $getCaptcha2 = $('#get-captcha2');
    var regExp = new RegExp(/[a-zA-Z:\(\)/-]/g);
    var key;

    for (key in $.cookie()) {
        $.removeCookie(key, {
            path: '/'
        })
    }

    // console.log(window.location.host)
    // var domain = window.location.host;

    $getCaptcha1.on('click', function () {
        var json = verify(1);
        var time = 60;
        if (!json) {
            return;
        }
        $.ajax({
            url: '/pagePuildApi/apiTesting/doTest',
            type: 'post',
            data: {
                url: 'http://web-ehuodiBedrockApi-vip/ehuodiBedrockApi/baseconfigcs/loginIdentify',
                data: JSON.stringify({
                    username: json.username,
                    password: json.password
                }),
                headers: JSON.stringify({
                    Cookie: document.cookie
                })
            },
            async: false,
            success: function (data) {
                data = JSON.parse(data.body);
                if (data) {
                    if (data.result === 'success') {
                        $getCaptcha1.hide();
                        $getCaptcha2.show();
                        $span.text(time);
                        var timer = setInterval(function () {
                            if (time <= 0) {
                                clearInterval(timer);
                                $getCaptcha1.css({
                                    display: 'inline'
                                });
                                $getCaptcha2.hide();
                            } else {
                                time = time - 1;
                                $span.text(time);
                            }
                            console.log(time)
                        }, 1000, 60);
                    } else {
                        $text.text(data.msg.replace(regExp, ''));
                    }
                } else {
                    $text.text('获取验证码失败');
                }
            },
            error: function () {
                $text.text('获取验证码失败');
            }

        })

    });

    $('#submit').on('click', function () {
        var json = verify();
        if (!json) {
            return;
        }
        $.ajax({
                url: '/pagePuildApi/apiTesting/doTest',
                type: 'post',
                data: {
                    url: 'http://web-ehuodiBedrockApi-vip/ehuodiBedrockApi/baseconfigcs/login',
                    data: JSON.stringify({
                        username: json.username,
                        password: json.password,
                        identifycode: json.captcha || '5735'
                    }),
                    headers: JSON.stringify({
                        Cookie: document.cookie
                    })
                },
                async: false,
                success: function (data) {
                    data = JSON.parse(data.body);
                    if (data) {
                        if (data.result === 'success') {

                            $.cookie('session_key', data.data.session_key, {
                                path: '/',
                                // domain: window.location.hostname !== 'location' ? window.location.host : ''
                            });
                            $.cookie('jobcard', data.data.jobcard, {
                                path: '/',
                                // domain: window.location.hostname !== 'location' ? window.location.host : ''
                            });
                            $.cookie('username', data.data.username, {
                                path: '/',
                                // domain: window.location.hostname !== 'location' ? window.location.host : ''
                            });
                            $('.form-logo').addClass('logo-show');
                            $('.login-mascot').removeClass('login-mascot-bounce');
                            setTimeout(function () {
                                $('.login-mascot').addClass('login-mascot-fly');
                            });
                            setTimeout(function () {
                                window.location.href = '/';
                            }, 700);
                        } else {
                            $text.text(data.msg.replace(regExp, ''));
                        }
                    } else {
                        $text.text('登录失败');
                    }
                },
                error: function () {
                    $text.text('登录失败');
                }
            }

        )

    });
    $('#username').focus();
})


function verify(num) {
    var $text = $('.login-error-msg');
    var username = $('#username').val(),
        password = $('#password').val(),
        captcha = $('#captcha').val();
    if (!username) {
        $text.text('请输入您的登录名(如工号)');
        return;
    }
    if (!password) {
        $text.text('请输入您的密码');
        return;
    }
    $text.text('');
    return {
        username: username,
        password: password,
        captcha: captcha
    };
}