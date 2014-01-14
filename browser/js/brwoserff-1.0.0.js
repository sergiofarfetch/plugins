/*! browserff.js v1.0.0: Native Javascript Browser and OS detection 
Adds classes to the HTML element */
// This script sets OSName variable as follows:
// "win"        for all versions of Windows
// "mac"        for all versions of Macintosh OS
// "linux"      for all versions of Linux
// "unix"       for all other UNIX flavors
// "ipad"       for all ipad
// "ipod"       for all ipods
// "iphone"     for all iphones
// "android"    for all Android
// "unknown-os" indicates failure to detect the OS


var ffbrowser = ffbrowser || {};
    ffbrowser.nVer = navigator.appVersion;
    ffbrowser.nAgt = navigator.userAgent;
    ffbrowser.browserName = navigator.appName;
    ffbrowser.browserClass = "";
    ffbrowser.fullVersion = ''+parseFloat(navigator.appVersion);
    ffbrowser.majorVersion= parseInt(navigator.appVersion,10);
    ffbrowser.nameOffset = "";
    ffbrowser.verOffset = "";
    ffbrowser.ix = "";
    ffbrowser.os = "unknown-os";

//GET THE OS
if (navigator.appVersion.indexOf("Win")!=-1) ffbrowser.os="win";
if (navigator.appVersion.indexOf("Mac")!=-1) ffbrowser.os="mac";
if (navigator.appVersion.indexOf("X11")!=-1) ffbrowser.os="unix";
if (navigator.appVersion.indexOf("Linux")!=-1) ffbrowser.os="linux";
if (navigator.userAgent.match(/iPad/i) !== null) ffbrowser.os="ipad";
if (navigator.userAgent.match(/iPod/i) !== null) ffbrowser.os="ipod";
if (navigator.userAgent.match(/iPhone/i) !== null) ffbrowser.os="iphone";
if (navigator.userAgent.match(/Android/i) !== null) ffbrowser.os="android";

// In Opera, the true version is after "Opera" or after "Version"
if ((ffbrowser.verOffset=ffbrowser.nAgt.indexOf("Opera"))!=-1) {
 ffbrowser.browserName = "opera";
 ffbrowser.fullVersion = ffbrowser.nAgt.substring(ffbrowser.verOffset+6);
 if ((ffbrowser.verOffset=ffbrowser.nAgt.indexOf("Version"))!=-1)
   ffbrowser.fullVersion = ffbrowser.nAgt.substring(ffbrowser.verOffset+8);
}

// In MSIE, the true version is after "MSIE" in userAgent
else if ((ffbrowser.verOffset=ffbrowser.nAgt.indexOf("MSIE"))!=-1) {
 ffbrowser.browserName = "msie";
 ffbrowser.fullVersion = ffbrowser.nAgt.substring(ffbrowser.verOffset+5);
}

// In Chrome, the true version is after "Chrome"
else if ((ffbrowser.verOffset=ffbrowser.nAgt.indexOf("Chrome"))!=-1) {
 ffbrowser.browserName = "chrome";
 ffbrowser.fullVersion = ffbrowser.nAgt.substring(ffbrowser.verOffset+7);
}

// In Safari, the true version is after "Safari" or after "Version"
else if ((ffbrowser.verOffset=ffbrowser.nAgt.indexOf("Safari"))!=-1) {
 ffbrowser.browserName = "safari";
 ffbrowser.fullVersion = ffbrowser.nAgt.substring(ffbrowser.verOffset+7);
 if ((ffbrowser.verOffset=ffbrowser.nAgt.indexOf("Version"))!=-1)
   ffbrowser.fullVersion = ffbrowser.nAgt.substring(ffbrowser.verOffset+8);
}

// In Firefox, the true version is after "Firefox"
else if ((ffbrowser.verOffset=ffbrowser.nAgt.indexOf("Firefox"))!=-1) {
 ffbrowser.browserName = "firefox";
 ffbrowser.fullVersion = ffbrowser.nAgt.substring(ffbrowser.verOffset+8);
}

// In most other browsers, "name/version" is at the end of userAgent
else if ( (ffbrowser.nameOffset =ffbrowser.nAgt.lastIndexOf(' ')+1) <(ffbrowser.verOffset=ffbrowser.nAgt.lastIndexOf('/')))
{
 ffbrowser.browserName = ffbrowser.nAgt.substring(ffbrowser.nameOffset ,ffbrowser.verOffset);
 ffbrowser.fullVersion = ffbrowser.nAgt.substring(ffbrowser.verOffset+1);
 if (ffbrowser.browserName.toLowerCase()==ffbrowser.browserName.toUpperCase()) {
  ffbrowser.browserName = navigator.appName;
 }
}

// trim the ffbrowser.fullVersion string at semicolon/space if present
if ((ffbrowser.ix=ffbrowser.fullVersion.indexOf(";"))!=-1)
   ffbrowser.fullVersion=ffbrowser.fullVersion.substring(0,ffbrowser.ix);
if ((ffbrowser.ix=ffbrowser.fullVersion.indexOf(" "))!=-1)
   ffbrowser.fullVersion=ffbrowser.fullVersion.substring(0,ffbrowser.ix);

ffbrowser.majorVersion = parseInt(''+ffbrowser.fullVersion,10);

if (isNaN(ffbrowser.majorVersion)) {
 ffbrowser.fullVersion  = ''+parseFloat(navigator.appVersion);
 ffbrowser.majorVersion = parseInt(navigator.appVersion,10);
}

//If the broser is IE we add some special classes like HTML5 boilerplate does
if(ffbrowser.browserName === "msie"){
  ffbrowser.browserClass = "msie";
  if(ffbrowser.majorVersion===7){
    ffbrowser.browserClass=" lt-ie10 lt-ie9 lt-ie8";
  }else{
    if(ffbrowser.majorVersion===8){
       ffbrowser.browserClass=" lt-ie10 lt-ie9";
    }else{
      if(ffbrowser.majorVersion===9){
       ffbrowser.browserClass=" lt-ie10";
      }else{
        if(ffbrowser.majorVersion===10){
          ffbrowser.browserClass=" ie10";
        }else{
          ffbrowser.browserClass=" gt-ie10";
        }
      }
    }
  }
}else{
   ffbrowser.browserClass = ffbrowser.browserName+ffbrowser.majorVersion;
}

//And we add those classes to the HTML element
document.documentElement.className += " " +ffbrowser.browserName+" " +ffbrowser.browserClass+" "+ffbrowser.os;
