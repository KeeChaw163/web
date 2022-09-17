window.onload = function(){
	myClick("btn01",function(){
		var city = document.getElementById("bj");
		var city = document.getElementById("city");
		city.removeChild(bj);
	});
	myClick("btn02",function(){
		var li = document.createElement("li");
		var gzText = document.createTextNode("广州");
		li.appendChild(gzText);
		var city = document.getElementById("city");
		city.appendChild(li);
	});
	myClick("btn03",function(){
		var li = document.createElement("li");
		var xaText = document.createTextNode("西安");
		li.appendChild(xaText);
		var bj = document.getElementById("sz");
		var city = document.getElementById("city");
		city.replaceChild(li,sz);
	});
	myClick("btn04",function(){
		var li = document.createElement("li");
		var lzText = document.createTextNode("兰州");
		li.appendChild(lzText);
		var sh = document.getElementById("sh");
		var city = document.getElementById("city");
		city.insertBefore(li,sh)
	});
}
function myClick (idStr,fun) {
	var btn = document.getElementById(idStr);
	btn.onclick = fun;
}