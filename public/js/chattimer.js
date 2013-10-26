var start=new Date();
var cnt_val=5;
start=Date.parse(start)/1000;
function count_down(){
    var now=new Date();
    now=Date.parse(now)/1000;
    var x=parseInt(cnt_val-(now-start),10);
    if(document.form1){document.form1.c_down.value = x;}
    if(x>0){
        timerID=setTimeout("count_down()", 100)
    }else{
        location.href="/"
    }
}