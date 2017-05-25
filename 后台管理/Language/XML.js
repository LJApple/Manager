var objTabAll = new Object();
getXML = function (data, tagName) {//data = 获取得到XML的数据， tagName = data中指定父节点名字
    objTabAll = new Object();
    if (tagName) {
        var arryTagName = tagName.split(',');
        for (var i = 0 ; i < arryTagName.length ; i++) {
            getAllTab(data, arryTagName[i]);
        }
    } else {
        getAllTab(data);
    }
    return objTabAll;
}

getAllTab = function (data, tabName) {//data=xml数据， tabName=父节点tab 递归循环
    var tagName;//标签名
    var textContent;//标签内容
    var nodeCount = 0;
    var i;
    if (!tabName) {//如果有限定父节点下寻找
        nodeCount = $(data).children().length;
        if (nodeCount > 0) {
            data = $(data).children();
            for (i = 0; i < nodeCount; i++) {
                tagName = $(data)[i].tagName;
                getAllTab($(data)[i]);
            }
        } else {
            tagName = $(data)[0].tagName;
            textContent = $(data)[0].textContent;
            objTabAll[tagName] = textContent;
            $("body *[word=" + tagName + "],#" + tagName + "").text(textContent);
        }
    } else {//限定父节点查找
        nodeCount = $(data).find(tabName).children().length;
        if (nodeCount > 0) {
            data = $(data).find(tabName).children();
            for (i = 0; i < nodeCount; i++) {
                tagName = $(data)[i].tagName;
                getAllTab($(data)[i]);
            }
        } else {
            tagName = $(data)[0].tagName;
            textContent = $(data)[0].textContent;
            objTabAll[tagName] = textContent;
            $("body *[word=" + tagName + "],#" + tagName + ",." + tagName + "").text(textContent);
        }
    }
}


/**
 * 设置当前页面语言信息（设置显示中文/英文）
 * 该方法只用于设置固定数据，从数据库读取出来的数据不予处理
 * 调用该方法，首先确认需要设置语言信息的控件（div/input/label等等）含有“for”标签。如：<div for="Search"></div>，其中，Search对应语言版本xml文件
 * 中的某个键。
 * @param {} data ：语言版本数据。从getXML中获取。
 * @returns {} 
 */
setLanguage = function (data) {
    if (data) {
        $.each(data, function (key, val) {
            $("body").find("*").each(function () {
                var forData = $(this).attr("word");
                if (forData && forData === key) {
                    var thisType = $(this).attr("type");
                    if (thisType && thisType === "text") {
                        $(this).val(val);
                    } else {
                        $(this).html(val);
                    }
                }
            });
        });
    }
}