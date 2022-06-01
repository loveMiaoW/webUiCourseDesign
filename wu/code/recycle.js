// ondragstart事件回调函数
			function drag(ev){
				//设置传递的内容为被拖曳元素的id名称，数据类i选哪个为纯文本类型
				ev.dataTransfer.setData('text/plain',ev.target.id);
			}
			//ondrafover事件回调函数
			function allowDrop(ev){
				//解禁当前元素为可放置被拖曳元素的区域
				ev.preventDefault();
			}
			//ondrop事件回调函数
			function drop(ev){
				//接近当前元素为可放置被拖曳元素的区域
				ev.preventDefault();
				//获取当前被放置的元素id名称
				var id=ev.dataTransfer.getData("text");
				//根据id名称获取元素对象
				var folder=document.getElementById(id);
				//获取文件夹区域并删除该元素对象
				document.getElementById('container').removeChild(folder);
			}