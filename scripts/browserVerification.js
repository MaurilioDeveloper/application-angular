function getBrowserInfo() {

	var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };

}

function verifyUnsupportedBrowser(browserDetails) {

	var version = parseInt(browserDetails.version);
	var name = browserDetails.name.toLowerCase();

	var flagKnownBrowser = (name == 'msie' || name == 'ie' || name == 'firefox' || name == 'safari' || name == 'chrome'); 

	if (!Boolean(flagKnownBrowser)) {
		return true;
	}

	var flagUnsupported = 	((name == 'msie' || name == 'ie') && version < 11) ||
							(name == 'safari' && version < 10) ||
							(name == 'firefox' && version < 52) ||
							(name == 'chrome' && version < 49);

	return Boolean(flagUnsupported);
}

window.onload = function() {

	var browserInfo = getBrowserInfo();
	var browserUnsupport = verifyUnsupportedBrowser(browserInfo);
	
	if (browserUnsupport) {
		// window.location.href = '/browser_not_supported.html';
	}

}