function showPopup(popup)
{
	popup.classList.remove("hidden");

	var btnClose = popup.querySelector(".close-btn");
	btnClose.addEventListener("click", function(event)
	{
		event.preventDefault();
		popup.classList.add("hidden");
	});
}

function createPopupBehaviour(selectorShowBtn, selectorPopup)
{
	var btnsShow = document.querySelectorAll(selectorShowBtn);
	for (var i = 0; i < btnsShow.length; i++) 
	{
		var btnShow = btnsShow[i];
		btnShow.addEventListener("click", function(event)
		{
			event.preventDefault();
			var popup = document.querySelector(selectorPopup);
			showPopup(popup);
		});
	}
}

function fillByStorage(form, storageId, selector)
{
	var storageValue = localStorage.getItem(storageId);
	if (storageValue)
	{
		var item = form.querySelector(selector);
		item.value = storageValue;
	}
}

function createFeedbackBehaviour()
{
	var form = document.querySelector(".feedback-form");
	if (!form) return;
	
	var btnShow = document.querySelector(".feedback-btn");
	btnShow.addEventListener("click", function(event)
	{
		event.preventDefault();
		var popup = document.querySelector(".feedback-popup-overlay");
		
		fillByStorage(form, "userName", "[name=feedback-name]");
		fillByStorage(form, "userMail", "[name=feedback-mail]");
		fillByStorage(form, "userMsg", "[name=feedback-content]");
		
		showPopup(popup);
	});
	
	form.addEventListener("submit", function(event) 
	{
		var userName = form.querySelector("[name=feedback-name]");
		var userMail = form.querySelector("[name=feedback-mail]");
		var userMsg = form.querySelector("[name=feedback-content]");
		
		if (!userName.value || !userMail.value || !userMsg.value)
		{
			event.preventDefault();
			
			var empties = [];
			if (!userName.value) empties.push("имя");
			if (!userMail.value) empties.push("email");
			if (!userMsg.value) empties.push("текст письма");
			
			var msg = "Нужно ввести";
			for (var i = 0; i < empties.length; i++)
			{
				if (i == 0) msg = msg + " " + empties[i];
				else if (i < empties.length - 1) msg = msg + ", " + empties[i];
				else msg = msg + " и " + empties[i];
			}					   
			console.log(msg);
		}
		else
		{
        	localStorage.setItem("userName", userName.value);
        	localStorage.setItem("userMail", userMail.value);
        	localStorage.setItem("userMsg", userMsg.value);
        }
    });
}

function ready(event) 
{
	createPopupBehaviour(".map-btn", ".map-popup-overlay");
	createPopupBehaviour(".product-buy-btn", ".basket-popup-overlay");
	createPopupBehaviour(".product-bookmark-btn", ".basket-popup-overlay");
	
	createFeedbackBehaviour();
}

document.addEventListener("DOMContentLoaded", ready);