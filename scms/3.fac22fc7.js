(window.scms=window.scms||[]).push([[3],{uRRY:function(module,exports,__webpack_require__){"use strict";function verify(num){var $text=$(".login-error-msg"),username=$("#username").val(),password=$("#password").val(),captcha=$("#captcha").val();if(username)if(password){if(captcha||num)return $text.text(""),{username:username,password:password,captcha:captcha};$text.text("请输入验证码")}else $text.text("请输入您的密码");else $text.text("请输入您的登录名(如工号)")}$(function(){$("#J_LoginPage").removeClass("not-ready");var key,$text=$(".login-error-msg"),$span=$("#get-captcha2 > span"),$getCaptcha1=$("#get-captcha1"),$getCaptcha2=$("#get-captcha2"),$errorMsg=$(".dialog-message"),$errorDialog=$(".login-dialog");for(key in $(".loginIndexPage").append('<div class="qrcode-for-mobile"><div class="qr-header">移动风豹</div><a id="closeQr" type="button" class="close-me"><span aria-hidden="true">&times;</span></a><div id="qrcodeImage" class="qr-bg-img"></div><div class="qr-footer">货嘀移动办公小秘</div></div>'),$(document).on("click","#closeQr",function(){$(".qrcode-for-mobile").hide()}),"scms.ehuodi.com"===location.hostname?$("#qrcodeImage").addClass("for-prod").removeClass("for-test"):$("#qrcodeImage").addClass("for-test").removeClass("for-prod"),$.cookie())"updater"!==key&&($.removeCookie(key),$.removeCookie(key,{path:"/"}));function login(){var json=verify();json&&$.ajax({url:"/ehuodiBedrockApi/baseconfigcs/login",type:"post",data:{username:json.username,password:json.password,identifycode:json.captcha},success:function(data){data?"success"===data.result?($.cookie("session_key",data.data.session_key,{path:"/"}),$.cookie("jobcard",data.data.jobcard,{path:"/"}),$.cookie("username",data.data.username,{path:"/"}),$(".form-logo").addClass("logo-show"),$(".login-mascot").removeClass("login-mascot-bounce"),setTimeout(function(){$(".login-mascot").addClass("login-mascot-fly")}),setTimeout(function(){window.location.href="/scms/"},700)):"TF001020433205"===data.code?($errorDialog.show(),$errorMsg.text("风豹系统为易货嘀运营管理后台，非货嘀公司人员不能登录。如有需要，请联系管理员（17776@etransfar.com）核实开通。"),$(".login-dialog").addClass("in")):$text.text(data.msg):$text.text("登录失败")},error:function(){$text.text("登录失败")}})}$errorDialog.hide(),$getCaptcha1.on("click",function(){var json=verify(1),time=60;json&&$.ajax({url:"/ehuodiBedrockApi/baseconfigcs/loginIdentify",type:"post",data:{username:json.username,password:json.password},success:function(data){if(data)if("success"!==data.result)$text.text(data.msg);else{$getCaptcha1.hide(),$getCaptcha2.css({display:"inline"}),$span.text(time);var timer=setInterval(function(){time<=0?(clearInterval(timer),$getCaptcha1.css({display:"inline"}),$getCaptcha2.hide()):(time-=1,$span.text(time))},1e3,60)}else $text.text("获取验证码失败，请稍后再试。")},error:function(){$text.text("获取验证码失败，请稍后再试。")}})}),$("#captcha").keydown(function(e){13==e.keyCode&&login()}),$("#submit").on("click",function(){login()}),$("#username").focus(),$("#closeDialog").on("click",function(){$errorDialog.hide(),$errorMsg.text(),$(".login-dialog").removeClass("in")})})}}]);
//# sourceMappingURL=3.fac22fc7.js.map