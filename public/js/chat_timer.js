$(function(){
    var PENQ={
        goToClock: function(opt){
            var me=this;
            params = me.getUrlParams();
            room = params["room"];
            if (room) {
                url = "/clock?room=" + room;
            } else {
                url = "/clock";
            }
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
            if(!opt.already){ me.goToClock(); }
            if(!opt.year){opt.year=2013;}if(!opt.month){opt.month=4;} if(!opt.day){opt.day=1;}
            if(!opt.hour){opt.hour=0;}
            var dt=new Date(opt.year, opt.month-1, opt.day, opt.hour, 0, 0); var dn=new Date();
            var d=dt-dn;
            if(d<0){$('#'+opt.id).html(opt.already); me.goToClock();}
            var dd=Math.floor(d/(1000*60*60*24));
            var hh=Math.floor((d-dd*1000*60*60*24)/(1000*60*60));
            var mm=Math.floor((d-(dd*1000*60*60*24)-(hh*1000*60*60))/(1000*60));
            var ss=Math.floor((d-(dd*1000*60*60*24)-(hh*1000*60*60)-(mm*1000*60))/1000);
            var edit=function(nn, opt){
                var i; var x=''; nn=String(nn); if(nn.length<2){nn='0'+nn;}
                for(i=0; i<nn.length; i++){x+=opt.number.replace('#', nn.substr(i, 1));} return x;
            };
            var x=opt.format.replace('#d', edit(dd, opt)); x=x.replace('#h', edit(hh, opt));
            x=x.replace('#m', edit(mm, opt)); x=x.replace('#s', edit(ss, opt));
            $('#'+opt.id).html(x);
            setTimeout(function(){me.countdown(opt);}, 1000);
        }
    }

    $(function(){
        //時刻データを取得
        var currentTime= new Date();

        //時・分・秒を取得
        var year = currentTime.getFullYear();
        var month = currentTime.getMonth()+1;
        var day = currentTime.getDate();
        var hour = currentTime.getHours();
        var min = currentTime.getMinutes();

        PENQ.countdown({
            id: 'count-down-timer', // 表示場所
            year: year, month: month, day: day, hour: (hour + 1), // ターゲット日
            format: '#m:#s',
            number: '#',
            already: '<span>今日の授業は終了しました。明日は9:00-スタートです。</span>' // ターゲットを経過した時の表示
        });
    });
});