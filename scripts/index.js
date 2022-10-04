function pad(n){return n < 10 ? '0' + n : n;}
function formTime(t){
	var d=t/(24*60*60*1000);
	d=Math.floor(d);
	t=t%(24*60*60*1000);
	var h=t/(60*60*1000);
	h=Math.floor(h);
	t=t%(60*60*1000);
	var m=t/(60*1000);
	m=Math.floor(m);
	t=t%(60*1000);
	var s=t/(1000);
	s=Math.floor(s);
	t=t%(1000);
	return [d,pad(h),pad(m),pad(s)].join(":");
}
function timerUpdate(){
	let label=document.getElementsByClassName("timer")[0].childNodes[5];
	let dateA=new Date("September 22, 2022 10:00:00");
	let diff=(Date.now()-dateA.getTime());
	label.innerHTML=formTime(diff);
}
setInterval(timerUpdate,1000);