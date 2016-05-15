function showPopup(a){a.classList.remove("hidden");var b=a.querySelector(".close-btn");b.addEventListener("click",function(b){b.preventDefault(),hidePopup(a)}),window.addEventListener("keydown",function(b){27===b.keyCode&&hidePopup(a)})}function hidePopup(a){a.classList.add("hidden"),a.classList.remove("popup-error")}function createPopupBehaviour(a,b){for(var c=document.querySelectorAll(a),d=0;d<c.length;d++){var e=c[d];e.addEventListener("click",function(a){a.preventDefault();var c=document.querySelector(b);showPopup(c)})}}function fillByStorage(a,b,c){var d=a.querySelector(c),e=localStorage.getItem(b);e?d.value=e:d.focus()}function createFeedbackBehaviour(){var a=document.querySelector(".feedback-form");if(a){var b=document.querySelector(".feedback-popup-overlay"),c=document.querySelector(".feedback-btn");c.addEventListener("click",function(c){c.preventDefault(),fillByStorage(a,"userMsg","[name=feedback-content]"),fillByStorage(a,"userMail","[name=feedback-mail]"),fillByStorage(a,"userName","[name=feedback-name]"),showPopup(b)}),a.addEventListener("submit",function(c){var d=a.querySelector("[name=feedback-name]"),e=a.querySelector("[name=feedback-mail]"),f=a.querySelector("[name=feedback-content]");if(d.value&&e.value&&f.value)localStorage.setItem("userName",d.value),localStorage.setItem("userMail",e.value),localStorage.setItem("userMsg",f.value);else{c.preventDefault();var g=[];d.value||g.push("\u0438\u043c\u044f"),e.value||g.push("email"),f.value||g.push("\u0442\u0435\u043a\u0441\u0442 \u043f\u0438\u0441\u044c\u043c\u0430");for(var h="\u041d\u0443\u0436\u043d\u043e \u0432\u0432\u0435\u0441\u0442\u0438",i=0;i<g.length;i++)h=0==i?h+" "+g[i]:i<g.length-1?h+", "+g[i]:h+" \u0438 "+g[i];console.log(h),b.classList.remove("modal-error"),b.offsetWidth=b.offsetWidth,b.classList.add("popup-error")}})}}function showInteractiveMap(){YMaps.load(function(){YMaps.jQuery(function(){var a=new YMaps.Map(YMaps.jQuery("#YMapsID")[0]);a.setCenter(new YMaps.GeoPoint(30.319031186477634,59.93801434640367),16),a.openBalloon(new YMaps.GeoPoint(30.32282279137667,59.93865205242114),"\u0411\u043e\u043b\u044c\u0448\u0430\u044f \u041a\u043e\u043d\u044e\u0448\u0435\u043d\u043d\u0430\u044f \u0443\u043b., 19",{hasCloseButton:!1}),a.addControl(new YMaps.ToolBar),a.addControl(new YMaps.Zoom),a.addControl(new YMaps.MiniMap),a.addControl(new YMaps.ScaleLine)})})}function createMapBehaviour(){var a=document.querySelector(".map-btn");a&&a.addEventListener("click",function(a){a.preventDefault();var b=document.querySelector(".map-popup-overlay");showPopup(b),showInteractiveMap()})}function ready(a){createPopupBehaviour(".product-buy-btn",".basket-popup-overlay"),createPopupBehaviour(".product-bookmark-btn",".basket-popup-overlay"),createFeedbackBehaviour(),createMapBehaviour()}document.addEventListener("DOMContentLoaded",ready);