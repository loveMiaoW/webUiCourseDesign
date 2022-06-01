 //标记当前运动状态，初始值表示尚未开始运动
                var status = "stop";
                //获取按钮对象
                var btn = document.getElementById("btn");
                //获取时间显示对象
                var time = document.getElementById("time");
                //计时使用的时、分、秒
                var h = 0;
                var m = 0;
                var s = 0;
                //用于记录运行轨迹一系列坐标点的数组
                var path = [];
                //地图中心点坐标
                var center;
                //计时器用于计算运动总时长
                var timer;
                //实时监听用户地理位置变化的ID
                var watchID;

                function toggle() {
                	//当前为非运动状态
                	if (status == "stop") {
                		//更新状态为开始运动
                		status = "start";
                		//更新按钮显示的文字内容
                		btn.innerHTML = "结束跑步";
                		//开始实时更新地理位置
                		start ();
                	} else if (status == "start") {
                		//更新状态为停止运动
                		status = "stop";
                		//更新按钮显示的文字内容
                		btn.innerHTML = "开始跑步";
                		//停止地理位置的实时更新
                		stop();
                	}
                }

                //开始实时更新地理位置
                function start(){
                	//清空path数组中的原有数据
                	path =[];
                	//重置 时、分、秒
                	h = 0;
                	m = 0;
                	s = 0;
                	//每秒更新一次时间
                	timer = setInterval("startTime",1000);
                	//获取用户当前的定位信息
                	navigator.geolocation.getCurrentPosition(showPosition);

                	//开始实时更新地理位置信息
                	watchID= navigator.geolocation.watchPosition(showPosition,showError,options);
                }

                //停止地理位置的实时更新
                function stop(){
                	//停止地理位置信息的监听
                	navigator.geolocation.clearWatch(watchID);
                	//清除计时器
                	clearInterval(timer);
                }

                function showPosition(position){
                	//获取当前经纬度
                	var lat = position.coords.latitude;
                	var long = position.coords.longitude;
                	//重置地图中心点坐标位置
                	center = new qq.maps.LatLng(lat,long);
                	//更新path数组，添加当前经纬度坐标
                	path.push(new qq.maps.LatLng(lat,long));
                	//绘制地图
                	drawMap();
                }

                function showError(error){
                	switch(error.code){
                	case error.PERMISSION_DENIED:
                	    alert("用户拒绝了地理定位的请求。");
                	    break;
                	case error.POSITION_UNAVAILABLE:
                	    alert("位置信息不可用。");
                	    break;
                	case error.TIMEOUT:
                	    alert("请求超时。");
                	    break;
                	case error.UNKNOWN_ERROR:
                	    alert("未知错误发生。");
                	    break;            	
                	}
                }

                var options ={
                	enableHighAccuracy : true,
                	maximumAge : 2000,
                	timeout : 2000
                };

                //绘制地图与运动轨迹
                function drawMap(){
                	var map = new qq.maps.Map(document.getElementById("container"),{
                		//地图的中心地理坐标
                		center : center,
                		zoom : 14
                	});

                	//设置轨迹样式
                	var polygon = new qq.maps.Polyline({
                		map : map,
                		path : path,
                		//自定义轨迹颜色
                		strokeColor : "#00FF00",
                		//自定义轨迹宽度
                		StrokeWeight : 10
                	});
                }

                //获取当前时间
                function startTime(){
                	//将时、分、秒转换为整数以便进行自增或赋值
                	s = parseInt(s);
                	m = parseInt(m);
                	h = parseInt(h);

                	//每秒变量s先自增1
                	s++;
                	if (s == 60) {
                		//如果秒已经达到60，则归0
                		s = 0;
                		//分钟自增1
                		m++;
                	}
                	if (m == 60) {
                		//如果分钟也达到60，则归0
                		m = 0;
                		//小时自增1
                		h++;
                    }

                    if (h < 10) 
                    	h = "0" + h;
                    //以确保0-9时也显示成两位数
                    if (m < 10) 
                        m = "0" + m;
                   //以确保0-9分钟也显示成两位数
                    if (s < 10) 
                        s = "0" + s;
                   //以确保0-9秒也显示成两位数
                   
                   time,innerHTML = h + ":" + m + ":" + s;
               }