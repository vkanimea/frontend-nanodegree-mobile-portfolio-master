(function(){
'use strict';function logCRP(){var a=window.performance.timing,b=a.domContentLoadedEventStart-a.domLoading,a=a.domComplete-a.domLoading;document.getElementById("crp-stats").textContent="DCL: "+b+"ms, onload: "+a+"ms"}window.addEventListener("load",function(a){logCRP()});
}).call(this)
