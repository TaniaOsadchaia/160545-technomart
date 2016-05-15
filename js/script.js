function showPopup(popup) {
    popup.classList.remove("hidden");

    var btnClose = popup.querySelector(".close-btn");
    btnClose.addEventListener("click", function(event) {
        event.preventDefault();
        hidePopup(popup);
    });

    window.addEventListener("keydown", function(event) {
        if (event.keyCode === 27) {
            hidePopup(popup);
        }
    });
}

function hidePopup(popup) {
    popup.classList.add("hidden");
    popup.classList.remove("popup-error");
}

function createPopupBehaviour(selectorShowBtn, selectorPopup) {
    var btnsShow = document.querySelectorAll(selectorShowBtn);
    for (var i = 0; i < btnsShow.length; i++) {
        var btnShow = btnsShow[i];
        btnShow.addEventListener("click", function(event) {
            event.preventDefault();
            var popup = document.querySelector(selectorPopup);
            showPopup(popup);
        });
    }
}

function fillByStorage(form, storageId, selector) {
    var item = form.querySelector(selector);
    var storageValue = localStorage.getItem(storageId);
    if (storageValue) {
        item.value = storageValue;
    } else {
        item.focus();
    }
}

function createFeedbackBehaviour() {
    var form = document.querySelector(".feedback-form");
    if (!form) return;

    var popup = document.querySelector(".feedback-popup-overlay");
    var btnShow = document.querySelector(".feedback-btn");

    btnShow.addEventListener("click", function(event) {
        event.preventDefault();

        fillByStorage(form, "userMsg", "[name=feedback-content]");
        fillByStorage(form, "userMail", "[name=feedback-mail]");
        fillByStorage(form, "userName", "[name=feedback-name]");

        showPopup(popup);
    });

    form.addEventListener("submit", function(event) {
        var userName = form.querySelector("[name=feedback-name]");
        var userMail = form.querySelector("[name=feedback-mail]");
        var userMsg = form.querySelector("[name=feedback-content]");

        if (!userName.value || !userMail.value || !userMsg.value) {
            event.preventDefault();

            var empties = [];
            if (!userName.value) empties.push("имя");
            if (!userMail.value) empties.push("email");
            if (!userMsg.value) empties.push("текст письма");

            var msg = "Нужно ввести";
            for (var i = 0; i < empties.length; i++) {
                if (i == 0) msg = msg + " " + empties[i];
                else if (i < empties.length - 1) msg = msg + ", " + empties[i];
                else msg = msg + " и " + empties[i];
            }
            console.log(msg);
            popup.classList.remove("modal-error");
            popup.offsetWidth = popup.offsetWidth;
            popup.classList.add("popup-error");
        } else {
            localStorage.setItem("userName", userName.value);
            localStorage.setItem("userMail", userMail.value);
            localStorage.setItem("userMsg", userMsg.value);
        }
    });
}

function showInteractiveMap() {
    YMaps.load(function() {
        // Создание обработчика для события window.onLoad
        YMaps.jQuery(function() {
            // Создание экземпляра карты и его привязка к созданному контейнеру
            var map = new YMaps.Map(YMaps.jQuery("#YMapsID")[0]);

            // Установка для карты ее центра и масштаба
            map.setCenter(new YMaps.GeoPoint(30.319031186477634, 59.93801434640367), 16);

            // Открытие балуна
            map.openBalloon(new YMaps.GeoPoint(30.32282279137667, 59.93865205242114), "Большая Конюшенная ул., 19", {
                hasCloseButton: false
            });

            // Добавление элементов управления
            //map.addControl(new YMaps.TypeControl());
            map.addControl(new YMaps.ToolBar());
            map.addControl(new YMaps.Zoom());
            map.addControl(new YMaps.MiniMap());
            map.addControl(new YMaps.ScaleLine());
            //map.addControl(new YMaps.SearchControl());
        });
    });
}

function createMapBehaviour() {
    var btn = document.querySelector(".map-btn");
    if (!btn) return;

    btn.addEventListener("click", function(event) {
        event.preventDefault();
        var popup = document.querySelector(".map-popup-overlay");
        showPopup(popup);
        showInteractiveMap();
    });
}

function ready(event) {
    createPopupBehaviour(".product-buy-btn", ".basket-popup-overlay");
    createPopupBehaviour(".product-bookmark-btn", ".basket-popup-overlay");
  
    createFeedbackBehaviour();
    createMapBehaviour();
}

document.addEventListener("DOMContentLoaded", ready);