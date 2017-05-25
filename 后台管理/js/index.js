/*
* 
* 首页index.js加载
*
*/

; (function ($) {

    $.extend({
        /*
       *
       * 首页
       *
       */
        indexPage: function (options) {
            var indexPage = $.extend({
                body: "body",
                menu: "#menu",
                content: ".index_content",
                nav: ".index_content nav",
                navUl: ".index_content nav ul",
                contentCon: ".incontent_con",
                lang: '#lang'
            }, options);
            var $div = $("div");
            var commonXml, demoXml, demoContentXml;
            //获取登陆页面lang值
            var url = window.location.href;
            var language = "" + $.getQueryString("lang", url) + ""; //获取url中“lang”之后的参数
            var lang = language.toUpperCase();
            var indexLang = $("#lang").attr("lang", lang);//页面语言切换元素设置当前语言版本

            /////////////////////////////////////////////////////////////////////////        页面初始化||浏览器窗口大小变动     /////////////////////////////////////////////////////////////////////////////////////////////////
            $(window).load(function () {
                bindMenus();
                indexHeightSet();//左侧菜单高度控制
            }).resize(function () {
                indexHeightSet();//左侧菜单高度控制
            });

            //////////////////////////////////////////加载菜单列表///////////////////////////////////////////// 
            var strHtmlCh, strHtmlEn;
            function bindMenus() {

                //$.ajax({
                //    url: "/Home/GetMaxMenu",
                //    type: "post",
                //    datatype: "json",
                //    success: function (data) {

                //        if (data.success) {
                //            strHtmlCh = "<ul class=\"one_level_title\">";
                //            strHtmlEn = "<ul class=\"one_level_title\">";
                //            for (var i = 0; i < data.list.length; i++) {
                //                strHtmlCh += "<li>";
                //                strHtmlCh += "<img src=\"/Content/Images/Icon/submitAudit.png\" />";
                //                strHtmlCh += "<img src=\"/Content/Images/Icon/submitAuditGray.png\" class=\"active_none\" />";
                //                strHtmlCh += "<h4  onclick=\"urlOpen('" + data.list[i].MenusId + "')\">" + data.list[i].MenuName + "</h4>";
                //                strHtmlCh += "<span class=\"glyphicon glyphicon-menu-left\"></span>";
                //                strHtmlCh += "<ul id='minMenu" + data.list[i].MenusId + "' class=\"second_level_title\">";
                //                strHtmlCh += "</ul>";

                //                strHtmlEn += "<li>";
                //                strHtmlEn += "<img src=\"/Content/Images/Icon/submitAudit.png\" />";
                //                strHtmlEn += "<img src=\"/Content/Images/Icon/submitAuditGray.png\" class=\"active_none\" />";
                //                strHtmlEn += "<h4  onclick=\"urlOpen('" + data.list[i].MenusId + "')\">" + data.list[i].MenuEngName + "</h4>";
                //                strHtmlEn += "<span class=\"glyphicon glyphicon-menu-left\"></span>";
                //                strHtmlEn += "<ul id='minMenu" + data.list[i].MenusId + "' class=\"second_level_title\">";
                //                strHtmlEn += "</ul>";

                //            }
                //            strHtmlCh += "</ul>";
                //            strHtmlEn += "</ul>";
                //            if (lang == "CH") {
                //                $(indexPage.menu).html(strHtmlCh);
                //                //$div.data("strHtmlCh", strHtmlCh);//存储中文菜单到$div.data("strHtmlCh");
                //            } else {
                //                $(indexPage.menu).html(strHtmlEn);
                //                //$div.data("strHtmlEn", strHtmlEn);//存储英文菜单到$div.data("strHtmlEn");
                //            }
                //        }
                //    }
                //});
            }
            // 隐藏左边导航栏
            $(".leftmenuHide").bind("click", function () {
                var iClass = $("#splitIconId span").attr("class");
                if (iClass == "") {
                    $("#load_menus").hide();
                    $(".index_content").css("width", "100%");
                    $(".index_aside").css("width", "0");
                    $("#splitIconId span").addClass("active");
                } else {
                    $("#load_menus").show();
                    $(".index_content").css("width", "80%");
                    $(".index_aside").css("width", "20%");
                    $("#splitIconId span").removeClass("active");
                }
            });
            urlOpen = function (index) {
                if (!$div.data("indexMenu" + index)) {
                    if (index.length > 0) {
                        $.ajax({
                            url: "/Home/GetMinMenu",
                            type: "post",
                            dataType: "json",
                            data: {
                                parentMenusId: index
                            },
                            success: function (data) {
                                if (data.success) {
                                    var strHtml = "";
                                    for (var i = 0; i < data.list.length; i++) {
                                        var menuCh = data.list[i].MenuName;
                                        var menuEn = data.list[i].MenuEngName;
                                        if (lang == "EN") {
                                            menuCh = menuEn;
                                        }
                                        
                                        //if (indexLang == "EN") {
                                        //    menuCh = menuEn;
                                        //}
                                        strHtml += "<li><a href='#' ref=" + data.list[i].MenusUrl + "?lang=" + lang + "&menusId=" + data.list[i].MenusId + " title=" + menuCh + " target=\"_blank\"><h5>" + menuCh + "</h5></a></li>";
                                    }
                                    $("#minMenu" + index).html(strHtml);
                                    $div.data("indexMenu" + index, strHtml);
                                }
                            }

                        });
                    }
                } else {
                    $("#minMenu" + index).html($div.data("indexMenu" + index));
                }
            };
            //if ($div.data("indexMenu" + index))  alert($div.data("indexMenu" + index));
            /////////////////////////////////////////////////////////////////////////        加载用户个人信息//////////////////////////////////////
            //$.ajax({
            //    url: "/Home/GetPersonnel",
            //    type: "post",
            //    datatype: "json",
            //    success: function (date) {
            //        if (date) {
            //            var src = $(this).attr("src");
            //            //var $iframeBody = $(this).contents().find("body");
            //            var langEle = "" + $.getQueryString("lang", src) + "";//双引号把获取的src转为字符串
            //            var lang = langEle.toUpperCase();
            //            var name = "";
            //            var department = "";
            //            var email = "";
            //            var phone = "";
            //            //判断语言显示相信的信息
            //            if (lang == "CH") {
            //                name = date.perName; //姓名
            //                department = date.OrganizationName;  //部门
            //            }
            //            else if (lang == "EN") {
            //                name = date.EnglishName;
            //                department = date.OrganiztionEngName;
            //            }
            //            email = date.Email;
            //            phone = date.Phone;
            //            $("#lblName").text(name);
            //            $("#lblDepartment").text(department);
            //            $("#lblEmail").text(email);
            //            $("#lblPhone").text(phone);
            //            //$("#userName").text(name);
            //        }


            //    },
            //    compele: function () {

            //    }
            //});

            /////////////////////////////////////////////////////////////////////////        语言版本XML加载     /////////////////////////////////////////////////////////////////////////////////////////////////

            $.ajax({
                url: commonXMLPath,
                dataType: 'xml',
                async: false,
                success: function (data) {
                    commonXml = getXML(data);
                },
                complete: function () {
                    //setLanguage(temp);
                }
            });

            $.ajax({
                url: demoXMLPath,
                dataType: 'xml',
                async: false,
                success: function (data) {
                    demoXml = getXML(data, "demo");
                    demoContentXml = getXML(data, "demoContent");
                },
                complete: function () {
                    //setLanguage(temp);
                }
            });

            ///////////////////////////////////////////////////////////////////////////        语言版本切换     /////////////////////////////////////////////////////////////////////////////////////////////////
            $("#lang").on("click", function () {
                //框架页面重载
                if ($(this).attr("lang") == "CH") {
                    window.location.href = "/Home/Index?lang=EN";
                } else {
                    window.location.href = "/Home/Index?lang=CH";
                }

                ////框架页面局部刷新
                //$div.removeData("");//清空已存储在$div.data()的菜单数据
                //if ( $(this).attr("lang") == "CH") {
                //    var commonXmlEn;
                //    $.ajax({
                //        url: '/Language/EN/Common.xml',
                //        dataType: 'xml',
                //        async: false,
                //        success: function (data) {
                //            commonXmlEn = getXML(data);
                //        }
                //    });
                //    $(this).attr("lang", "EN").text(commonXmlEn.SwitchVersion);//设置语言版本切换字段的lang值
                //    $(indexPage.menu).html(strHtmlEn);//加载主框架英文菜单
                //    //lang = "EN";
                //} else {
                //    var commonXmlCh;
                //    $.ajax({
                //        url: '/Language/CH/Common.xml',
                //        dataType: 'xml',
                //        async: false,
                //        success: function (data) {
                //            commonXmlCh = getXML(data);
                //        }
                //    });
                //    $(this).attr("lang", "CH").text(commonXmlCh.SwitchVersion);//设置语言版本切换字段的lang值
                //    $(indexPage.menu).html(strHtmlCh);//加载主框架中文菜单
                //    //lang = "CH";

                //}

                ////获取所有已打开的iframe页面的src，判断页面的语言版本，并进行对应语言版本的切换同时刷新已打开的iframe页面
                //$(indexPage.content).find("iframe").each(function () {
                //    var src = $(this).attr("src");
                //    var index = $(this).index();
                //    //var $iframeBody = $(this).contents().find("body");
                //    var langEle = "" + $.getQueryString("lang", src) + "";//双引号把获取的src转为字符串
                //    var lang = langEle.toUpperCase();//转换字符串为大写字母
                //    if (lang === "CH") {
                //        $(this).attr("src", src.replace("lang=" + langEle + "", "lang=EN"));
                //    } else if (lang === "EN") {
                //        $(this).attr("src", src.replace("lang=" + langEle + "", "lang=CH"));
                //    }
                //    $(".index_content ul").empty();//清空选项卡元素
                //    $(".incontent_con").empty();//清空ifram框架元素
                //});

                //获取左侧菜单中的所有a标签的href，通过判断语言版本来设置href中的语言版本的参数
                //$(indexPage.menu).find("a").each(function () {
                //    var href = $(this).attr("href");
                //    var langEle = "" + $.getQueryString("lang", href) + "";
                //    //var lang = $.getQueStr(href, "lang");
                //    var lang = langEle.toUpperCase();//转换字符串为大写字母
                //    if (lang === "CH") {
                //        $(this).attr("href", href.replace("lang=CH", "lang=EN"));
                //    } else if (lang === "EN") {
                //        $(this).attr("href", href.replace("lang=EN", "lang=CH"));
                //    }
                //});
            });
            /////////////////////////////////////////////////////////////////////        用户个人信息    /////////////////////////////////////////////////////////////////////////////////////////////////
            //用户名点击展示个人信息/修改密码模态窗 
            //$.dialogFun('#userInfo', '', commonXml.PersonalInfo, 'dialogMd');//easyui-dialog/ueditor调用
            $("#userName").on("click", function () {
                $('#userInfo').dialog("open");
                //$('#userInfo').dialog({
                //    modal: true,
                //    closed: false,
                //});

            });

            //个人信息/修改密码选项卡切换
            $("#userInfo").on("click", "h4", function () {
                var index = $(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                $("#userInfo article").eq(index).addClass("active").siblings().removeClass("active");
            });

            ///////////////////////////////////    点击修改密码  /////////////////////////////
            //修改密码表单元素验证
            //easyuiForm 提交
            $("#submit").click(function () {
                //$('#oldPassword,#newPassword,#confirmPassword').focus();

                //var oldPassWord = $('#oldPassword').numberbox('getValue');
                //var newPassWord = $("#newPassword").numberbox('getValue');
                // $('#easyuiForm').submit();
                var oldPassWord = $("#oldPassword").val();
                var newPassWord = $("#newPassword").val();
                //修改密码
                //$.ajax({
                //    url: "/Home/ModifyPaw",
                //    type: "post",
                //    datatype: "text",
                //    data: {
                //        oldPassWord: oldPassWord,
                //        newPassWord: newPassWord
                //    },
                //    success: function (date) {
                //        if (date == "00") {
                //            alert("旧密码输入有误");
                //        }
                //        else if (date == "0") {
                //            alert("密码修改失败");
                //        }
                //        else if (date == "1") {
                //            $('#userInfo').dialog("close");
                //            $("#oldPassword").val("");
                //            $("#newPassword").val("");
                //            $("#confirmPassword").val("");
                //        }
                //    },
                //    compele: function () {

                //    }

                //});

                //e.stopPropagation();
                $('#easyuiForm').form('submit', {
                    url: "/Home/ModifyPaw",
                    type: 'post',
                    datatype: 'text',
                    onSubmit: function () {
                        if (!$(this).form('validate')) {
                        }
                        return $(this).form('validate');
                    },
                    success: function (date) {
                        if (date == "Other") {
                            //$.alertFun(messageTypeXml.Tip, commonXml.ErrorPassword, 'warning');
                            //$('#easyuiForm').form('reload');
                        } else if (date == "Error") {
                            $.alertFun(messageTypeXml.Tip, messageConXml.Fail, 'warning');
                        }
                        else if (date == "Success") {
                            $('#userInfo').dialog("close");
                            $("#oldPassword").val("");
                            $("#newPassword").val("");
                            $("#confirmPassword").val("");
                        }
                    }
                });
            });

            //旧密码
            $('#oldPassword').focus(function () {
                //$(this).attr("maxlength", "5");
                //用户名
                $(this).validatebox({
                    required: true,
                    validType: {
                        length: [6, 15]
                    }
                });
            });

            //新密码
            $('#newPassword').focus(function () {
                //$(this).attr("maxlength", "5");
                //用户名
                $(this).validatebox({
                    required: true,
                    validType: {
                        length: [6, 15]
                    }
                });
            });

            //确认新密码
            $('#confirmPassword').focus(function () {
                //$(this).attr("maxlength", "5");
                //用户名
                $(this).validatebox({
                    required: true,

                    validType: {
                        equals: ['#newPassword'],
                        length: [6, 15]
                    }

                });
            });

            /////////////////////////////////////////////////////////////////////////        首页index aside菜单点击显示隐藏     /////////////////////////////////////////////////////////////////////////////////////////////////

            $(indexPage.menu).on("click", "li", function (e) {
                var self = $(this);
                if (self.children("ul").is(":hidden")) {
                    self.addClass("active") //当前元素添加类active
                        .siblings().removeClass("active").find("img[src*='Gray']").addClass("active_none").prev().show().end().end().end()  //当前元素的同辈元素移除类active，同时同辈元素下查找img[src*='Gray'](src值包含Gray的img元素)，并给它添加类active，同时显示该img元素的前一个元素,3个end()返回最初操作的对象self
                            .children("img[src*='Gray']").removeClass("active_none")    //当前元素子元素中包含img[src*='Gray']的元素，对其移除类active_none
                                .prev().hide().end().end()  //当前元素子元素中包含img[src*='Gray']的元素的前一个元素进行隐藏，同时返回最初的操作对象self
                                    .children("ul").delay(100).slideDown() //当前元素下的子元素中标签为ul的元素，执行展开
                                        .siblings(".glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus"); //当前元素下的子元素中标签为ul的元素的同辈元素中类名为glyphicon的元素移除类glyphicon-menu-left，添加类glyphicon-menu-down
                } else {
                    self.removeClass("active")
                         .siblings().removeClass("active").find("img[src*='Gray']").addClass("active_none").prev().show().end().end().end()
                            .children("img[src*='Gray']").addClass("active_none")
                                .prev().show().end().end()
                                    .children("ul").delay(100).slideUp()
                                        .siblings(".glyphicon").removeClass("glyphicon-minus").addClass("glyphicon-plus");
                }

                e.stopPropagation();//阻止事件冒泡
            });

            /////////////////////////////////////////////////////////////////////////        首页index---- aside菜单a标签链接跳转       /////////////////////////////////////////////////////////////////////////////////////////////////
            $(indexPage.menu).on("click", "a", function (e) {
                $(".index_content>nav>ul").css("left", "0");
                var self = $(this); //定义当前操作对象为self
                var iframeEle = $(indexPage.contentCon).find("iframe");    //定义indexPage.contentCon对象下的iframe元素为iframeEle
                var aText = self.text();    //获取当前a标签的文本内容
                var aHref = self.attr("ref");  //获取当前a标签的链接
                var winHeight = $(window).height();  //浏览器窗体高度
                var iframeHeight = winHeight - 134;  //iframe框架高度
                var newLi = '<li class="active"><h5>' + aText + '</h5><button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button></li>';  //定义首页选项卡中新增加的li元素为newLi
                var newAframe = '<iframe class="active" style="height:' + iframeHeight + 'px" src=' + aHref + ' scrolling="yes"></iframe>'; //定义首页内容区域中新增加的iframe元素为newAframe
                var aInit = false, num = 0; //设置当前元素执行操作时，初始化值
                //$(".index_content").removeClass("active"); //右侧模块的背景图取消
                //$(".index_content nav").show(); //选项卡显示

                self.parents(".index_aside").find("a").removeClass("active").end().end()
                        .addClass("active");    //当前元素的父元素中包含类index_aside的元素，查找该对象的所有子元素中的a标签，移除a标签的类active，并返回最初的对象，并添加类active

                //判断是否已存在打开的链接，有则返回aInit = true;
                for (var i = 0; i < iframeEle.length; i++) {
                    var thisSrc = iframeEle.eq(i).attr("src");
                    if (aHref === thisSrc) {
                        iframeEle.eq(i).attr("aInit", "true");
                        num = i;
                        aInit = true;
                    }
                }
                //已存在打开链接则打开相应链接，否则重新创建iframe，并打开
                if (aInit === true) {
                    $(indexPage.navUl).find("li").eq(num).addClass("active").prependTo($(indexPage.navUl)).siblings().removeClass("active");
                    $(indexPage.contentCon).find("iframe").eq(num).addClass("active").prependTo($(indexPage.contentCon)).siblings().removeClass("active");  //如果已存在该页面，则添加类active显示该页面，同时把该页面添加到同级元素中的第一个，并把该元素的其他同辈元素移除类active
                    //return false;
                } else {

                    $(indexPage.navUl).find("li").removeClass("active").end().prepend(newLi);//生成选项卡子项
                    $(indexPage.contentCon).children("iframe").removeClass("active").end().prepend(newAframe);//生成新的iframe框架
                    //当iframe 页面存在时执行，同时当iframe页面加载完成后执行addNewPage()绑定
                }
                scrollE();//执行滚动条模拟btn函数
                e.preventDefault();//阻止事件冒泡
            });

            ////////////////////////////////////////////////////////////////////////        首页index----选项卡点击显示相应的iframe页面      /////////////////////////////////////////////////////////////////////////////////////////////////
            $(indexPage.nav).on("click", "li", function () {
                //var ulEle = $(this).parent();
                var self = $(this);
                var index = self.index();
                var aEle = $(indexPage.menu).find("a");
                self.addClass("active").siblings().removeClass("active");
                $(indexPage.contentCon).find("iframe").eq(index).addClass("active").siblings().removeClass("active");
                var thisSrc = $(indexPage.contentCon).find("iframe").eq(index).attr("src");
                //遍历左侧menu的a标签，匹配左侧a链接与右侧选项卡页面的链接符合，符合则添加类，不符合则移除类
                aEle.each(function () {
                    if ($(this).attr("href") == thisSrc) {
                        $(this).addClass("active");
                    } else {
                        $(this).removeClass("active");
                    }
                });
            });


            ////////////////////////////////////////////////////////////////////////        首页index----选项卡模拟滚动条事件按钮btn显示/隐藏       /////////////////////////////////////////////////////////////////////////////////////////////////
            function scrollE() {
                var navWidth = $(indexPage.nav).width();
                var ulWidth = $(indexPage.navUl).width();
                $(indexPage.nav).mouseover(function () {
                    if (navWidth < ulWidth) {
                        $(".scrollA,.scrollB").show();
                    } else {
                        $(".scrollA,.scrollB").hide();
                    }
                }).mouseleave(function () {
                    $(".scrollA,.scrollB").hide();
                });
            }


            //////////////////////////////////////////////////////////////////////////////        首页index----选项卡关闭btn点击事件        /////////////////////////////////////////////////////////////////////////////////////////////////
            $(indexPage.nav).on("click", ".close", function (e) {
                e.stopPropagation();
                var self = $(this);
                var liEle = self.parent();
                var index = liEle.index();
                var prevLiEle = new Object, nextLiEle = new Object;
                var iframeEle = $(".index_content iframe");
                if (liEle.hasClass('active')) {
                    if (index != 0) {
                        prevLiEle = liEle.prev();
                        prevLiEle.addClass('active');
                        iframeEle.eq(index - 1).addClass('active');
                    } else {
                        //alert();
                        if (liEle.next().length != 0) {
                            nextLiEle = liEle.next();
                            nextLiEle.addClass('active');
                            iframeEle.eq(index + 1).addClass('active');
                        }
                    }
                }
                liEle.remove();//移除选项卡对应的li元素
                iframeEle.eq(index).remove();//移除对应的iframe元素

            });
            //////////////////////////////////////////////////////////////////////////////        选项卡按钮btn点击左移右移事件       /////////////////////////////////////////////////////////////////////////////////////////////////

            $(indexPage.content).on("click", ".scrollA", function () {
                var left = parseInt($(indexPage.navUl).css("left"));
                if (left <= -200) {
                    if ($(indexPage.navUl).is(":animated")) {
                        $(indexPage.navUl).stop(false, true).animate();
                    } else {
                        $(indexPage.navUl).animate({ left: "+=202" }, 500);
                    }
                }
            });

            $(indexPage.content).on("click", ".scrollB", function () {
                var divWidth = parseInt($(indexPage.nav).width());
                var ulWidth = parseInt($(indexPage.navUl).width());
                var colUl = ulWidth - divWidth;
                var left = parseInt($(indexPage.navUl).css("left"));
                if (left >= -colUl) {
                    if ($(indexPage.navUl).is(":animated")) {
                        $(indexPage.navUl).stop(false, true).animate();
                    } else {
                        $(indexPage.navUl).animate({ left: "-=202" }, 500);
                    }
                }
            });
            ///////////////////////////////////////////////////////////////////////////////////         index.page左侧菜单高度控制       /////////////////////////////////////////////////////////////////////////////////////////////////

            function indexHeightSet() {
                var winHeight = $(window).height();
                $(".index_aside").parent().css("height", (winHeight - 100) + 'px');
                $(".index_aside").css("height", (winHeight - 100) + 'px');
                $(".incontent_con").children().css("height", (winHeight - 134) + 'px');
            }
        }
    });
})(jQuery)