function getHistory() {
	var length=localStorage.length;
	var table=document.getElementById("history");
	table.innerHTML="";
	for (var i = 0;i<length;i++) {
		var key=localStorage.key(i);
		var date=new Date();
		date.setTime(key);
		var time=date.toLocaleString();
		var content=localStorage.getItem(key);
		var row=table.insertRow(i);
		row.insertCell(0).innerHTML=i+1;
		row.insertCell(1).innerHTML=content;
		row.insertCell(2).innerHTML=time;
		row.insertCell(3).innerHTML='<button onclick="delDiary('+key+')">删除</button>';
	}
}
function saveDiary(){
	var content=document.getElementById("diary").value;
	var today=new Date();
	var key=today.getTime();
	localStorage.setItem(key,content);
	alert("日志已保存！");
	document.getElementById("diary").value="";
	getHistory();
}
function delDiary(key){
	localStorage.removeItem(key);
	alert("本条日志已删除！");
	getHistory();
}
function clearDiary(){
	localStorage.clear();
	alert("日志已全部删除！");
	getHistory();
}