
//////////////////////////////////////////////////////////////////////////////////      首页index----即时时间显示js事件       /////////////////////////////////////////////////////////////////////////////////////////////////
function get_time()
{
var date=new Date();
var year="",month="",day="",week="",hour="",minute="",second="";
year=date.getFullYear();
month=add_zero(date.getMonth()+1);
day=add_zero(date.getDate());
week=date.getDay();
switch (date.getDay()) {
case 0:val="星期日";break
case 1:val="星期一";break
case 2:val="星期二";break
case 3:val="星期三";break
case 4:val="星期四";break
case 5:val="星期五";break
case 6:val="星期六";break
}
hour=add_zero(date.getHours());
minute=add_zero(date.getMinutes());
second=add_zero(date.getSeconds());
document.getElementById("timetable").innerHTML = " " + val + "　" + year + "年" + month + "月" + day + "日" + "　" + hour + ":" + minute + ":" + second + "";
}
function add_zero(temp)
{
if(temp<10) return "0"+temp;
else return temp;
}
setInterval("get_time()", 1000);

//////////////////////////////////////////////////////////////////////////////////      首页index----显示上下午js事件       /////////////////////////////////////////////////////////////////////////////////////////////////

function getDiv() {
    var _div = document.getElementsByTagName('div');
    for (var i in _div) {
        if (_div[i].className == 'time') {
            return _div[i];
        }
    }
};
function getText() {
    var _date = new Date();
    var _time = _date.getHours();
    var _text = '';
    if (_time >= 6 && _time < 9)
        _text = '早上好';
    else if (_time >= 9 && _time < 11)
        _text = '上午好';
    else if (_time >= 11 && _time < 13)
        _text = '中午好'
    else if (_time >= 13 && _time < 17)
        _text = '下午好';
    else
        _text = '晚上好';
    return _text;
};