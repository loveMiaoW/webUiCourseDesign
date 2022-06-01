function func(){
	var x = document.forms["aa"]["username"].value; 
	var y = document.forms["aa"]["pwd"].value;
	if(x!="admin"&&y!="123456"){
		alert("用户名或密码错误");
			return false;
	}
}