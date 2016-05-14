
function createPopupBehaviour(clShowBtn, clPopup)
{
	var btnsShow = document.getElementsByClassName(clShowBtn);
	for (var i = 0; i < btnsShow.length; ++i) 
	{
		var btnShow = btnsShow[i];
		btnShow.addEventListener("click", function(event)
		{
			event.preventDefault();

			var popup = document.getElementsByClassName(clPopup)[0];
			popup.classList.remove("hidden");

			var btnClose = popup.getElementsByClassName("close-btn")[0];
			btnClose.addEventListener("click", function(event)
			{
				event.preventDefault();
				popup.classList.add("hidden");
			});
		});
	}
}

function ready(event) 
{
	createPopupBehaviour("map-btn", "map-popup-overlay");
	createPopupBehaviour("feedback-btn", "feedback-popup-overlay");
	createPopupBehaviour("product-buy-btn", "basket-popup-overlay");
	createPopupBehaviour("product-bookmark-btn", "basket-popup-overlay");
}

document.addEventListener("DOMContentLoaded", ready);