var logedin,steamID64,steamNumber,url="http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key="+steamKEY+"&vanityurl="+steamURL,
steamURL,steamKEY="D465752F2A76D0E08587BD27439E75C8";

if(steamNumber==""||steamNumber==undefined){
	number = JSON.parse(sessionStorage.getItem('Users'));
	if(number!=null){steamNumber = number.usersNumber;}
	
}

if(logedin==""||logedin==undefined){
	number = JSON.parse(sessionStorage.getItem('loginUsers'));
	if(number!=null){
		logedin = number.login;
		document.getElementById("logInOut").style.display="inline-block";
	}
	
}


if(logedin == 1){
	document.getElementById("loginForm").style.display="none";
	document.getElementById("sub-nav").style.display="inline-block";
	
	document.getElementById("Left-nav").style.display="inline-block";

	document.getElementById("Right-nav").style.display="inline-block";
	rightNav(1);
	leftNav(1,2);
	checkCenterContent();
} else {

	document.getElementById("loginForm").style.display="inline-block";
	document.getElementById("sub-nav").style.display="none";

	document.getElementById("Left-nav").style.display="none";

	document.getElementById("Right-nav").style.display="none";
	rightNav(0);
	leftNav(0,2);
	checkCenterContent();
}

var loginButton = document.getElementById("loginSub").onclick = function() { 
	logInOut(0);

};
var logoutButton = document.getElementById("logInOut").onclick = function() { 
	logInOut(1);

};
function logInOut(logout){
	var Username = document.getElementById("inputUsername").value
	var UPassword = document.getElementById("inputPassword").value
	hashPassword = calcMD5(UPassword);
	xhr = createCORSRequest("GET","JS/login.php?Username="+Username+"&Password="+hashPassword+"&logout="+logout);
	xhr.withCredentials="true"
	  // Response handlers.
	xhr.onload = function() {
	    logedin = xhr.responseText;
	    if(logedin == 1){
				document.getElementById("loginForm").style.display="none";
				document.getElementById("logInOut").style.display="inline-block";
				document.getElementById("sub-nav").style.display="inline-block";
		
				document.getElementById("Left-nav").style.display="inline-block";

				document.getElementById("Right-nav").style.display="inline-block";
				rightNav(1);
				leftNav(1,2);
				checkCenterContent();
				if(sessionStorage.loginUsers!=null||sessionStorage.loginUsers!=undefined){
					var replace = JSON.parse(sessionStorage.loginUsers)
					replace.login=1;
					replace.usersName=Username;
					sessionStorage.loginUsers=JSON.stringify(replace);
				}else{sessionStorage.setItem("loginUsers",JSON.stringify({"userID":1,"usersName":Username,"login":1}))
				}

    			} else {
    			if(sessionStorage.loginUsers!=null||sessionStorage.loginUsers!=undefined){
					var replace = JSON.parse(sessionStorage.loginUsers)
					console.log(replace.login)
					replace.login=0;
					replace.usersName=Username;
					console.log(replace.login)
					sessionStorage.loginUsers=JSON.stringify(replace);
					console.log(sessionStorage.Users)
				}
				document.getElementById("loginForm").style.display="inline-block";

				document.getElementById("logInOut").style.display="none";
				document.getElementById("sub-nav").style.display="none";

				document.getElementById("Left-nav").style.display="none";

				document.getElementById("Right-nav").style.display="none";
				rightNav(0);
				leftNav(0,2);
				checkCenterContent();
			}

    };

    xhr.onerror = function() {
    	alert('Woops, there was an error making the request.');
    };
xhr.send();	

}
// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  var url = 'http://updates.html5rocks.com';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}
//document.domain = "localhost";
document.getElementById("connectsteam").onclick = function() { 
steamURL=document.getElementById("steamname").value; 
console.log(steamKEY)
console.log(document.getElementById("steamname").value)  
xhr = createCORSRequest("GET","JS/test.php?userName="+steamURL);
xhr.withCredentials="true"
  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    steamNumber = text
    //console.log(text);
    sessionStorage.setItem("Users",JSON.stringify({"userID":1,"usersNumber":steamNumber}))
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };
xhr.send();
console.log(document.getElementById("steamname").value)
};

function info(usernumber){
	var infopack
		
	xhr = createCORSRequest("GET","JS/userInfo.php?userNumber="+usernumber);
	xhr.withCredentials="true"
  // Response handlers.
  xhr.onreadystatechange = function() {
  	if (xhr.readyState==4 && xhr.status==200){
    var text = xhr.responseText;
    var userInfo = JSON.parse(text);
    //console.log(userInfo);
    //console.log(text.personastate);
    infopack = {"name":userInfo.personaname,"avatar":userInfo.avatar,"personastate":userInfo.personastate};
    //console.log(infopack);
    return infopack;
 	}
  };
  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
  
}

function friendinfo(array){
	var infopack=[]
	var text

	var xhr = [];
        for (i = array.length-1; i >= 0; i--){
            (function (i){
                xhr[i] = new XMLHttpRequest();
                url = "JS/userInfo.php?userNumber="+array[i];
                xhr[i].open("GET", url, true);
                xhr[i].onreadystatechange = function () {

                    if (xhr[i].readyState == 4 && xhr[i].status == 200) {
                        text = xhr[i].responseText;
    					var userInfo = JSON.parse(text);
    					infopack.push({"name":userInfo.personaname,"avatar":userInfo.avatar,"personastate":userInfo.personastate});
    					//console.log(infopack); 
    					friendlist();
                    }
                };
                xhr[i].send();
            })(i);
        }

    function friendlist(){
    var html = "<ul>"

    for (var i = infopack.length - 1; i >= 0; i--) {
    	var logincolour,logintext;
    	if(infopack[i].personastate>=1){
    		logincolour="green"
    		logintext="Online";
    	}else if(infopack[i].personastate==2||infopack[i].personastate==3){
    		logincolour="orange";
    		logintext="Busy";
    		if (infopack[i].personastate==3) {logintext="Away";};
    	}else if(infopack[i].personastate==4){
    		logincolour="blue"
    		logintext = "Snooze"
    	}else{
    		logincolour="red"
    		logintext = "Offline"
    };
    	//if(infopack[i].personastate==1){logintext="online"}else if(infopack[i].personastate==2){logincolour="red"}
    	html+= "<a href='#'><li id='friend"+i+"' class='friends'><img src='"+infopack[i].avatar+" alt='users image'/><p class='friendName'>"+infopack[i].name+"</p><p class='loginin' style = 'background:"+logincolour+"'>"+logintext+"</p></li></a>"
    };
    html+="</ul>"
    if(infopack.length==array.length){
	document.getElementById('Right-nav').innerHTML = html;
	}
  // Response handlers.
}
    
 
 
  xhr.onload = function() {
    
    text = xhr.responseText;
    var userInfo = JSON.parse(text);
    //console.log(userInfo);
    //console.log(text.personastate);
    infopack = {"name":userInfo.personaname,"avatar":userInfo.avatar,"personastate":userInfo.personastate};
    //console.log(infopack);

    
 
  };
  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  }; 
  
}


function friends(userNumber){
	
	var friendInfo,friendinfole;	
	xhr = createCORSRequest("GET","JS/friendInfo.php?userNumber="+userNumber,true);
	xhr.withCredentials="true"
  // Response handlers.
  xhr.onreadystatechange = function() {
  	if (xhr.readyState==4 && xhr.status==200){
    var text = xhr.responseText;
    //console.log(text);
    friendInfo = JSON.parse(text);
    //console.log(friendInfo);
    //console.log(i)
    var steamid = []
    for (var i = friendInfo.length -1; i >= 0; i--) {
    	
    	

    	steamid.push(friendInfo[i].steamid);
    	
    };

    var hi = friendinfo(steamid)
    //console.log(hi)
	//console.log(steamid)
    //allfriendinfo ={"usersfriendsID":i, "info":friendinfo}
    //	console.log(allfriendinfo)
    //console.log(text[1].steamid);
    //friendinfole = friendInfo.length
    
    return friendInfo;
 	}
  };
  
    
  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();


  
}

document.getElementById("connectsteamfriendsinfo").onclick = function() { 
	//friends(steamNumber);
	
}

document.getElementById("connectsteaminfo").onclick = function() { 
steamURL=document.getElementById("steamname").value; 
console.log(steamKEY)
console.log(document.getElementById("steamname").value)  
information=info(steamNumber);
console.log(information);
  };
if(steamNumber==null||steamNumber==undefined){}else{
friends(steamNumber);
}


//http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=4CE44FF7A28EF812AD4421752B047019&vanityurl=tezerw000