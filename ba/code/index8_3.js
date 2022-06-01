			var x = document.getElementsByTagName("header");
   	     	var y = document.getElementsByTagName("footer");
   	     	var bgColor;
   	     	//加载历史设置
   	     	function loadSettings() {
   	     		//获取localStorage.getTtem('bgColor');
   	     		if (bgColor != null) {
   	     			showColor();
   	     		}
   	     	}
   	     	//保存当前设置内容
   	     	function saveSettings(){
   	     		//获取当前下拉菜单中的颜色
   	     		bgColor = document.getElementById("colorSelector").value;
   	     		//在localStorage中保存当前颜色
   	     		localStorage.setItem('bgColor',bgColor);
   	     		//在页面上更新颜色样式
   	     		showColor();
   	     	}
   	     	//实时更新颜色样式
   	     	function showColor(){
   	     		for(var i = 0;i<x.length;i++){
   	     			x[i].style.backgroundColor = bgColor;
   	     			y[i].style.backgroundColor = bgColor;
   	     	}
   	     }