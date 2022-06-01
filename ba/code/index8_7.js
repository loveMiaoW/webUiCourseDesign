 var index=0;

        $(document).ready(function(){
            setInterval("next()",3000);
        });
        function next(){
            $("li:eq(" + index + ")").fadeOut(1500);
            if(index == 2)
                index = 0;
            else
                index ++;
            $("li:eq(" + index + ")").fadeIn(1500);
        }
        function showImage(name){
            $("#showImage").fadeIn(500);
            $("#productImg").attr("src",+name+".jpg");
        }
        function closeImage(){
            $("#showImage").fadeOut(500);
        }