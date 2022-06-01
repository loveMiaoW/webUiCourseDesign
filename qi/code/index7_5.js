 //获取音频对象
    var music=document.getElementById("audio");
    //获取音量调节进度条
    var volume=document.getElementById("volume");
    //获取音乐播放暂停按钮
    var toggleBtn=document.getElementById("toggleBtn");
    //获取当前音乐的播放标题
    var title=document.getElementById("title");
   //音乐路径
   var list=new Array("曹操.mp3","千年.mp3","左手右手.mp3");
   //音乐标题
   var titleList=new Array("曹操","千年","左手右手");
   var i=0;//定义当前是第几首歌曲

   //音乐播放暂停切换方法
   function toggleMusic(){
       if(music.paused){
           music.play();
           toggleBtn.innerHTML='<img src="./src/6.PNG" width="50" height="50"/>';
       }
       else{
           music.pause();
           //暂停音乐
           toggleBtn.innerHTML='<img src="./src/5.PNG" width="50" height="50"/>';
       }
   }

   //音量大小
   function setVolume(){
    music.volume=volume.value;
   }

   //切换下一首
   function nextMusic(){
       if(i==list.lenght-1)
       i=0;
       else
       i++;
       music.pause();
       music.src=list[i];
       title.innerHTML=titleList[i];
       music.play();
      

   }
   //切换上一首
   function lastMusic(){
       if(i==0)
       i=list.lenght-1;
       else
       i--;
       music.pause();
       music.src=list[i];
       title.innerHTML=titleList[i];
       music.play();
   }
