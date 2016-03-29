var type=10;
var pageNo=1;
var allNum;

//生成课程列表模块
(function(){
	var oMainWrap=document.getElementById('main_wrap');
	var inner='';
	for(var i=0;i<20;i++){
		inner+="<div class='course cour'><img src=''><div class='course_con'><h3 class='course_title'></h3><em></em><span></span><strong></strong></div><div class='hover'><div class='hover_top'><img src=''><div class='hover_top_con'><h4></h4><div class='learner'></div><p></p><p></p></div></div><div class='hover_bottom'><p></p></div></div></div>"
	}
	oMainWrap.innerHTML=inner;
})();
//分类选择 分页器
(function(){
	var oMainTab=document.getElementById('main_tab');
	var aLi=oMainTab.getElementsByTagName('li');

	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		addEvent(aLi[i],'click',function(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className='';
			}
			this.className='active';
			if(this.index==0){
				type=10;
				course(pageNo,type);
			}else{
				type=20;
				course(pageNo,type);
			}
		});

	}
	oMainTab.onselectstart = function(){return false;}

	var oPage=document.getElementById('page');
	var aA=oPage.getElementsByTagName('a');

	ajax("http://study.163.com/webDev/couresByCategory.htm?pageNo=1&psize=20&type=10",fn2);
	function fn2(t){
		var date=JSON.parse(t);
		allNum=date.totalPage;
	}

	for(var i=1;i<aA.length-1;i++){
		addEvent(aA[i],'click',function(ev){
			var ev=ev||event;
			var nowNum=parseInt(this.getAttribute('href').substring(1));
			if(pageNo==nowNum){
				return false || ev.preventDefault();
			}
			pageNo=nowNum;
			pageTab(nowNum,allNum);
			course(pageNo,type);
			return false || ev.preventDefault();
		});
	}

	addEvent(aA[0],'click',function(ev){
		var ev=ev||event;
		if(pageNo==1){
			return false || ev.preventDefault();
		}
		pageNo--;
		pageTab(pageNo,allNum);
		course(pageNo,type);
	});

	addEvent(aA[9],'click',function(ev){
		var ev=ev||event;
		if(pageNo==allNum){
			return false || ev.preventDefault();
		}
		pageNo++;
		pageTab(pageNo,allNum);
		course(pageNo,type);
	});

	pageTab(pageNo,allNum);
	function pageTab(now,all){        //生成按钮列表
		if(now>all){
			pageNo=now=all;
		}
		for(var i=1;i<aA.length-1;i++){
			aA[i].className='';
			if(now<=5){
				aA[i].href='#'+i;
				aA[i].innerHTML=i;
				if(i==now){
					aA[i].className='select';
				}
			}else if(now>5 && (all-now)>=3){
				aA[i].href='#'+(now-5+i);
				aA[i].innerHTML=now-5+i;
				if((now-5+i)==now){
					aA[i].className='select';
				}
			}else{
				aA[i].href='#'+(all-8+i);
				aA[i].innerHTML=all-8+i;
				if((all-8+i)==now){
					aA[i].className='select';
				}
			}
		}
	}

	//课程列表
	function course(p,t){
		ajax("http://study.163.com/webDev/couresByCategory.htm?"+"pageNo="+p+"&psize=20&type="+t,fn3);
		function fn3(t){
			var date=JSON.parse(t);
			allNum=date.totalPage;
			pageTab(pageNo,allNum);
			var oCour=getElementsByClassName(document,'cour');
			var arr=date.list;
			for(var i=0;i<oCour.length;i++){
				var oImg=oCour[i].getElementsByTagName('img');
				var oH3=oCour[i].getElementsByTagName('h3')[0];
				var oEm=oCour[i].getElementsByTagName('em')[0];
				var oSpan=oCour[i].getElementsByTagName('span')[0];
				var oStrong=oCour[i].getElementsByTagName('strong')[0];	
				var oH4=oCour[i].getElementsByTagName('h4')[0];	
				var oLearner=getElementsByClassName(oCour[i],'learner');
				var oP=oCour[i].getElementsByTagName('p');
				oImg[0].src='';
				oImg[0].src=oImg[1].src=arr[i].bigPhotoUrl;
				oH3.innerHTML=oH4.innerHTML=arr[i].name;
				oEm.innerHTML=arr[i].provider;
				oSpan.innerHTML=arr[i].learnerCount;
				oStrong.innerHTML=arr[i].price==0?'免费':'¥ '+arr[i].price;
				oLearner[0].innerHTML=arr[i].learnerCount+'人在学';
				oP[0].innerHTML='发布者：'+arr[i].provider;
				oP[1].innerHTML='分类：'+arr[i].categoryName;
				oP[2].innerHTML=arr[i].description;
			}
		}
	}
	course(pageNo,type);
})();

//关闭顶部通知条
(function(){
	var oTop=document.getElementById('top');
	var oTopCloseBtn=document.getElementById('top_close_btn');
	var closeCookie=getCookie('close');
	if(closeCookie=='yes'){
		oTop.style.display='none';
	}
	addEvent(oTopCloseBtn,'click',function(){
		oTop.style.display='none';
		setCookie('close','yes',30);
	})
})();

//关注按钮
(function(){
	var oFocusBtn=document.getElementById('focus_btn');
	var oUnfocusBtn=document.getElementById('unfocus_btn');
	var oFans=document.getElementById('fans');
	var oFocusSpan=oFocusBtn.getElementsByTagName('span')[0];
	var oShade=document.getElementById('shade');
	var oLogin=document.getElementById('login');
	var aInp=oLogin.getElementsByTagName('input');
	var oBtn=oLogin.getElementsByTagName('button')[0];
	var oI=oLogin.getElementsByTagName('i')[0];
	var oForm=document.getElementById('login_form');
	var followCookie=getCookie('followSuc');

	if(followCookie=='yes'){
		oFocusSpan.innerHTML='已关注';
		removeClass(oFocusBtn,'btn_1');
		addClass(oFocusBtn,'btn_2');
	}


	addEvent(oFocusBtn,'click',function(){
		oShade.style.display='block';
		oLogin.style.display='block';
	});

	addEvent(oUnfocusBtn,'click',function(ev){
		var ev =ev || event;
		ev.cancelBubble=true;
		oFocusSpan.innerHTML='关注';
		removeClass(oFocusBtn,'btn_2');
		addClass(oFocusBtn,'btn_1');
		removeCookie('followSuc');
		oFans.innerHTML=oFans.innerHTML-1;
	});

	addEvent(oI,'click',function(){
		oShade.style.display='none';
		oLogin.style.display='none';
		oForm.userName.value=oForm.password.value='';
	});

	addEvent(oBtn,'mousedown',function(){
		this.style.backgroundPosition="0 -67px";
		addEvent(document,'mouseup',function(){
			oBtn.style.backgroundPosition="0 0";
		});
	});

	 for(var i=0;i<aInp.length;i++){
	 	 addEvent(aInp[i],'focus',function(){
	 	 	this.style.outline='1px solid blue';
	 	 });
	 	 addEvent(aInp[i],'blur',function(){
	 	 	this.style.outline='';
	 	 });
	 }

	addEvent(oForm,'submit',function(ev){
		var ev=ev||event;
		var user = oForm.userName.value,passwd = oForm.password.value;
		if ((user.length>6) && (passwd.length>6)){
			ev.preventDefault();
			user=hex_md5(user);
        	passwd=hex_md5(passwd);
			ajax('http://study.163.com/webDev/login.htm?userName='+user+'&password='+passwd,login);
		}else{
			ev.preventDefault();
			alert('账号和密码必须大于6位');
		}
	});

	function login(t){
		if(t==1){
			follow();
		}else{
			alert('账号或密码错误');
		}
	}

	function follow(){
		ajax('http://study.163.com/webDev/attention.htm',function(c){
			if(c==1){
				setCookie('followSuc','yes',30);
				oFocusSpan.innerHTML='已关注';
				removeClass(oFocusBtn,'btn_1');
				addClass(oFocusBtn,'btn_2');
				oShade.style.display='none';
				oLogin.style.display='none';
				oForm.userName.value=oForm.password.value='';
				oFans.innerHTML=parseInt(oFans.innerHTML)+1;
			}
		});
	}
})();

//轮播图
(function(){
	var oBanner=document.getElementById('banner');
	var aA=oBanner.getElementsByTagName('a');
	var oBannerBtn=document.getElementById('banner_btn');
	var aLi=oBannerBtn.getElementsByTagName('li');
	var timer_ban=null;
	var num=-1;

	for(var i=0;i<aA.length;i++){
		aA[i].style.zIndex=aA.length-i;
	}

	//移到图片上暂停
	for(var i=0;i<aA.length;i++){
		addEvent(aA[i],'mouseover',function(){
			clearInterval(timer_ban);
		});
		addEvent(aA[i],'mouseout',function(){
			timer_ban=setInterval(tab,5000);
		});
	}
	

	//图片居中
	function toResize(){
		var viewWidth=document.documentElement.clientWidth;
		var left=(viewWidth-parseInt(getStyle(aA[0],'width')))/2;
		if(viewWidth>=960){
			for(var i=0;i<aA.length;i++){
				aA[i].style.left=left+'px';
			}
		}
	}

	toResize();
	addEvent(window,'resize',toResize);
	//点击轮播
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		addEvent(aLi[i],'click',function(){
			if(num!=this.index){
				clearInterval(timer_ban);
				fn(this.index);
				num=this.index;
				timer_ban=setInterval(tab,5000);
			}
		});
	}
	//自动轮播
	function tab(){
		num=num+1;
		if(num==aA.length){
			num=0;
		}
		fn(num);
	}

	tab();
	timer_ban=setInterval(tab,5000);
	
	function fn(t){
		for(var i=0;i<aA.length;i++){
			aLi[i].className='';
			aA[i].style.zIndex-=1;
		}
		aLi[t].className='active';
		aA[t].style.opacity='0';
		aA[t].style.filter='alpha(opacity=0)';
		aA[t].style.zIndex=aA.length-1;
		doOpacity(aA[t],2,100);
	}
})();

//环境图片居中
(function(){
	var oEnvirCon=document.getElementById('envir_con');
	var aImg=oEnvirCon.getElementsByTagName('img');
	// addEvent(window,'load',function(){
	// 	for(var i=0;i<aImg.length;i++){
	// 		width+=parseInt(getStyle(aImg[i],'width'))+4;
	// 	}
	// 	oEnvirCon.style.width=width+'px';
	// });
	var width=(320+4)*aImg.length;
	oEnvirCon.style.width=width+'px';
	function toResize1(){
		var viewWidth=document.documentElement.clientWidth;
		var left=(viewWidth-parseInt(getStyle(oEnvirCon,'width')))/2;
		oEnvirCon.style.left=left+'px';
	}
	toResize1();
	addEvent(window,'resize',toResize1);
})();


//热门列表
(function(){
	var oHostList=document.getElementById('host_list');
	var aLi=oHostList.getElementsByTagName('li');
	

	ajax('http://study.163.com/webDev/hotcouresByCategory.htm',fn1);
	function fn1(t){
		var user=JSON.parse(t);
		var num=0;
		update();
		setInterval(update,5000);
		function update(){
			for(var i=0;i<aLi.length;i++){
				var oImg=aLi[i].getElementsByTagName('img')[0];
				var oH=aLi[i].getElementsByTagName('h4')[0];
				var oSpan=aLi[i].getElementsByTagName('span')[0];
				var len=aLi.length-1-i+num;
				oImg.src=user[len].smallPhotoUrl;
				oH.innerHTML=user[len].name;
				oSpan.innerHTML=user[len].learnerCount;
			}
			num++;
			if((num+aLi.length)==user.length){
				num=0;
			}
		}
			
	}
})();
//视频播放
(function(){
	var oVideo=document.getElementById('video');
	var oVideoCon=oVideo.getElementsByTagName('video')[0];
	var oVideoImg=document.getElementById('video_img');
	var oI=oVideo.getElementsByTagName('i')[0];
	var oShade=document.getElementById('shade');

	addEvent(oVideoImg,'click',function(){
		oVideo.style.display='block';
		oShade.style.display='block';
		oVideoCon.play();
	});

	addEvent(oI,'click',function(){
		oVideo.style.display='none';
		oShade.style.display='none';
		oVideoCon.pause();
	});
})();










