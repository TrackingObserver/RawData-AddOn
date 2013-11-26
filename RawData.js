var to_id = "obheeflpdipmaefcoefhimnaihmhpkao";

// Get tracker on current tab as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
	chrome.runtime.sendMessage(to_id, {type : 'getTrackers'},
		function(trackerList) {            
            var html = getHtmlForDomainToType(trackerList);
            var div = document.getElementById("domaintotype");
            div.innerHTML = html;
            
            html = getHtmlForNumbers(trackerList);
            div = document.getElementById("numbers");
            div.innerHTML = html;
	});
    chrome.runtime.sendMessage(to_id, {type : 'getTrackersBySite'},
		function(siteMap) {            
            var html = getHtmlForSiteToTracker(siteMap);
            var div = document.getElementById("sitetotracker");
            div.innerHTML = html;
	});
});

function getHtmlForNumbers(trackerList) {    
	if (!trackerList || trackerList.length == 0) 
        return "No trackers.";
	
	var html = "";

    var count = 0;
    var countA = 0;
    var countB = 0;
    var countC = 0;
    var countD = 0;
    var countE = 0;
    var countF = 0;
    var countG = 0;
    

	for (var trackerDomain in trackerList) {
        var trackerObject = trackerList[trackerDomain];
        count++;
            
        if (trackerObject.categoryList.indexOf("A") != -1) countA++;
        if (trackerObject.categoryList.indexOf("B") != -1) countB++;
        if (trackerObject.categoryList.indexOf("C") != -1) countC++;
        if (trackerObject.categoryList.indexOf("D") != -1) countD++;
        if (trackerObject.categoryList.indexOf("E") != -1) countE++;
        if (trackerObject.categoryList.indexOf("F") != -1) countF++;
        if (trackerObject.categoryList.indexOf("G") != -1) countG++;
    }
    
    html += "Number of unique tracking domains: " + count + "<br><br>";
    
    html += "Numbers per category (a tracker may fall into more than one category):<br>";
    html += "&nbsp;&nbsp;&nbsp;&nbsp;A: " + countA + "<br>";
    html += "&nbsp;&nbsp;&nbsp;&nbsp;B: " + countB + "<br>";
    html += "&nbsp;&nbsp;&nbsp;&nbsp;C: " + countC + "<br>";
    html += "&nbsp;&nbsp;&nbsp;&nbsp;D: " + countD + "<br>";
    html += "&nbsp;&nbsp;&nbsp;&nbsp;E: " + countE + "<br>";
    html += "&nbsp;&nbsp;&nbsp;&nbsp;F: " + countF + "<br>";
    html += "&nbsp;&nbsp;&nbsp;&nbsp;G: " + countG + "<br>";
    

	return html;
}

function getHtmlForDomainToType(trackerList) {
	 if (!trackerList || trackerList.length == 0) 
		return "None.";
	
	var html = "";

	for (var trackerDomain in trackerList) {
        var trackerObject = trackerList[trackerDomain];
            
        html += trackerObject.domain + "&#09;"
        
        var cats = "";
        if (trackerObject.categoryList.indexOf("A") != -1) cats += "A";
        if (trackerObject.categoryList.indexOf("B") != -1) cats += "B";
        if (trackerObject.categoryList.indexOf("C") != -1) cats += "C";
        if (trackerObject.categoryList.indexOf("D") != -1) cats += "D";
        if (trackerObject.categoryList.indexOf("E") != -1) cats += "E";
        if (trackerObject.categoryList.indexOf("F") != -1) cats += "F";
        if (trackerObject.categoryList.indexOf("G") != -1) cats += "G";
        html += cats + "<br>";
    }

	return html;
}

function getHtmlForSiteToTracker(siteMap) {
    var html = "";
    
    for (var siteDomain in siteMap) {
        for (var trackerDomain in siteMap[siteDomain]) {
            html += siteDomain + "&#09;" + trackerDomain;
            
            var catList = siteMap[siteDomain][trackerDomain].categories;
            var categories = "";
            for (var i in catList) {
                categories += catList[i];
            }
            
            html += "&#09;" + categories;
            
            // If category G, print out apiList
            if (categories.indexOf("G") != -1)
            {
                html += "&#09;" + siteMap[siteDomain][trackerDomain].fingerprintApiList.length;
                html += "&#09;" + JSON.stringify(siteMap[siteDomain][trackerDomain].fingerprintApiList);                
            }
            
            
            html += "<br>";
        }    
    }
    
    if (html == "") {
        html = "None.";
    }
    return html;
}
