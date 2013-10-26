$(function(){
	var PENQ={
	  goToChat: function(opt){
	  	var me = this;
	  	params = me.getUrlParams();
	  	room = params["room"];
	  	if (room) {
	  		url = "/chat?room=" + room;
	  	} else  {
	  		url = "/chat";
	  	}
	  	// For debug
	  	//console.log(url);
		//return;
		location.href = url;
	  },
	  getUrlParams: function(){
		  var vars = new Object, params;
		  var temp_params = window.location.search.substring(1).split('&');
		  for(var i = 0; i <temp_params.length; i++) {
		    params = temp_params[i].split('=');
		    vars[params[0]] = params[1];
		  }
		  return vars;
	  },
	  countdown: function(opt){
	    var me=this;
	    if(!opt){opt={};} if(!opt.id){opt.id='area';} 
	    if(!opt.year){opt.year=2013;}if(!opt.month){opt.month=4;} if(!opt.day){opt.day=1;}
	    if(!opt.hour){opt.hour=0;}
	    var dt=new Date(opt.year, opt.month-1, opt.day, opt.hour, 50, 0); var dn=new Date();
	    var d=dt-dn;
	    if(d<0){$('#'+opt.id).html(opt.already); me.goToChat(); }
	    var dd=Math.floor(d/(1000*60*60*24));
	    var hh=Math.floor((d-dd*1000*60*60*24)/(1000*60*60));
	    var mm=Math.floor((d-(dd*1000*60*60*24)-(hh*1000*60*60))/(1000*60));
	    var ss=Math.floor((d-(dd*1000*60*60*24)-(hh*1000*60*60)-(mm*1000*60))/1000);
	    var edit=function(nn, opt){
	      var i; var x=''; nn=String(nn); if(nn.length<2){nn='0'+nn;}
	      for(i=0; i<nn.length; i++){x+=opt.number.replace('#', nn.substr(i, 1));} return x;
	    };
	    var x=opt.format.replace('#d', edit(dd, opt)); x=x.replace('#h', edit(hh, opt));
	    x=x.replace('#m', edit(mm, opt));
	    x=x.replace('#rm', (edit((mm + 1), opt)));
	    x=x.replace('#s', edit(ss, opt));
	    $('#'+opt.id).html(x);
	    setTimeout(function(){me.countdown(opt);}, 1000);
	  },
	  showCurrent: function(opt){
		//時刻データを取得
		var currentTime= new Date();

		//時・分・秒を取得
		var day = currentTime.getDate();
		var hour = currentTime.getHours();
		var minute = currentTime.getMinutes();
		var second = currentTime.getSeconds();

	    var me=this;
	    var x=opt.format.replace('#d', day);
	    x=x.replace('#h', hour);
	    x=x.replace('#m', minute);
	    x=x.replace('#s', second);
	    $('#'+opt.id).html(x);
	    setTimeout(function(){me.showCurrent(opt);}, 1000);
	  },
	  scheduleTimer: function(opt){
		var me=this;
	    if(!opt){opt={};} if(!opt.id){opt.id='area';} 

		hour = parseInt(opt.hour);
	    if (hour == 9) {
	    	num = 1;
	    } else if (hour == 10) {
	    	num = 2;
	    } else if (hour == 11) {
	    	num = 3;
	    } else if (hour == 12) {
	    	me.goToChat();
	    } else if (hour == 13) {
	    	num = 4;
	    } else if (hour == 14) {
	    	num = 5;
	    } else if (hour == 15) {
	    	num = 6;
	    }  else if (hour == 16) {
	    	num = 7;
	    } else {
	    	$('#'+opt.id).html(opt.already);
	    	me.goToChat();
	    }
    	text = opt.format.replace('#st', num);
    	$('#'+opt.id).html(text);
	  },
	  close: {}
	}

	$(function(){
		//時刻データを取得
		var currentTime= new Date();

		//時・分・秒を取得
		var year = currentTime.getFullYear();
		var month = currentTime.getMonth()+1;
		var day = currentTime.getDate();
		var hour = currentTime.getHours();
		var minute = currentTime.getMinutes();
		var second = currentTime.getSeconds();

		PENQ.showCurrent({
			id: 'count-down-timer', // 表示場所
			year: year, month: month, day: day, hour: hour, minute: minute, second: second, // ターゲット日
			format: '#h:#m',
			number: '#',
			already: '<span style="font-size:32px;">今日の授業は終了しました。<br/>明日は9:00-スタートです。</span>' // ターゲットを経過した時の表示
		});

		PENQ.scheduleTimer({
			id: 'schedule-title', // 表示場所
			year: year, month: month, day: day, hour: hour, // ターゲット日
			format: '#st時間目',
			number: '#',
			already: '本日の授業は終了しました' // ターゲットを経過した時の表示
		});

		PENQ.countdown({
			id: 'countdown-message', // 表示場所
			year: year, month: month, day: day, hour: hour, // ターゲット日
			format: 'あと#rm分で休み時間',
			number: '#',
			already: 'お疲れ様でした' // ターゲットを経過した時の表示
		});
	});
});