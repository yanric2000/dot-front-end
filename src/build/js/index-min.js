"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function addFixedHeightToDropdown(e) {
  if ("object" == _typeof(e.classList)) {
    var t = $(e).find(".content").get(0),
        n = t.parentElement,
        o = t.offsetHeight;
    n.style.height = o + "px";
  }
}

function removeFixedHeightFromDropdown(e) {
  "object" == _typeof(e.classList) && ($(e).find(".content-container").get(0).style.height = "");
}

function resetAllDropdowns() {
  for (var e, t = $(".dropdown-section .dropdowns-container .dropdown"), n = t.length, o = 0; o < n; o++) {
    removeFixedHeightFromDropdown(e = t[o]), removeClass(e, "active");
  }
}

function addClass(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "active";
  if ("object" != _typeof(e) || "object" != _typeof(e.classList)) return !1;
  e.classList.add(t);
}

function removeClass(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "active";
  if ("object" != _typeof(e) || "object" != _typeof(e.classList)) return !1;
  e.classList.remove(t);
}

function controlClass(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "active";
  if ("object" != _typeof(e) || "object" != _typeof(e.classList)) return !1;
  e.classList.contains(t) ? e.classList.remove(t) : e.classList.add(t);
}

function disableButton(e) {
  $(e).find("button[type=submit]").attr("disabled", !0);
}

function enableButton(e) {
  $(e).find("button[type=submit]").attr("disabled", !1);
}

function sendMail() {
  return !0;
}

function isNameValid(e) {
  return null != e && e.length > 2 && e.length < 31;
}

function isEmailValid(e) {
  if (null == e) return !1;
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(String(e).toLowerCase());
}

function isPhoneValid(e) {
  if (null == e) return !1;
  return e = e.match(/\d+/g).join(""), /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(e);
}

function isMessageValid(e) {
  return null != e && e.length > 9 && name.length < 531;
}

function isFormValid(e) {
  var t = $(e).find("input[name=name]").get(0),
      n = $(e).find("input[name=phone]").get(0),
      o = $(e).find("input[name=email]").get(0),
      i = $(e).find("textarea").get(0);
  return isNameValid(t.value) ? isEmailValid(o.value) ? isPhoneValid(n.value) ? !!isMessageValid(i.value) || (addClass(i, "error"), toastr.warning("Sua mensagem deve conter entre 10 e 150 caracteres"), !1) : (addClass(n, "error"), toastr.warning("Telefone inválido"), !1) : (addClass(o, "error"), toastr.warning("Email inválido"), !1) : (addClass(t, "error"), toastr.warning("Nome deve coner entre 3 e 30 caracteres"), !1);
}

function isScrolledIntoView(e) {
  var t = $(window).scrollTop(),
      n = t + $(window).height(),
      o = $(e).offset().top,
      i = o + $(e).height();
  return console.log(e), console.log(i <= n && o >= t), i <= n && o >= t;
}

$(window).on("scroll", function (e) {
  for (var t = $(".anime"), n = t.length, o = 0; o < n; o++) {
    var i = t[o];
    isScrolledIntoView(i) && addClass(i, "anime-init");
  }
}), $(".big-banner .carroussel").slick({
  infinite: !1,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: !1,
  dots: !0
}), $(".container-multiple-slides .carroussel").slick({
  infinite: !0,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: !1,
  dots: !1,
  draggable: !1,
  responsive: [{
    breakpoint: 1280,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
      infinite: !1,
      dots: !1
    }
  }, {
    breakpoint: 1e3,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: !1,
      dots: !1
    }
  }]
}), $(".container-multiple-slides .arrows .prev").on("click", function () {
  $(".container-multiple-slides .carroussel").slick("slickPrev");
}), $(".container-multiple-slides .arrows .next").on("click", function () {
  $(".container-multiple-slides .carroussel").slick("slickNext");
}), $(".dropdown-section .dropdowns-container .dropdown header").on("click", function (e) {
  e.preventDefault();
  var t = e.currentTarget.parentElement;
  t.classList.contains("active") ? (removeFixedHeightFromDropdown(t), removeClass(t, "active")) : (resetAllDropdowns(), addFixedHeightToDropdown(t), addClass(t, "active"));
}), $(".phone-with-ddd").mask("(00) 0000-0000"), $("#contact-form").on("keypress", "input.error", function () {
  removeClass(this, "error");
}), $("#contact-form").on("keypress", "textarea.error", function () {
  removeClass(this, "error");
}), $("#contact-form").on("keydown", "textarea", function (e) {
  if (this.value.length >= 530 && 8 !== e.keyCode && 46 !== e.keyCode) return toastr.warning("Você atingiu o limite de caracteres"), e.stopImmediatePropagation(), this.value = this.value.substring(0, 530), !1;
}), $("#contact-form").on("submit", function (e) {
  e.preventDefault();
  return disableButton(this), 1 != isFormValid(this) ? (enableButton(this), !1) : (enableButton(this), toastr.options.progressBar = !0, toastr.success("Retornaremos em breve", "E-mail enviado"), !0);
});