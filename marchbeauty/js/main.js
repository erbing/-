/*
*主要的 业务逻辑代码
*time:20160303
*dev:zhangge
*版本:1.0.0
*/

$(function(){

	var headerIndex = $(".header1");
	var headerGame = $(".header2");
	var startGame = $(".start-btn");
	var realtime = $(".realtime");

	//给start按钮添加事件


	//添加 cookie 判断
	var cookieresno = getCookie("notuse");

	if (cookieresno == "2") {

		startGame.click(function(){
			$(".layerno").css({
				'display':'block'
			})
		});

		$(".layerok-btn").click(function(){
				delCookie('notuse');	
				$(".layerno").css({
				'display':'none'
				});
				window.location.href = "./index.html";
		})

	}else{

		startGame.bind("click",function(){
			var status = 1;
			if(status = 1){
				headerIndex.css({
					'display':'none'
				});
				headerGame.css({
					'display':'block'
				});
				status = 0;
			}else if(status = 0){
				alert(1)
			}

		});
	}	

	$(".start-btn1").bind('click',function(){
		var btn1img = this.src;
		console.log(btn1img); 
		if(btn1img === "images/btn_04.png"){
			alert("您还没开始玩游戏呢~");
		}
	});

	
	//给蒙层 设置宽高
	var layerWidrh = window.screen.availWidth;
	var layerHeight = window.screen.availHeight;
	var layer = $(".layer");
	layer.css({
		'width':'layerWidrh',
		'height':'layerHeight'
	})



	//先判断页面时候加载完成
	var timeStart = function(){
		if(document.readyState == 'complete')  {
			console.log("游戏开始！");
		}
	};
	//运行判断页面加载
	document.onreadystatechange = timeStart;	

	var cookieres =  getCookie("status");
	

	console.log(cookieres);
	console.log(cookieresno);

	if(cookieres === "1"){

		$("#watch-btn").attr('src','images/btn_05.png');
		
		$("#watch-btn").bind('click',function(){
			$(".header1").css({'display':'none'});
			$(".header3").css({'display':'block'});
		});

	}else{

		$("#watch-btn").attr('src','images/btn_04.png');

	}



});

	//去掉游戏的蒙层
	function test(){
			$('.layerwith').css({
				'display':'none'
			});
	}

	function layok(){
     $(".layerok").css({'display':'block'});	
     // changeback();
  }

  function layno(){
     $('.layerno').css({'display':'block'});
     // changeback();
  }

  //游戏开始
	$(".start-btn").click(function(){

	  	var f =setInterval(changeTime,1200);
	  	var s = 3;

			function changeTime(){ 
				$(".realtime").html(s); 
				
				if(s>0){
					s = s - 1;
				}else{

					//清楚定时器
					f=window.clearInterval(f);

					changeback();		
					test();
					$(".realtime").remove();
				}

			}
	});


	//切换成背面
	var changeback = function(){
		var listArr = [];
		var imgs = $("#imglist img");

		for (var i = 0; i < imgs.length; i++) {
			var resArr = listArr.push(imgs[i]);
		}

		imgs.map(function(){
				this.setAttribute('src','images/backface.png');

				this.setAttribute('class','animate');			
		});		
		
	}

	//存入cookie 方法
	function setCookie(name, value, iDay){

		var oDate=new Date();

		oDate.setDate(oDate.getDate()+iDay);

		document.cookie=name+'='+encodeURIComponent(value)+';expires='+oDate;
		
	}

	//取出cookie 方法
	function getCookie(name){  
	  var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
	  if(arr != null){  
	   return unescape(arr[2]);   
	  }else{  
	   return null;  
	  }  
	}   

	//删除cookie 方法
	function delCookie(name){  
    var exp = new Date();  //当前时间  
    exp.setTime(exp.getTime() - 1);  
    var cval=getCookie(name);  
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
	} 


	//事件委托，点击图片，图片反转的方法
	var list = $("#imglist");
	var imgs = $("#imglist img");

	list.click(function(e){
		var e = e || window.event || arguments[0];
		var traget = e.traget || e.srcElement; //获取当前事件的对象（源）

		if (traget.nodeName.toLowerCase() === "img") {
				
				traget.setAttribute('class','unanimate');

				var imgNum = traget.getAttribute("item");	

				traget.setAttribute('src','images/'+imgNum+'.png');
				
			}
	});


	// 获取到当前点击 的li名词，并传入数组中去
	
  var numArr = [];

  var getnumArr = function(imgs){

      var helper = function(i){

          return function(e){
            numArr.push(i);
            if(numArr.length ===2){

            //关键换件，判断是否中奖	
            	// 初始化数组 
            	var servArr = ["美妆","美甲","美睫","美妆","修眉","盘发","美甲","盘发","手护"]
            	console.log(servArr);
            	console.log(resArr); // 混淆过后的数组

            	console.log(numArr); // 得到的 数字

            	var compaArra = [];
            	compaArra.push(servArr[numArr[0]]);
            	compaArra.push(servArr[numArr[1]]);
            	console.log(compaArra);

            	var compaArrb = [];
            	compaArrb.push(resArr[0]);
            	compaArrb.push(resArr[1]);
            	console.log(compaArrb);

            	
            	if(compaArra.sort().toString() == compaArrb.sort().toString()){
            			
            			//设置cookie 
          				setCookie('status','1',1);

            			window.setTimeout('layok()',500);

            			//成功之后，点击查看礼品
            			$(".layerok-btn").bind('click',function(){
            				$(".layerok").css({'display':'none'});
            				$(".header2").css({'display':'none'});
            				$(".header3").css({'display':'block'});
            			});

            			//分享再玩一次的 按钮;
            			$('.shareaginebtn').bind('click',function(){
            				$(".layer3").css({'display':'block'});
            			});


            			$('.shareknow').bind('click',function(){

											window.location.href = "./index.html"

            			});
            			

          				


            	}else{

            		setCookie('notuse','2',1);

            		window.setTimeout('layno()',500);
            		
   							
   					 		$('.layerok-btn').bind('click',function(){
	
        					window.location.href = "./index.html";

             		});



								
            	}


            }
            
          }
      };  
		

      for (var i = 0; i < imgs.length; i++) {
          imgs[i].onclick = helper(i);        
      };
	
			return numArr
  }(imgs);

  var resnumArr = getnumArr;
  console.log(resnumArr);



	//从数组中选取二个服务项
	var resArr = [];
	var servArr = ["美妆","美甲","美睫","美妆","修眉","盘发","美甲","盘发","手护"]
	
	var selectTwo = function(servArr){

		var gametext = $('.gametext');

		function randomsort(a,b){
			return Math.random()>0.5?-1:1;
		}

		var resArr = servArr.sort(randomsort);
		//console.log(resArr);	

		gametext.html("找出下面<strong>"+ resArr[0] +"</strong>、<strong>"+resArr[1]+"</strong>两张图的位置<br/>变美就靠它了");
	
		return resArr;

	}(servArr);  

	var resArr = selectTwo;

	console.log(resArr);


