$(function(){
    var PENQ={
        goToClock: function(opt){
            //return;
            location.href="/clock";
        },
        countdown: function(opt){
            var me=this;
            if(!opt){opt={};} if(!opt.id){opt.id='area';}
            if(!opt.already){ me.goToClock(); }
            if(!opt.year){opt.year=2013;}if(!opt.month){opt.month=4;} if(!opt.day){opt.day=1;}
            if(!opt.hour){opt.hour=0;}
            var dt=new Date(opt.year, opt.month-1, opt.day, opt.hour, 0, 0); var dn=new Date();
            var d=dt-dn;
            if(d<0){$('#'+opt.id).html(opt.already); return;}
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
        },
        scheduleTimer: function(opt){
            var me=this;
            if(!opt){opt={};} if(!opt.id){opt.id='area';}

            hour = parseInt(opt.hour);
            min = parseInt(opt.min);
            if (hour == 9) {
                me = 1
            } else if (hour == 10) {
                me = 2
            } else if (hour == 11) {
                me = 3
            } else if (hour == 12) {
                me.goToClock();
            } else if (hour == 13) {
                me = 4;
            } else if (hour == 14) {
                me = 5;
            } else if (hour == 15) {
                me = 6;
            } else {
                $('#'+opt.id).html(opt.already);
                me.goToClock();
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
        var min = currentTime.getMinutes();

        PENQ.countdown({
            id: 'count-down-timer', // 表示場所
            year: year, month: month, day: day, hour: (hour + 1), // ターゲット日
            format: '#m:#s',
            number: '#',
            already: '<span>今日の授業は終了しました。明日は9:00-スタートです。</span>' // ターゲットを経過した時の表示
        });

        PENQ.scheduleTimer({
            id: 'schedule-title', // 表示場所
            year: year, month: month, day: day, hour: hour, // ターゲット日
            format: '#st時間目',
            number: '#',
            already: '本日の授業は終了しました。' // ターゲットを経過した時の表示
        });
    });
});