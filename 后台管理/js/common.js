/*
*
* common.js
*
*/
//全局变量
//document.write('<script src="/Js/public/md5.js"><\/script>');
var commonXml;//语言版本的变量
var editIndex = undefined, editRow = undefined, editCell, editRow, endEditing, onClickCell, saveRow, cancelRow, editcount = 0, delRow;;//datagrid定义全局变量：当前编辑的行
var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //
var lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();
var commonVar = {
    body: 'body',
    conditionBox: '.searchCondition_box',
    viewList: '.viewList'

};
//格式化日期：yyyy-MM-dd
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
}
//数组去重复
Array.prototype.distinct = function () {
    var res = [];
    var json = {};
    for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}
///////////////////////////////////////////////////////////////////////////////////     页面初始化       //////////////////////////////////////////////////////////////////////////////////////////////////////////
jQuery(function ($) {
    //var locationUrl = window.location.href;
    //if (locationUrl.indexOf("Index") == "-1") { //非首页加载
    //    $.pageLangFun();
    //} else {
    //    $.pageLangFun("indexPage"); //页面加载执行
    //}
    $.pageLangFun();//页面语言版本初始化加载
    //$.easyuiValRule(); //加载验证规则
    $.addNewPage();
    //搜索条件按钮组title属性语言版本
//  $(".searching_btn .search_btn").attr("title", commonXml.Query);//查询
//  $(".searching_btn .reset_btn").attr("title", commonXml.Reset);//重置
//  $(".searching_btn .add_btn").attr("title", commonXml.Add);//新增
    // $.operationViedo(); 插入视频方法
    $.operationViedo();
    // 展开收起
    $("body").on("click", ".splitIcon", function () {
        var iClass = $("#splitIconId i").attr("class");
        if (iClass == "") {
            $(".hideSearchCondition").slideDown(500);
            $("#splitIconId i").addClass("active");
            $("#splitIconId").attr("title", "收起更多条件");
            $("#splitIconId span").text("收起更多条件");
        } else {
            $(".hideSearchCondition").slideUp(500);
            $("#splitIconId i").removeClass("active");
            $("#splitIconId").attr("title", "展开更多条件");
            $("#splitIconId span").text("展开更多条件");
        }
    });
    $("body").on("click", ".splitIconC", function () {
        var iClass = $("#splitIconMore i").attr("class");
        if (iClass == "") {
            $(".hideMore").slideDown(500);
            $("#splitIconMore i").addClass("active");
            $("#splitIconMore").attr("title", "(收起)");
            $("#splitIconMore span").text("(收起)");
        } else {
            $(".hideMore").slideUp(500);
            $("#splitIconMore i").removeClass("active");
            $("#splitIconMore").attr("title", "(展开)");
            $("#splitIconMore span").text("(展开)");
        }
    });
    //页面加载完成后执行
    $(window).load(function () {
        //easyui-combox的select框点击input框模拟点击小三角的下拉菜单展开事件
        $(".textbox-text").on("click", function () {
            $(this).prev().children().trigger("click");
        });
    });
});
//var dialogLg = 900, dialogMd =600 , dialogSm = 300;   //easyui-dialog 弹窗大小类型
; (function ($, window, document, undefined) {
    $.extend({
        ///////////////////////////////////////////////////////////////////////////////////     页面语言版本       //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //alert(getQueryString("lang"));
        //var langText = pageSrc.substring(pageLang + 1, pageLang + 3);
        pageLangFun: function (options) {
            var defaults = {

            };
            var settings = $.extend({}, defaults, options);
            var language = "" + $.getQueryString("lang") + ""; //获取url中“lang”之后的参数
            var lang = language.toUpperCase();
//          if (lang == "CH" || lang == "NULL") {
//              $("script[src*='Language/EN.js']").remove();
//              $("script[src*='jquery.min.js']").after('<script src="/assets/easyui/jquery.easyui.min.js"></script><script src="/assets/easyui/local/easyui-lang-zh_CN.js"></script><script src="/Language/CH.js"></script>');
//          } else {
//              $("script[src*='easyui-lang-zh_CN.js'],script[src*='/Language/CH.js']").remove();
//              $("script[src*='jquery.min.js']").after('<script src="/assets/easyui/jquery.easyui.min.js"></script><script src="Language/EN.js"></script>');
//          }
            //语言版本XML加载
            $.ajax({
                url: commonXMLPath,
                dataType: 'xml',
                async: false,
                success: function (data) {
                    commonXml = getXML(data);
                },
                complete: function () {

                }
            });
        },
        // 视频操作方法
        operationViedo: function () {
            if (location.href.toLocaleLowerCase().indexOf('index') == -1 && location.href.toLocaleLowerCase().indexOf('login') == -1 && location.pathname.toLocaleLowerCase().indexOf('localhost') == -1 && location.pathname.length > 1) {
                $.getScript("../js/ckplayer/ckplayer.js", function () {
                })
                $('body').append('<div class="cVideo" style="position:fixed;top:5px;right:15px;background-color: #F5F5F5;border:1px solid #ddd;z-index:1000;padding:5px 10px;cursor:pointer;height:37px"><span id="character" style="line-height: 24px; font-size: 15px; display: inline-block;height: 24px;vertical-align: top;font-weight: bold;width:0;overflow:hidden;">操作视频</span><img id="opreate" style="" src="/Scripts/ckplayer/video.png" class="imgVideo"/></div><div id="dl_video"><div id="videoPlay" style="text-align: center;"></div></div>');
            }
            $("body").on('mouseenter', '.cVideo', function () {
                if (!$("#character").is(':animated')) {
                    $("#character").animate({
                        width: '70px'
                    });
                }

            });
            $("body").on('mouseleave', '.cVideo', function () {
                if ($("#character").width() !== 0) {
                    $("#character").animate({
                        width: '0'
                    });
                }
            });
        },
        // 视频路径传递
        videoUrl: function (fileUrl, divId, videoWidth, videoHeight) {
            var flashvars = {
                f: fileUrl,
                c: 0,
                b: 1,
                //i:'http://www.ckplayer.com/static/images/cqdw.jpg'
            };
            var params = { bgcolor: '#FFF', allowFullScreen: true, allowScriptAccess: 'always', wmode: 'transparent' };
            CKobject.embedSWF('../Scripts/ckplayer/ckplayer.swf', divId, 'ckplayer_videoPlay', videoWidth, videoHeight, flashvars, params);
        },
        /** 
         * js截取字符串，中英文都能用 
         * @param str：需要截取的字符串 
         * @param len: 需要截取的长度 
         */
        cutstr: function (str, len) {
            var str_length = 0;
            var str_len = 0;
            str_cut = new String();
            str_len = str.length;
            for (var i = 0; i < str_len; i++) {
                a = str.charAt(i);
                str_length++;
                if (escape(a).length > 4) {
                    //中文字符的长度经编码之后大于4  
                    str_length++;
                }
                str_cut = str_cut.concat(a);
                if (str_length >= len) {
                    str_cut = str_cut.concat("...");
                    return str_cut;
                }
            }
            //如果给定字符串小于指定长度，则返回源字符串；  
            if (str_length < len) {
                return str;
            }
        },
        //////////////////////////////////////////////////////////////////////////////        iframe页面的链接跳转（生成新的选项卡）      /////////////////////////////////////////////////////////////////////////////////////////////////
        //由于是采用获取iframe标签里面的元素的树形来执行操作，所以需要后台取数据的时候，需要a标签完整的href(添加该链接到iframe的src属性)已经title(设置为选项卡标题)值
        addNewPage: function (options) {
            var defaults = {
                body: 'body',
                lang: '#lang',
                menu: "#menu",
                content: ".index_content",
                nav: ".index_content nav",
                navUl: ".index_content nav ul",
                contentCon: ".incontent_con",
            };
            var settings = $.extend({}, defaults, options);

            //当父级框架为权限系统时，执行同域设置
            /*
            cookie:
            key:systemOne   value:systemOther --权限系统框架
            key:systemOne   value:systemOne -管理系统系统框架
            */
            //console.log(JsCookies('systemOne'));
            if ($.JsCookies('systemOne') == "systemOther" || $.JsCookies('systemOne') == "" || $.JsCookies('systemOne') == undefined) {
                var hosthref = hostnameText();
                var hostnamehref = hostnameText(0);
                if (hostnamehref.indexOf("ymm.hk") > -1) {
                    document.domain = "ymm.hk";
                    //console.log(document.domain);
                } else {
                    document.domain = hostnameText(0); //设置同域
                }
            }
            //获取主机名 端口号

            function hostnameText(status) {
                var pageHref = window.location.hostname;//主机名
                var hosthref = window.location.host;//主机名+端口号
                if (status == 0) return pageHref;
                else return hosthref;
            }

            $(settings.body).on("click", ".table_icon[newpage]", function (e) {
                var self = $(this);
                var aText = self.attr("title");//////////////////设置Tab标签的标题
                var aHref = self.attr("ref");
                var lang = $(settings.lang, parent.document).attr("lang");
                //当父级框架为权限系统时，执行同域设置
                if ($.JsCookies('systemOne') == "systemOther" || $.JsCookies('systemOne') == "" || $.JsCookies('systemOne') == undefined) {
                    aHref = "http://" + hostnameText() + aHref;
                }
                var newHref;

                if (lang == "NULL" || lang == "" || lang == undefined || lang == null) {
                    newHref = aHref;
                } else {
                    // if (aHref.indexOf("?") > -1) newHref = aHref + "?lang=" + lang;
                    //else newHref = aHref + "#lang=" + lang;
                    if (aHref.indexOf("?") == -1) newHref = aHref + "?lang=" + lang;
                    else newHref = aHref + "&lang=" + lang;
                }
                var currentIframe = $("iframe.active", parent.document);
                var currentIframeIndex = currentIframe.index();
                var currentNav = currentIframe.parent().prev(); //查找选项卡nav元素
                var currentLi = currentNav.find("li").eq(currentIframeIndex); //查找选项卡nav元素
                var navUl = $(settings.navUl, parent.document);
                var contentCon = $(settings.contentCon, parent.document);
                var winHeight = $(window, parent.document).height(); //浏览器窗体高度
                var iframeHeight = winHeight; //iframe框架高度
                var newLi = '<li class="active"><h5>' + aText + '</h5><button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button></li>';
                var newAframe = '<iframe class="active" style="height:' + iframeHeight + 'px" src=' + newHref + ' scrolling="yes"></iframe>';
                var init = false, num = 0;
                for (var i = 0; i < currentIframe.parent().children("iframe").length; i++) {
                    var thisEle = currentIframe.parent().children("iframe").eq(i);
                    var thisEleSrc = thisEle.attr("src");
                    if (thisEleSrc === newHref) {
                        num = i;
                        init = true;
                    }
                }
                if (init === true) {
                    //$(navUl).find("li").eq(num).addClass("active").prependTo(navUl).siblings().removeClass("active");
                    //$(contentCon).find("iframe").eq(num).addClass("active").prependTo($(contentCon)).siblings().removeClass("active");  //如果已存在该页面，则添加类active显示该页面，同时把该页面添加到同级元素中的第一个，并把该元素的其他同辈元素移除类active
                    $(navUl).find("li").eq(num).addClass("active").siblings().removeClass("active");
                    $(contentCon).find("iframe").eq(num).addClass("active").siblings().removeClass("active");  //如果已存在该页面，则添加类active显示该页面，同时把该页面添加到同级元素中的第一个，并把该元素的其他同辈元素移除类active
                } else {
                    currentLi.removeClass("active").after(newLi); //生成选项卡子项
                    currentIframe.removeClass("active").after(newAframe); //生成新的iframe框架
                }
                //e.preventDefault();//阻止默认事件
                e.stopPropagation();//阻止事件冒泡
            });
        },
        ///////////////////////////////////////////////////////////////////////////////////     信息弹出窗       //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //更改的信息弹框的样式，需要在body上加上类名jretc_ui,不添加类名为默认的样式设置
        //（有确定|取消按钮）
        //title:弹窗标题;info：t弹窗的内容区域的内容信息;actionFun:弹窗确认按钮点击需要执行的函数
        ////（有确定|取消按钮）
        //    $.messager.confirm(alertTitle, alertInfo, function (r) {
        //        if (r) {
        //            // exit action;
        //            if (actionFun) eval(actionFun);
        //        }
        //    });

        ////（有确定|取消按钮）
        //    $.messager.confirm(alertTitle, alertInfo, function (r) {
        //        if (r) {
        //            alert(r);
        //            // exit action;
        //            if (actionFun) eval(actionFun);
        //            //return promptFunStatus;
        //        }
        //    });

        //status:有四个状态,error info question warning,需写其中的一个；（只有确定按钮）
        alertFun: function (title, info, status) {
            $("body").addClass("jretc_ui");
            var alertTitle, alertInfo, alertStatus;
            var options = {
                error: 0,
                info: 1,
                question: 2,
                warning: 3
            }

            title !== "" ? alertTitle = title : alertTitle = "提示";
            alertInfo = info;
            if (status in options) {
                alertStatus = status;
                //alert(options[status]);
                // console.log(options[status]);
            } else {
                alertStatus = "info";
            }
            $.messager.alert(alertTitle, alertInfo, alertStatus);
        },

        ///////////////////////////////////////////////////////////////////////////////////     时间格式转换js配置       //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //ChangeDateFormatToLocaleDate: function (jsondate) {
        //    try {
        //        jsondate = jsondate.replace("/Date(", "").replace(")/", "");
        //        if (jsondate.indexOf("+") > 0) {
        //            jsondate = jsondate.substring(0, jsondate.indexOf("+"));
        //        } else if (jsondate.indexOf("-") > 0) {
        //            jsondate = jsondate.substring(0, jsondate.indexOf("-"));
        //        }
        //        var date = new Date(parseInt(jsondate, 10));
        //        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        //        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        //        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        //        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        //        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        //        var temp = new Date(date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds);
        //        return temp.toLocaleDateString();
        //    } catch (e) {
        //        return "";
        //    }
        //},

        ///////////////////////////////////////////////////////////////////////////////////     Json日期格式转换       //////////////////////////////////////////////////////////////////////////////////////////////////////////
        getDateFormats: function (value, format) {
            if (value !== "" && value != null) {
                var pa = /.*\((.*)\)/;   //获取 /Date(时间戳) 括号中的字符串时间戳 的正则表达式
                var ts = value.match(pa)[1];
                //var ts = arguments[0] || 0;
                var t, y, m, d, h, i, s;
                t = ts ? new Date(parseInt(ts)) : new Date();
                y = t.getFullYear();
                m = t.getMonth() + 1;
                d = t.getDate();
                h = t.getHours();
                i = t.getMinutes();
                s = t.getSeconds();
                // 可根据需要在这里定义时间格式  
                if (format === "ymd") {     //年-月-日
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
                }
                if (format === "y/m/d") {     //年/月/日
                    return y + '/' + (m < 10 ? '0' + m : m) + '/' + (d < 10 ? '0' + d : d);
                }
                if (format === "ymdhm") {  //年-月-日 时:分
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i);
                }
                if (format === "ymdhms") { //年-月-日 时：分：秒
                    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i) + ':' + (s < 10 ? '0' + s : s);
                }
                if (format === "md") {     //月.日
                    return (m < 10 ? '0' + m : m) + '.' + (d < 10 ? '0' + d : d);
                }
            }
            return value;
        },

        ///////////////////////////////////////////////////////////////////////////////////     货币格式化：123456789 => ￥123,456,789.00       //////////////////////////////////////////////////////////////////////////////////////////////////////////
        formatMoney: function (number) {
            var places = 2;//小数点2位
            var symbol = "￥";
            var thousand = ",";
            var decimal = ".";
            var negative = number < 0 ? "-" : "",
                i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
        },

        ///////////////////////////////////////////////////////////////////////////////////     JSON日期字符串转JavaScript日期对象 //////////////////////////////////////////////////////////////////////////////////////////////////////////
        getJsonDateObj: function (jsonDateStr) {
            return jsonDateStr ? new Date(parseInt(jsonDateStr.substring(6))) : new Date();
        },

        ///////////////////////////////////////////////////////////////////////////////////     时间格式转换js配置 ,只要月和日      //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //jsonDateFormat: function (jsonDate) {
        //    try {
        //        var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
        //        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        //        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        //        return month + "-" + day;
        //    } catch (ex) {
        //        return "";
        //    }
        //},
        jsonDateFormat2: function (jsonDate) {
            try {
                var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                return month + "." + day;
            } catch (ex) {
                return "";
            }
        },
        ///////////////////////////////////////////////////////////////////////////////     根据传入时间和当前时间返回年龄   //////////////////////////////////////////////////////////////////////////////////////////////////////////
        getAgeByCurrentTime: function (jsondate) {
            var brithDay = $.ChangeDateFormatToLocaleDate(jsondate);
            var age = "";
            if (brithDay !== "") {
                try {
                    var brithYear = parseInt(brithDay.split("/")[0], 10);
                    var date = new Date();
                    age = date.getFullYear() - brithYear;
                    return age;
                } catch (e) {
                    return age;
                }
            }
            return age;
        },
        ///////////////////////////////////////////////////////////////////////////////     获取AddDayCount天后的日期    //////////////////////////////////////////////////////////////////////////////////////////////////////////
        getDateStr: function (AddDayCount) {
            if (AddDayCount == undefined)
                AddDayCount = 0;
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;//获取当前月份的日期 
            var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
            return y + "-" + m + "-" + d;
        },
        //获得本周的开始日期     
        getWeekStartDate: function () {
            var now = new Date();                    //当前日期     
            var nowDayOfWeek = now.getDay();         //今天本周的第几天     
            var nowDay = now.getDate();              //当前日     
            var nowMonth = now.getMonth();           //当前月     
            var nowYear = now.getFullYear();             //当前年   
            var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);

            var myyear = weekStartDate.getFullYear();
            var mymonth = weekStartDate.getMonth() + 1;
            var myweekday = weekStartDate.getDate();
            if (mymonth < 10) {
                mymonth = "0" + mymonth;
            }
            if (myweekday < 10) {
                myweekday = "0" + myweekday;
            }
            return (myyear + "-" + mymonth + "-" + myweekday);
        },
        //获得本月的开始日期     
        getMonthStartDate: function () {
            var now = new Date();                    //当前日期     
            var nowMonth = now.getMonth();           //当前月     
            var nowYear = now.getFullYear();             //当前年     
            var monthStartDate = new Date(nowYear, nowMonth, 1);
            var myyear = monthStartDate.getFullYear();
            var mymonth = monthStartDate.getMonth() + 1;
            var myweekday = monthStartDate.getDate();
            if (mymonth < 10) {
                mymonth = "0" + mymonth;
            }
            if (myweekday < 10) {
                myweekday = "0" + myweekday;
            }
            return (myyear + "-" + mymonth + "-" + myweekday);
        },
        //////////////////////////////////////////////////////////////////  iframe框架中编辑/修改/详情页面的保存/关闭btn操作js   //////////////////////////////////////////////////////////////////////////////////////////////////////
        btnCloseIframe: function () {
            var indexContent = $(".index_content", parent.document);
            var iframeActiveI = $(indexContent).find("iframe.active").index();
            var indexContentS = iframeActiveI - 1;
            var liLen = $(indexContent).find("li").length;
            //var lilenS = liLen - 2;
            //alert(iframeActiveI);
            $(indexContent).find("li.active").remove();
            $(indexContent).find("iframe.active").remove();
            if (iframeActiveI !== 0) {
                $(indexContent).find("li").eq(indexContentS).addClass("active");
                $(indexContent).find("iframe").eq(indexContentS).addClass("active");
            } else {
                $(indexContent).find("li").eq(indexContentS + 1).addClass("active");
                $(indexContent).find("iframe").eq(indexContentS + 1).addClass("active");
            }

            if (liLen == '1') {
                $(indexContent).find(".incontent_top_ul").hide();
                $(indexContent).addClass("active");
            } else {
                $(indexContent).find(".incontent_top_ul").show();
                $(indexContent).removeClass("active");
            }
        },

        //////////////////////////////////////////////////////////////////  回车执行搜索   //////////////////////////////////////////////////////////////////////////////////////////////////////
        /*conditionSearchFun:执行条件搜索的函数*/
        enterSearch: function (conditionSearchFun) {
            document.onkeydown = function (e) {
                var ev = document.all ? window.event : e;
                if (ev.keyCode === 13) {
                    if (conditionSearchFun != '' || conditionSearchFun == 'underfined') {
                        eval(conditionSearchFun);
                    } else {
                        //  alert("函数传入值为："+conditionSearchFun);
                    }
                }
            };
        },

        //////////////////////////////////////////////////////////////////  清空搜索条件   //////////////////////////////////////////////////////////////////////////////////////////////////////
        clearConditionFun: function (conditionSearchFun) {
            //清空input，select
            $(commonVar.conditionBox).find("input select").val("");
            //清空select2
            if ($(commonVar.body).find(".select2").length > 0)
                $(commonVar.conditionBox).find("select").select2().val("");
            $(commonVar.viewList).find("li").removeClass("active");    //移除视图列表的激活状态
            if (conditionSearchFun != '' || conditionSearchFun == 'underfined') {
                eval(conditionSearchFun);
            } else {
                alert("函数传入值为：" + conditionSearchFun);
            }
        },

        ////////////////////////////////////页面按钮-权限控制是否可用//////////////////////////////////////////////////////
        // ReSharper disable once DuplicatingPropertyDeclaration
        menuFunction: function () {
            var host = window.location.host;
            if (host.indexOf("localhost") >= 0)
                return;

            var src = window.location.href; //获取当前页面路径
            var str = "" + $.getQueryString("jc", src) + "";//双引号把获取的src转为字符串
            if (str !== "") {
                //匹配没有存在的按钮字符就去掉该按钮的点击事件或链接事件
                str = "," + str + ",";
                //console.log($("a[jc]").length);
                $("a[jc],input[jc],button[jc]").each(function () {
                    //console.log(str+'222');
                    var self = $(this);
                    var jcVarible = self.attr("jc");
                    //alert(jcVarible);
                    jcVarible = hex_md5(jcVarible);
                    // alert(jcVarible);
                    // console.log(jcVarible + "=======" + str + "------" + src);
                    // alert(str.indexOf("," + jcVarible + ","));
                    if (str.indexOf("," + jcVarible + ",") < 0) {
                        self.attr("disabled", "disabled").removeAttr("onclick newpage href").off("click");
                        //$.gray(self.attr("class"));//灰色操作按钮绘制
                    }
                });
            } else { //返回空字符串或出现系统错误则把页面功能都禁用
                $("a[jc],input[jc],button[jc]").each(function () {
                    $(this).attr("disabled", "disabled").removeAttr("onclick newpage href").off("click");
                });
            }
        },
        //////////////////////////////////////////////////////////////////  cavans绘制灰色图片  //////////////////////////////////////////////////////////////////////////////////////////////////////

        //cavan绘制表格中的操作按钮灰色图片
        gray: function (className) {
            var imgObjEles = document.getElementsByClassName(className);
            for (var j = 0; j < imgObjEles.length; j++) {
                var imgObj;
                //alert(imgObjEles[i].getElementsByTagName("img")[0].length);
                if (imgObjEles[j].getElementsByTagName("img")[0]) {
                    imgObj = imgObjEles[j].getElementsByTagName("img")[0];
                }
                var canvas = document.createElement('canvas');
                var canvasContext = canvas.getContext('2d');
                var imgW = imgObj.width;
                var imgH = imgObj.height;
                canvas.width = imgW;
                canvas.height = imgH;
                canvasContext.drawImage(imgObj, 0, 0, 22, 22);
                var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);
                for (var y = 0; y < imgPixels.height; y++) {
                    for (var x = 0; x < imgPixels.width; x++) {
                        var i = (y * 4) * imgPixels.width + x * 4;
                        var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                        imgPixels.data[i] = avg;
                        imgPixels.data[i + 1] = avg;
                        imgPixels.data[i + 2] = avg;
                    }
                }
                canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
                imgObj.src = canvas.toDataURL();
            }
            //return canvas.toDataURL();
        },

        //////////////////////////////////////////////////////////////////  easyui验证插件规则定义   //////////////////////////////////////////////////////////////////////////////////////////////////////
        //验证规则定义
        //html行内使用方式：data-options="required:true,validType:['english','minLength[5]']"
        //js使用方式
        /*
        $(this).validatebox({
            required: true,
            validType: {
                minLength:[5],
                english:true
            }
         });
        */
        //easyuiValRule: function () {
        //    $.extend($.fn.validatebox.defaults.rules, {
        //        //验证两次输入的字符是否一致equalTo[目标id]
        //        equalTo: {
        //            validator: function (value, param) {
        //                return value === $(param[0]).val();
        //            },
        //            message: '两次输入的字符不一至'
        //        },
        //        //最小长度限制
        //        minLength: {
        //            validator: function (value, param) {
        //                return value.length >= param[0];
        //            }
        //            //message: validatorMessageXml.MinLength//验证的提示信息
        //        },
        //        //最大长度限制
        //        maxLength: {
        //            validator: function (value, param) {
        //                return value.length <= param[0];
        //            },
        //            message: '最多{0}个字'
        //        },
        //        maxShuzi: {
        //            validator: function (value, param) {
        //                return value.length <= 2;
        //            },
        //            message: '最多2个数字'
        //        },
        //        //中文限制
        //        CHS: {
        //            validator: function (value, param) {
        //                return /[\u4E00-\u9FA5]/g.test(value);
        //            },
        //            message: '请输入汉字'
        //        },
        //        //英文限制
        //        english: {// 验证英语
        //            validator: function (value) {
        //                alert(value);
        //                return /^[A-Za-z]+$/i.test(value);
        //            },
        //            message: '请输入英文'
        //        },
        //        //数字验证
        //        number: {
        //            validator: function (value, param) {
        //                return /^[0-9]+.?[0-9]*$/.test(value);
        //            },
        //            message: '请输入数字'
        //        },
        //        //IP地址格式验证
        //        ip: {// 验证IP地址
        //            validator: function (value) {
        //                return /\d+\.\d+\.\d+\.\d+/.test(value);
        //            },
        //            message: 'IP地址格式不正确'
        //        },
        //        //mac地址验证
        //        checkMac: {
        //            validator: function (value, param) {
        //                return /[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}/.test(value);
        //            },
        //            message: '请输入正确的mac地址'
        //        },
        //        //身份证号码
        //        idCode: {
        //            validator: function (value, param) {
        //                return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
        //            },
        //            message: '请输入正确的身份证号'
        //        },
        //        //邮政编码
        //        ZIP: {
        //            validator: function (value, param) {
        //                return /^[0-9]\d{5}$/.test(value);
        //            },
        //            message: '邮政编码不存在'
        //        },
        //        //QQ
        //        QQ: {
        //            validator: function (value, param) {
        //                return /^[1-9]\d{4,10}$/.test(value);
        //            },
        //            message: 'QQ号码不正确'
        //        },
        //        //手机号码
        //        mobile: {
        //            validator: function (value) {
        //                return /^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/.test(value);
        //            },
        //            message: '手机号码不正确'
        //        },
        //        //电话号码
        //        tel: {
        //            validator: function (value, param) {
        //                return /^(\d{3}-|\d{4}-)?(\d{8}|\d{7})?(-\d{1,6})?$/.test(value);
        //            },
        //            message: '电话号码不正确'
        //        },
        //        plplpl: {
        //            validator: function (value, param) {
        //                return /^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/.test(value);
        //                //return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
        //            },message:"88888888888888888"},
        //        //电话号码
        //        mobileAndTel: {
        //            validator: function (value, param) {
        //                return /(^([0\+]\d{2,3})\d{3,4}\-\d{3,8}$)|(^([0\+]\d{2,3})\d{3,4}\d{3,8}$)|(^([0\+]\d{2,3}){0,1}13\d{9}$)|(^\d{3,4}\d{3,8}$)|(^\d{3,4}\-\d{3,8}$)/.test(value);
        //            },
        //            message: '请正确输入电话号码'
        //        }


        //    });
        //},
        //////////////////////////////////////////////////////////////////  鼠标移入移出元素的方向判断   //////////////////////////////////////////////////////////////////////////////////////////////////////
        //handleId：为目标元素的id/class/标签;例："#id",".class","div"
        mouseDerection: function (handleId) {
            $(handleId).bind("mouseenter mouseleave", function (e) {
                var w = $(this).width();
                var h = $(this).height();
                var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
                var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
                var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
                var eventType = e.type;
                var dirName = new Array('上方', '右侧', '下方', '左侧');
                if (eventType == 'mouseenter') {
                    $(this).html(dirName[direction] + '进入');
                } else {
                    $(this).html(dirName[direction] + '离开');
                }
            });
            switch (direction) {
                case 0:
                    $(this).html('上方进入');
                    break;
                case 1:
                    $(this).html('右侧进入');
                    break;
                case 2:
                    $(this).html('下方进入');
                    break;
                case 3:
                    $(this).html('左侧进入');
                    break;
            }
        },

        ///////////////////////////////////////////////////////////////////////////////////     截取页面链接url参数       //////////////////////////////////////////////////////////////////////////////////////////////////////////
        getQueryString: function (name, url) {
            var newName = name.toLowerCase();//转换传入字符串的字母转化为小写字母
            //var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var reg = new RegExp("(" + newName + ")=([^&]*)(&|$)", "i");
            var r;
            if (url) {
                r = url.match(reg);
            } else {
                r = window.location.search.substr(1).match(reg);
            }
            //r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },

        ///////////////////////////////////////////////////////////////////////////////////     截取url参数       //////////////////////////////////////////////////////////////////////////////////////////////////////////
        /*截取url参数*/
        //取获参数值
        getQueStr: function (url, ref) {
            var str = url.substr(url.indexOf('?') + 1);
            if (str.indexOf('&') != -1) {
                var arr = str.split('&');
                for (i in arr) {
                    if (arr[i].split('=')[0] == ref) return arr[i].split('=')[1];
                }
            }
            else {
                if (url.indexOf('=') != "-1") {
                    return url.substr(url.indexOf('=') + 1); //url中无=时，返回的字符串是整个url地址（截取失败）
                } else {
                    return null;
                }
            }
        },

        ///////////////////////////////////////////////////////////////////////////////////     easyui-datagrid宽度自适应       //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //easyui-datagrid targetEle为easyui-table的父级元素；datagridId:为easyui-table的ID或者类名;option传入的id/class，需要带"#"、".";例："#id,.class"
        easyTableFull: function (datagridId) {
            var defaultEle = datagridId.split(",");
            //var width = $(targetEle).width();
            //alert(targetEle + " " + defaultEle[1]);
            //easyui表格自适应浏览器宽度（同时进行初始化设置）
            for (var i = 0; i < defaultEle.length; i++) {
                $("" + defaultEle[i] + "").datagrid({
                    //width: width
                });
            };
        },

        ///////////////////////////////////////////////////////////////////////////////////     easyui-datagrid编辑/删除/保存功能函数加载       //////////////////////////////////////////////////////////////////////////////////////////////////////////
        datagridOperate: function (datagridId) {
            //editCell列编辑初始化
            editCell = function () {
                $.extend($.fn.datagrid.methods, {
                    editCell: function (jq, param) {
                        return jq.each(function () {
                            var opts = $(this).datagrid('options');
                            var fields = $(this).datagrid('getColumnFields', true).concat($(this).datagrid('getColumnFields'));
                            for (var i = 0; i < fields.length; i++) {
                                var col = $(this).datagrid('getColumnOption', fields[i]);
                                col.editor1 = col.editor;
                                if (fields[i] != param.field) {
                                    col.editor = null;
                                }
                            }
                            $(this).datagrid('beginEdit', param.index);
                            for (var i = 0; i < fields.length; i++) {
                                var col = $(this).datagrid('getColumnOption', fields[i]);
                                col.editor = col.editor1;
                            }
                        });
                    }
                });
            }

            //行编辑
            editRow = function (obj) {
                var index = $(obj).closest(".datagrid-row").index();
                $(datagridId).datagrid('beginEdit', index);
            }
            //编辑结束
            endEditing = function () {
                if (editIndex == undefined) { return true }
                if ($(datagridId).datagrid('validateRow', editIndex)) {
                    $(datagridId).datagrid('endEdit', editIndex);
                    editIndex = undefined;
                    return true;
                } else {
                    return false;
                }
            }
            //编辑结束的回调函数
            onClickCell = function (index, field) {
                if (endEditing()) {
                    $(datagridId).datagrid('selectRow', index)
                            .datagrid('editCell', { index: index, field: field });
                    editIndex = index;
                }
            }
            //保存行编辑数据
            saveRow = function (obj) {
                var index = $(obj).closest(".datagrid-row").index();
                $(datagridId).datagrid('endEdit', index);
            }
            //取消行编辑状态
            cancelRow = function (obj) {
                var index = $(obj).closest(".datagrid-row").index();
                $(datagridId).datagrid('cancelEdit', index);
            }

            //obj:调用该方法的时候传入this,delRow(this)
            delRow = function (obj) {  //删除操作  
                var index = $(obj).closest(".datagrid-row").index();
                $.messager.confirm('确认', '确认删除?', function (r) {
                    if (r) {
                        $(datagridId).datagrid('deleteRow', index);
                    }
                });
            }
        },
        /////////////////////////////////////////////////////////////     datebox 选择日期跟当前日期判断是否选择最大/最小日期      //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //datebox 选择日期跟当前日期判断是否选择最大/最小日期
        dateboxValidateFun: function (date, status, dateboxEle) {
            var currentDate = new Date();
            var newDateString = '' + currentDate.getFullYear() + '' + $.fulldate(currentDate.getMonth() + 1) + '' + $.fulldate(currentDate.getDate()) + '';
            var selectDateString = '' + date.getFullYear() + '' + $.fulldate(date.getMonth() + 1) + '' + $.fulldate(date.getDate()) + '';
            if (selectDateString < newDateString && status == 'max') {
                $.alertFun('提示', '请选择大于当前日期的时间', 'info'); //传入的日期小于当前日期，同时传入限制最大值的参数"max"时，弹窗提示
                $(dateboxEle).datebox('setValue', '');//easyui-datebox设置当前值为空
            } else if (selectDateString > newDateString && status == 'min') {
                $.alertFun('提示', '请选择小于当前日期的时间', 'info'); //传入的日期大于当前日期时，同时传入限制最大值的参数"min"时，弹窗提示
                $(dateboxEle).datebox('setValue', '');//easyui-datebox设置当前值为空
            }
        },

        /////////////////////////////////////////////////////////////     easyui-dialog 初始化    //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //dialogId--初始化的id;
        //dataUrl--需要传入的href地址;
        //title--dialog窗口的标题;
        //dialogType--dialog的类型，分为3种宽度：dialogSm:300px,dialogMd:600px,dialogLg:900px;
        dialogFun: function (dialogId, dataUrl, title, dialogWidth, dialogHeight) {
            var defaultWidth = {
                dialogLg: 900,
                dialogMd: 600,
                dialogSm: 300
            };
            var newDialogWidth, newDialogHeight;
            if (dialogWidth in defaultWidth) {
                newDialogWidth = defaultWidth[dialogWidth];
            } else {
                newDialogWidth = 600;
            }
            if (dialogHeight) {
                newDialogHeight = dialogHeight;
            } else {
                newDialogHeight = "";
            };
            $(dialogId).dialog({
                href: dataUrl,
                title: title,
                width: newDialogWidth,
                height: newDialogHeight,
                closed: true,
                cache: false,
                modal: true
            });
        },
        ///////////////////////////////////////////////////////////////////////////////////     判断日期的月/天       //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //判断日期的月/天的个位数时，添加上前缀--‘0’，例：20160507;obj为传入的日期参数
        fulldate: function (obj) {
            if (Number(obj) < 10) {
                return '0' + obj;
            } else {
                return obj;
            }
        },
        ///////////////////////////////////////////////////////////////////////////////////     将星期阿拉伯数字转换大写       //////////////////////////////////////////////////////////////////////////////////////////////////////////
        getCHweek: function (obj) {
            var week = "";
            switch (obj) {
                case "0":
                    week = "日";
                    break;
                case "1":
                    week = "一";
                    break;
                case "2":
                    week = "二";
                    break;
                case "3":
                    week = "三";
                    break;
                case "4":
                    week = "四";
                    break;
                case "5":
                    week = "五";
                    break;
                case "6":
                    week = "六";
                    break;
                default:
                    week = "";
                    break;
            }
            return week;
        },
        ///////////////////////////////////////////////////////////////////////////////////     将0.00或0转换为空       //////////////////////////////////////////////////////////////////////////////////////////////////////////
        coverEmpty: function (obj) {
            if (obj === "0.00" || obj === "0") {
                return "-";
            }
            return obj;
        },

        ///////////////////////////////////////////////////////////////////////////////////     DataGrid表格方法       //////////////////////////////////////////////////////////////////////////////////////////////////////////
        //清除DataGrid表格数据
        clearDataGrid: function (gridName) {
            //获取当前页的记录数  
            var item = $("#" + gridName + "").datagrid("getRows");
            for (var i = item.length - 1; i >= 0; i--) {
                var index = $("#" + gridName + "").datagrid("getRowIndex", item[i]);
                $("#" + gridName + "").datagrid('deleteRow', index);
            }
        },
        //指定列求合计
        compute: function (gridName, colName) {
            var rows = $("#" + gridName + "").datagrid("getRows");
            var total = 0;
            for (var i = 0; i < rows.length; i++) {
                total += parseFloat(rows[i][colName]);
            }
            return total;
        },
        //////////////////////////////////////////////////////////生成guid wgw/////////////////////////////////////////////////////
        newGuid: function () {
            var guid = "";
            for (var i = 1; i <= 32; i++) {
                var n = Math.floor(Math.random() * 16.0).toString(16);
                guid += n;
                if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                    guid += "-";
            }
            return guid;
        },
        /**
          * 获取本周、本季度、本月、上月的开始日期、结束日期
          */
        //获得某月的天数
        getMonthDays: function (myMonth) {
            var monthStartDate = new Date(nowYear, myMonth, 1);
            var monthEndDate = new Date(nowYear, myMonth + 1, 1);
            var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        },
        //获得本季度的开始月份
        getQuarterStartMonth: function () {
            var quarterStartMonth = 0;
            if (nowMonth < 3) {
                quarterStartMonth = 0;
            }
            if (2 < nowMonth && nowMonth < 6) {
                quarterStartMonth = 3;
            }
            if (5 < nowMonth && nowMonth < 9) {
                quarterStartMonth = 6;
            }
            if (nowMonth > 8) {
                quarterStartMonth = 9;
            }
            return quarterStartMonth;
        },
        //获得本周的开始日期
        getWeekStartDate: function () {
            var weekStartDate = new Date(nowYear, nowMonth, nowDay - (nowDayOfWeek - 1));
            return formatDate(weekStartDate);
        },
        //获得本周的结束日期
        getWeekEndDate: function () {
            var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
            return formatDate(weekEndDate);
        },
        //获得上周的开始日期
        getLastWeekStartDate: function () {
            var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6);
            return formatDate(weekStartDate);
        },
        //获得上周的结束日期
        getLastWeekEndDate: function () {
            var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
            return formatDate(weekEndDate);
        },
        //获得本月的开始日期
        getMonthStartDate: function () {
            var monthStartDate = new Date(nowYear, nowMonth, 1);
            return formatDate(monthStartDate);
        },
        //获得本月的结束日期
        getMonthEndDate: function () {
            var monthEndDate = new Date(nowYear, nowMonth, $.getMonthDays(nowMonth));
            return formatDate(monthEndDate);
        },
        //获得上月开始时间
        getLastMonthStartDate: function () {
            if (lastMonth > nowMonth) {
                var lastMonthStartDate1 = new Date(nowYear - 1, lastMonth, 1);
                return formatDate(lastMonthStartDate1);
            } else {
                var lastMonthStartDate2 = new Date(nowYear, lastMonth, 1);
                return formatDate(lastMonthStartDate2);
            }

        },
        //获得上月结束时间
        getLastMonthEndDate: function () {
            if (lastMonth > nowMonth) {
                var lastMonthEndDate1 = new Date(nowYear - 1, lastMonth, $.getMonthDays(lastMonth));
                return formatDate(lastMonthEndDate1);
            } else {
                var lastMonthEndDate2 = new Date(nowYear, lastMonth, $.getMonthDays(lastMonth));
                return formatDate(lastMonthEndDate2);
            }
        },
        //获得本季度的开始日期
        getQuarterStartDate: function () {
            var quarterStartDate = new Date(nowYear, $.getQuarterStartMonth(), 1);
            return formatDate(quarterStartDate);
        },
        //或的本季度的结束日期
        getQuarterEndDate: function () {
            var quarterEndMonth = getQuarterStartMonth() + 2;
            var quarterStartDate = new Date(nowYear, quarterEndMonth,
                    getMonthDays(quarterEndMonth));
            return formatDate(quarterStartDate);
        },
        //获得本年的开始日期
        getYearStartDate: function () {
            var yearStartDate = new Date(nowYear, 0, $.getMonthDays(0));
            return formatDate(yearStartDate);
        },//获得本年的结束日期
        getYearEndDate: function () {
            var yearEndDate = new Date(nowYear, 11, $.getMonthDays(11));
            return formatDate(yearEndDate);
        },
        /**
         * 获取本周、本季度、本月、上月的开始日期、结束日期结束
         */
        //////////////////////////////////////////////////////////图片预览 wgw/////////////////////////////////////////////////////
        previewImage: function (fileObj, imgPreviewId, divPreviewId) {
            var allowExtention = ".jpg,.bmp,.gif,.png"; //允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;  
            var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
            var browserVersion = window.navigator.userAgent.toUpperCase();
            if (allowExtention.indexOf(extention) > -1) {
                document.getElementById(divPreviewId).style.display = "";
                if (fileObj.files) { //HTML5实现预览，兼容chrome、火狐7+等  
                    if (window.FileReader) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            document.getElementById(imgPreviewId).setAttribute("src", e.target.result);
                        }
                        reader.readAsDataURL(fileObj.files[0]);
                    } else if (browserVersion.indexOf("SAFARI") > -1) {
                        alert("不支持Safari6.0以下浏览器的图片预览!");
                    }
                } else if (browserVersion.indexOf("MSIE") > -1) {
                    if (browserVersion.indexOf("MSIE 6") > -1) { //ie6  
                        document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
                    } else { //ie[7-9]  
                        fileObj.select();
                        if (browserVersion.indexOf("MSIE 9") > -1)
                            fileObj.blur(); //不加上document.selection.createRange().text在ie9会拒绝访问  
                        var newPreview = document.getElementById(divPreviewId + "New");
                        if (newPreview == null) {
                            newPreview = document.createElement("div");
                            newPreview.setAttribute("id", divPreviewId + "New");
                            newPreview.style.width = document.getElementById(imgPreviewId).width + "px";
                            newPreview.style.height = document.getElementById(imgPreviewId).height + "px";
                            newPreview.style.border = "solid 1px #d2e2e2";
                        }
                        newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
                        var tempDivPreview = document.getElementById(divPreviewId);
                        tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
                        tempDivPreview.style.display = "none";
                    }
                } else if (browserVersion.indexOf("FIREFOX") > -1) { //firefox  
                    var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
                    if (firefoxVersion < 7) { //firefox7以下版本  
                        document.getElementById(imgPreviewId).setAttribute("src", fileObj.files[0].getAsDataURL());
                    } else { //firefox7.0+                      
                        document.getElementById(imgPreviewId).setAttribute("src", window.URL.createObjectURL(fileObj.files[0]));
                    }
                } else {
                    document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
                }
            } else {
                alert("仅支持" + allowExtention + "为后缀名的文件!");
                fileObj.value = ""; //清空选中文件  
                if (browserVersion.indexOf("MSIE") > -1) {
                    fileObj.select();
                    document.selection.clear();
                }
                fileObj.outerHTML = fileObj.outerHTML;
            }
        },
        //Cookies
        JsCookies: function (ckName, ckValue, ckDate) {
            if (!ckName && !ckValue && !ckDate) {
                return false;
            }
                //写入cookies
            else if (ckName && ckValue) {
                //设置过期时间
                var day = new Date();
                var expDay = new Date();
                if (!ckDate || ckDate == 'undefined')
                    ckDate = 0;
                expDay.setTime = day.getTime() * 3600000 * 24 * ckDate;
                try {
                    document.cookie = escape($.trim(ckName)) + '=' + escape(ckValue) + ';expiress' + expDay.toGMTString();
                } catch (ee) {
                    return false;
                }
                return true;
            }
                //读取Cookie
            else if (ckName && !ckValue) {
                ckName = escape(ckName);
                var cookieList = document.cookie.split(';');
                for (var j = 0; j < cookieList.length; j++) {
                    var s = $.trim(cookieList[j].split('=')[0]);
                    if ($.trim(ckName) == $.trim(cookieList[j].split('=')[0])) {
                        return (cookieList[j].split('=')[1]);
                    }
                }
                return '';
            }
        },

        //提交之后验证表单元素的方法
        formInputVal: function (formId) {
            var $input = $(formId).find(":input").not('button');
            for (var i = 0; i < $input.length; i++) {
                if ($($input[i]).hasClass('easyui-validatebox') && $($input[i]).val() == null || $($input[i]).hasClass('easyui-validatebox') && $($input[i]).val() == "") {
                    $($input[i]).validatebox({
                        required: true,
                    });
                    return false;
                }
            }
        }


    });
})(jQuery, window, document);
