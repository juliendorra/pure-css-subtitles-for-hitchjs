(function(){
    var granularity = 250, 
    matches = [], 
    farFuture = new Date().getTime() + (1000 * 60 * 60 * 24 * 2), 
    test; 

    test = function(el,o){
		cTime = el.currentTime * 1000;	
		if(cTime >= o.start && cTime <= o.end ){ 
			return true
		}
		return false;
    };
	
	setInterval(function(){
		var match, i=0, n = 0, hasChanges, entry, rst;
		for(;i<matches.length;i++){
			match = matches[i];
            hasChanges = false;
			for(n in match.dataset){
				if(n.indexOf("mediatime_") == 0){
            		entry = JSON.parse(match.dataset[n]);
	                rst = test(match,entry);
	                if(rst != entry.result){
	                	entry.result = rst;
	                	match.dataset[n] = JSON.stringify(entry); 
	                	hasChanges = true;
	                }
            	}
			}	
			if(hasChanges){
				match.setAttribute('data-media-timeon', new Date().getTime());
			}
		}
	},granularity);

    Hitch.add({
		name: '-media-time',
		base: 'audio,[data-media-timeon],video',
        type: 'selector',
		filter:   function(m,args){
			var times, start, end, simpleKey;
			if(!args){ return; }
			simpleKey = "mediatime_" + args.replace(",","_");
			if(!m.dataset[simpleKey]){ 
				try{
					times = args.split(",");
					start = parseInt(times[0],10);
					end = parseInt(((times.length > 1) ? times[1] : farFuture), 10);
					m.dataset[simpleKey] = JSON.stringify({ start: start, end: end, result: false }); 
				}catch(e){
					return;
				}
			}
			if(matches.indexOf(m) == -1){matches.push(m);}
			//console.log("xx: " + JSON.parse(m.dataset[simpleKey]).result);
			return JSON.parse(m.dataset[simpleKey]).result;	
		}    
    });
}());