var data = ['iphone6s','ipad4','小米电视','200话费充值','1000超市购物券','谢谢参与','iwatch'],
	timer = null;
	flag = 0; 

window.onload = function(){

	var title = document.getElementById('title'),
		play  =	document.getElementById('start'),
		stop  = document.getElementById('stop');

		//开始抽奖
		play.onclick = playfun;

		//停止抽奖
		stop.onclick = stopfun;

		//键盘事件
		document.onkeyup = function(event){
			event = event || window.event;
			// console.log(event.keyCode); 得到空格键的keyCode 的键值 是32
			if(event.keyCode==32){
				if(flag==0){
					playfun();
					return flag = 1;
				}else if(flag==1){
					stopfun();
					return flag = 0;
				}
			}
		}
}


function playfun(){
	var play  =	document.getElementById('start');
	var title = document.getElementById('title');
	clearInterval(timer);
	timer = setInterval(function(){
		var random = Math.floor(Math.random()*data.length);
		title.innerHTML = data[random];
	},80);
	play.style.background = '#999';
}


function stopfun(){
	clearInterval(timer);
	var start = document.getElementById('start');
	start.style.background = 'blue';
}




