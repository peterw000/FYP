var leftState = 1;
var leftSub_state = 2;
var rightState = 1;
var leftNavInfo = document.querySelectorAll(".leftNavInfo");
var centerContent = document.getElementById("centerContent");
var oLeft = document.getElementById("openLeft");
oLeft.addEventListener("click", function (){
	if(leftState==0){leftState=1}
	else if(leftState==1){leftState=0}
	leftNav(leftState,leftSub_state);
	checkCenterContent();
});
var minMaxLeft = document.getElementById("minMaxLeft");
minMaxLeft.addEventListener("click",function (){
if(leftSub_state==1){
	leftSub_state=2
	minMaxLeft.src = "Images/close.png"
} else if(leftSub_state==2){
		leftSub_state=1
		minMaxLeft.src = "Images/open.png"
	}
	leftNav(leftState,leftSub_state);
	checkCenterContent();
});
var leftNav=function (State,leftSub_State){
	leftState = State	
	leftSub_state = leftSub_State
	lnav = document.getElementById('Left-nav');
	if(leftState == 0) {
			lnav.style.visibility = 'hidden'
			minMaxLeft.style.visibility = 'hidden'
			for (var i = 0; i < leftNavInfo.length; i++) {
	    		leftNavInfo[i].style.visibility = 'hidden';
			}
			lnav.style.width = "0%"
	} else if(leftState == 1){
		minMaxLeft.style.visibility = 'visible'
		lnav.style.visibility = 'visible'	
		if(leftSub_state == 1){
			for (var i = 0; i < leftNavInfo.length; i++) {
	    		leftNavInfo[i].style.visibility = 'hidden';
			}
			lnav.style.width = "4%"
			
		} else if(leftSub_state == 2){
			
			lnav.style.width = "20%"
			for (var i = 0; i < leftNavInfo.length; i++) {
		    		leftNavInfo[i].style.visibility = 'visible';
				
			}
		};
	};
};

var callOpen = document.getElementById("call");
callOpen.addEventListener("click", function (){
	if(rightState==0){rightState=1}
	else if(rightState==1){rightState=0}
	rightNav(rightState);
	checkCenterContent();
});

var friendOpen = document.getElementById("friend");
friendOpen.addEventListener("click", function (){
	if(rightState==0){
		rightState=1
		friends(steamNumber);
	}
	else if(rightState==1){rightState=0}
	rightNav(rightState);
	checkCenterContent();
});
var chatOpen = document.getElementById("chat");
chatOpen.addEventListener("click", function (){
	if(rightState==0){rightState=1}
	else if(rightState==1){rightState=0}
	rightNav(rightState);
	checkCenterContent();
});

var rightNav = function (State){
	rightState = State
	rnav = document.getElementById('Right-nav');
	if(rightState == 0) {
			rnav.style.display = 'none'
			rnav.style.width = "0%"
	} else if(rightState == 1){
		rnav.style.display = 'inline-block'
		rnav.style.width = "20%"
	};
};

//this part det the middle content
var checkCenterContent=function (){
	if(leftState==0&&rightState==0) {
		centerContent.style.width ="100%"
	}else if(leftState==1||rightState==1){

		if (leftSub_state==1&&rightState==0) {
			centerContent.style.width ="96%"
		}else if (leftSub_state==2&&rightState==0) {
			centerContent.style.width ="80%"
		}else if(leftState==0&&rightState==1) {
		centerContent.style.width ="80%"
		}else if (leftSub_state==1&&rightState==1) {
			centerContent.style.width ="76%"
		}else if (leftSub_state==2&&rightState==1) {
			centerContent.style.width ="60%"
		}
	};
};