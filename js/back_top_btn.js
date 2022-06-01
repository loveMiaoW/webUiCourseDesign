 // 当网页向下滑动 20px 出现"返回顶部" 按钮
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    console.log(121);
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
            document.getElementById("myBtn").style.display = "none";
        }
    }

// 点击按钮，返回顶部
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function checkinfo(){
    window.alert("图一：计科2005卢海洋");
    window.alert("图二：计科2005刘艳祥");
    window.alert("图五：计科2005豆昊航");
}