//找到id为clockCanvas的画布
var c = document.getElementById("clockCanvas");
//创建2d的context对象
var ctx = c.getContext("2d");
//开始绘图
function drawClock(){
    //保存画布初始状态
    ctx.save();
    //清空画布
    ctx.clearRect(0,0,300,300);
    //设置画笔样式与位置
    //设置画布中心为参照点
    ctx.translate(150,150);
    //以画布中心为参照点逆时针旋转90度
    ctx.rotate(-Math.PI/2);
    //设置画笔线条的末端为圆形
    ctx.lineCap="round";
    //设置画笔线条为6像素
    ctx.lineWidth=6;
    //画12个小时的刻度
    //循环十二次，每一次绘制一条刻度
    for (var i=0;i<12;i++){undefined
        ctx.beginPath();
        //每次顺时针旋转60度
        ctx.rotate(Math.PI/6);
        //绘制线段的路径
        ctx.moveTo(100,0);
        ctx.lineTo(120,0);
        //描边路径
        ctx.stroke();
        }
        //画60分钟对应的刻度
        ctx.lineWidth=5;
        for (i=0;i<60;i++){undefined
            ctx.beginPath();
            ctx.moveTo(118,0);
            ctx.lineTo(120,0);
            ctx.stroke();
            ctx.rotate(Math.PI/30);
            }
            //获取当前时间
            var now = new Date();
            var s = now.getSeconds();
            var m = now.getMinutes();
            var h = now.getHours();
            //将小时设置成12小时制的数值
            if (h>12)
            h-=12;
            //绘制时针
            //保存当前状态
            ctx.save();
            //旋转角度
            ctx.rotate(h*(Math.PI/6)+(Math.PI/360)*m+(Math.PI/21600)*s);
            //设置时间样式
            ctx.lineWidth=12;
            //开始绘制时针路径
            ctx.beginPath();
            ctx.moveTo(-20,0);
            ctx.lineTo(80,0);
            ctx.stroke();
            ctx.restore();
            
            //绘制分针，保存当前状态
            ctx.save();
            //旋转角度
            ctx.rotate((Math.PI/30)*m+(Math.PI/1800)*s);
            //设置分针样式
            ctx.lineWidth=8;
            //设置分针路径
            ctx.beginPath();
            ctx.moveTo(-20,0);
            ctx.lineTo(112,0);
            //描边路径
            ctx.stroke();
            //恢复之前路径
            ctx.restore();
            
            //绘制秒针，保存当前状
            ctx.save();
            //设置秒针路径
            ctx.rotate(s*Math.PI/30);
            ctx.strokeStyle="red";
            //6像素
            ctx.lineWidth=6;
            ctx.beginPath();
            ctx.moveTo(-30,0);
            ctx.lineTo(120,0);
            ctx.stroke();
            ctx.fillStyle="red";
            //绘制中心的原点
            ctx.beginPath();
            ctx.arc(0,0,10,0,Math.PI*2,true);
            //填充原点为红色
            ctx.fill();
            //恢复之前状态
            ctx.restore();
            
            //绘制表盘
            //设置样式
            ctx.lineWidth=12;
            ctx.strokeStyle="gray";
            //开始绘制表盘路径
            ctx.beginPath();
            ctx.arc(0,0,140,0,Math.PI*2,true);
            //描边路径
            ctx.stroke();
            //恢复原有状态
            ctx.restore();
            }
            setInterval("drawClock()",1000);