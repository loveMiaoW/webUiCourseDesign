//获取画布对象
            var c = document.getElementById('myCanvas');
			//获取2D的context对象
            var ctx = c.getContext('2d');
 
            //声明拼图的图片素材来源
			var img = new Image();
            img.src = "../src/pintu.jpg";
			//当图片加载完毕时
            img.onload = function() {
				//打乱拼图的位置
                generateNum();
				//在画布上绘制拼图
                drawCanvas();
            }		
			
			//定义初始方块位置
            var num = [[00, 01, 02], [10, 11, 12], [20, 21, 22]];
			
			//打乱拼图的位置
			function generateNum() {
				//循环50次进行拼图打乱
                for (var i = 0; i < 50; i++) {
					//随机抽取其中一个数据
                    var i1 = Math.round(Math.random() * 2);
                    var j1 = Math.round(Math.random() * 2);
					//再随机抽取其中一个数据
                    var i2 = Math.round(Math.random() * 2);
                    var j2 = Math.round(Math.random() * 2);
					//对调它们的位置
                    var temp = num[i1][j1];
                    num[i1][j1] = num[i2][j2];
                    num[i2][j2] = temp;
                }
            }
			
			//定义拼图小方块的边长
			var w = 100;
            //绘制拼图
            function drawCanvas() {
                //清空画布
                ctx.clearRect(0, 0, 300, 300);
                //使用双重for循环绘制3x3的拼图
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        if (num[i][j] != 22) {
							//获取数值的十位数，即第几行
                            var row = parseInt(num[i][j] / 10);
							//获取数组的个位数，即第几列
                            var col = num[i][j] % 10;
							//在画布的相关位置上绘图
                            ctx.drawImage(img, col * w, row * w, w, w, j * w, i * w, w, w);
                        }
                    }
                }
            }

            //监听鼠标事件
            c.onmousedown = function(e) {
                //获取画布边界
                var bound = c.getBoundingClientRect();

                var x = e.pageX - bound.left;
                var y = e.pageY - bound.top;

                var row = parseInt(y / 100);
                var col = parseInt(x / 100);

                if(num[row][col] != 22){
                    detectBox(row,col);
                    drawCanvas();

                    var isWin = checkWin();

                    if(isWin){
                        clearInterval(timer);
                        ctx.drawImage(img,0,0);
                        ctx.font = "bold 68px serif";
                        ctx.fillStyle = "red";
                        ctx.fillText("游戏成功!",20,150);
                    }
                }
            }

            //移动单击方块

            function detectBox(i,j){
                if(i > 0){
                    if(num[i-1][j] == 22){
                        num[i-1][j] = num[i][j];
                        num[i][j] = 22;
                        return;
                    }
                }

                if(i < 2){
                    if(num[i+1][j] == 22){
                        num[i+1][j] = num[i][j];
                        num[i][j] = 22;
                        return;

                    }
                }

                if(j > 0){
                    if(num[i][j-1] == 22){
                        num[i][j-1] = num[i][j];
                        num[i][j] = 22;
                        return;
                    }
                }

                if(j < 2){
                    if(num[i][j+1] == 22){
                        num[i][j+1] = num[i][j];
                        num[i][j] = 22;
                        return;
                    }
                }
            }

            //胜利判断
            function checkWin(){
                for(var i = 0;i < 3;i++){
                    for(var j = 0;j < 3;j++){
                        if(num[i][j] != i * 10 + j){
                            return false;
                        }
                    }
                }
                return true;
            }

            var time = document.getElementById("time");
            var h = 0,m = 0, s = 0;

            function getCurrentTime(){
                s = parseInt(s);
                m = parseInt(m);
                h = parseInt(h);

                s++;

                if(s == 60){
                    s = 0;
                    m++;
                }

                if(m == 60){
                    m = 0;
                    h++;
                }

                if(s < 10){
                    s = "0" + s;
                }
                 if(m < 10){
                    m = "0" + m;
                }
                 if(h < 10){
                    h = "0" + h;
                }

                time.innerHTML = h + ":" + m + ":" + s;
            }


            function restartGame(){
                clearInterval(timer);
                s = 0;
                m = 0;
                h = 0;
                getCurrentTime();
                timer = setInterval("getCurrentTime()",1000);
                generateNum();
                drawCanvas();
            }

            var timer = setInterval("getCurrentTime()",1000);