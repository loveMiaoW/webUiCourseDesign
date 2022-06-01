            var oldLong;
            var oldLat;
            var currentLong;
            var currentLat;
 
            function getLocation() {
                if (navigator.geolocation) {
                    var watchID = navigator.geolocation.watchPosition(showPosition, showError, options);
                } else {
                    alert("对不起，您的浏览器不支持HTML5地理定位API");
                }
            }
 
            function showPosition(position) {
                if (currentLong != null && currentLat != null) {
                    oldLong = currentLong;
                    oldLat = currentLat;
                }
                currentLong = position.coords.longitude;
                currentLat = position.coords.latitude;
 
                alert(currentLong + "," + currentLat);
 
                var long = document.getElementById("long");
                long.innerHTML = currentLong;
                var lat = document.getElementById("lat");
                lat.innerHTML = currentLat;
                var acc = document.getElementById("acc");
                acc.innerHTML = position.coords.accuracy;
                var alt = document.getElementById("alt");
                alt.innerHTML = position.coords.altitude;
                var speed = document.getElementById("speed");
                speed = position.coords.speed;
 
                if (oldLat != null && oldLong != null) {
                    var d = getDistance(currentLat, currentLong, oldLat, oldLong);
                    var lastDistance = document.getElementById("distance").innerHTML;
                    alert(d);
                    document.getElementById("distance").innerHTML = parseFloat(lastDistance) + d;
                }
            }
 			function showError(error) {
                switch(error.code) {
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
 
            var options = {
                enableHighAccuracy : true,
                timeout : 2000,
                maximunAge : 2000
            };
 
            var isRunning = false;
            var start_time = document.getElementById("start_time");
            var end_time = document.getElementById("end_time");
 
            function toggleBtn() {
                var btn = document.getElementById("btn");
                if (!isRunning) {
                    var now = new Date();
                    start_time.innerHTML = now.toLocaleString();
                    end_time.innerHTML = "";
                    isRunning = true;
                    btn.innerHTML = "完成记录";
                    document.getElementById("distance").innerHTML = "0";
                    getLocation();
                }
                else {
                    isRunning = false;
                    btn.innerHTML = "开始记录";
                    var now = new Date();
                    end_time.innerHTML = now.toLocaleString();
                }
            }
 
            function toRadians(degree) {
                return degree * Math.PI / 180;
            }
 
            function getDistance(lat1, long1, lat2, long2) {
                var R = 6371;
                var deltaLat = toRadians(lat2 - lat1);
                var deltaLong = toRadians(long2 - long1);
                lat1 = toRadians(lat1);
                lat2 = toRadians(lat2);
                var h = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);
                var d = 2 * R * Math.asin(Math.sqrt(h));
                return d;
            }