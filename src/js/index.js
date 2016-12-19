var $ = require('jquery');
$(function(){
    //var topbar = $('<section class="topbar"><div class="menu"></div></section>');
    //$(document.body).append(topbar);
    //Common.gettop("选择模板");
    Templetlist.run(function(){
        $(document.body).append('<section class="body"><div class="footbar">2016/05/04</div></section>');
    });
});