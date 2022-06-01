var index = 1;
function lunbo(){
	index ++ ;
	//判断number是否大于3
	if(index > 5){
		index = 1;
	}
	//获取img对象
	var img = document.getElementsByClassName("lunbo")[0];
	img.style.background = "url(./src/bg"+index+".jpg)";
	img.style.backgroundSize="100% 100%";	
}
	//2.定义定时器
	setInterval(lunbo,3000);