 //=====================
            // 游戏参数设置
            //=====================
            //游戏界面刷新的间隔时间（数字越大，蛇的速度越慢）
            var time = 200;
            //蛇身长
            var t = 3;
            //记录蛇运行轨迹，用数组记录每一个坐标点
            var snakeMap = [];
            //蛇身单元大小
            var w = 10;
            // 方向代码：左37，上38，右39，下40
            var direction = 37;
            //蛇的初始坐标
            var x = 0;
            var y = 0;
            //食物的初始化坐标
            var foodX = 0;
            var foodY = 0;
            //当前得分
            var score = 0;
            //历史最高分纪录
            var bestScore = 0;
            //画布的宽和高
            var width = 400;
            var height = 400;
            //根据id找到指定的画布
            var c = document.getElementById("myCanvas");
            //创建2D的context对象
            var ctx = c.getContext("2d");
 
            // 获得历史最高分记录
            showBestScore();
 
            //开始游戏
            GameStart();
 
            //=====================
            // 显示历史最高分记录
            //=====================
            function showBestScore() {
                //从本地存储数据中读取历史最高分
                bestScore = localStorage.getItem("bestScore");
                //如果尚未记录最高分，则重置为0
                if (bestScore == null)
                    bestScore = 0;
                //将历史最高分更新到状态栏中
                var best = document.getElementById("bestScore");
                best.innerHTML = bestScore;
            }

            //=====================
            // 启动游戏
            //=====================

            function GameStart(){
                drawFood();
                x = Math.floor(Math.random() * width / w) * w;
                y = Math.floor(Math.random() * height / w) * w;

                direction = 37 + Math.floor(Math.random() * 4);

                setInterval("gameRefresh()",time);
            }

            //=====================
            // 游戏页面刷新函数
            //=====================

            function gameRefresh() {
                snakeMap.push({
                    'x' : x,
                    'y' : y
                });
                drawSnake();

                switch(direction){
                    case 37:
                        x -= w;
                        break;
                    case 38:
                        y -= w;
                        break;
                    case 39:
                        x += w;
                        break;
                    case 40:
                        y += w;
                        break;
                }

                var code = detectCollision();

                if(code != 0){
                    if(score > bestScore) localStorage.setItem("bestScore",score);
                    
                    if(code == 1){
                        alert("撞到墙壁了，游戏失败!当前得分: " + score);
                    }

                    else if(code == 2){
                        alert("你装到自己了！游戏失败，当前得分:" + score);
                    }

                    window.location.reload();
                }

               

                if(foodX == x && foodY == y){
                    score += 10;
                    var currentScore = document.getElementById("currentScore");

                    currentScore.innerHTML = score;
                    drawFood();
                    t++;

                }

            }

            //=====================
            // 绘制贪吃蛇函数
            //=====================

            function drawSnake(){
                ctx.fillStyle = "lightblue";
                ctx.fillRect(x,y,w,w);

                if(snakeMap.length > t){
                    var lastBox = snakeMap.shift();
                    ctx.clearRect(lastBox['x'],lastBox['y'],w,w);
                }
            }

             //=====================
            // 改变蛇方向的按键监听
            //=====================

            document.onkeydown = function(e) {
                if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){
                    direction = e.keyCode;
                }
            }

             //=====================
            // 检测碰撞函数
            //=====================

            function detectCollision(){
                if(x > width || y > height || x < 0 || y < 0){
                    return 1;
                }

                for(var i = 0;i < snakeMap.length;i++){
                    if(snakeMap[i].x == x && snakeMap[i].y == y){
                        return 2;
                    }
                }
                return 0;
            }

             //=====================
            // 绘制食物函数
            //=====================

            function drawFood(){
                foodX = Math.floor(Math.random() * width / w) * w;
                foodY = Math.floor(Math.random() * height / w) * w;

                ctx.fillStyle = "#FF0000";
                ctx.fillRect(foodX,foodY,w,w);
            }