"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.findInternal = function (t, a, e) {
  t instanceof String && (t = String(t));

  for (var n = t.length, s = 0; s < n; s++) {
    var r = t[s];
    if (a.call(e, r, s, t)) return {
      i: s,
      v: r
    };
  }

  return {
    i: -1,
    v: void 0
  };
}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.SIMPLE_FROUND_POLYFILL = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (t, a, e) {
  t != Array.prototype && t != Object.prototype && (t[a] = e.value);
}, $jscomp.getGlobal = function (t) {
  return "undefined" != typeof window && window === t ? t : "undefined" != typeof global && null != global ? global : t;
}, $jscomp.global = $jscomp.getGlobal(void 0), $jscomp.polyfill = function (t, a, e, n) {
  if (a) {
    for (e = $jscomp.global, t = t.split("."), n = 0; n < t.length - 1; n++) {
      var s = t[n];
      s in e || (e[s] = {}), e = e[s];
    }

    (a = a(n = e[t = t[t.length - 1]])) != n && null != a && $jscomp.defineProperty(e, t, {
      configurable: !0,
      writable: !0,
      value: a
    });
  }
}, $jscomp.polyfill("Array.prototype.find", function (t) {
  return t || function (t, a) {
    return $jscomp.findInternal(this, t, a).v;
  };
}, "es6", "es3"), function (t, a, e) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" == typeof Meteor ? module.exports = t(require("jquery")) : t(a || e);
}(function (t) {
  var a = function a(_a, e, n) {
    var s = {
      invalid: [],
      getCaret: function getCaret() {
        try {
          var t = 0,
              e = _a.get(0),
              n = document.selection,
              r = e.selectionStart;

          if (n && -1 === navigator.appVersion.indexOf("MSIE 10")) {
            var o = n.createRange();
            o.moveStart("character", -s.val().length), t = o.text.length;
          } else (r || "0" === r) && (t = r);

          return t;
        } catch (t) {}
      },
      setCaret: function setCaret(t) {
        try {
          if (_a.is(":focus")) {
            var e = _a.get(0);

            if (e.setSelectionRange) e.setSelectionRange(t, t);else {
              var n = e.createTextRange();
              n.collapse(!0), n.moveEnd("character", t), n.moveStart("character", t), n.select();
            }
          }
        } catch (t) {}
      },
      events: function events() {
        _a.on("keydown.mask", function (t) {
          _a.data("mask-keycode", t.keyCode || t.which), _a.data("mask-previus-value", _a.val()), _a.data("mask-previus-caret-pos", s.getCaret()), s.maskDigitPosMapOld = s.maskDigitPosMap;
        }).on(t.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", s.behaviour).on("paste.mask drop.mask", function () {
          setTimeout(function () {
            _a.keydown().keyup();
          }, 100);
        }).on("change.mask", function () {
          _a.data("changed", !0);
        }).on("blur.mask", function () {
          i === s.val() || _a.data("changed") || _a.trigger("change"), _a.data("changed", !1);
        }).on("blur.mask", function () {
          i = s.val();
        }).on("focus.mask", function (a) {
          !0 === n.selectOnFocus && t(a.target).select();
        }).on("focusout.mask", function () {
          n.clearIfNotMatch && !r.test(s.val()) && s.val("");
        });
      },
      getRegexMask: function getRegexMask() {
        for (var t, a, n, s, r = [], i = 0; i < e.length; i++) {
          (t = o.translation[e.charAt(i)]) ? (a = t.pattern.toString().replace(/.{1}$|^.{1}/g, ""), n = t.optional, (t = t.recursive) ? (r.push(e.charAt(i)), s = {
            digit: e.charAt(i),
            pattern: a
          }) : r.push(n || t ? a + "?" : a)) : r.push(e.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
        }

        return r = r.join(""), s && (r = r.replace(new RegExp("(" + s.digit + "(.*" + s.digit + ")?)"), "($1)?").replace(new RegExp(s.digit, "g"), s.pattern)), new RegExp(r);
      },
      destroyEvents: function destroyEvents() {
        _a.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "));
      },
      val: function val(t) {
        var e = _a.is("input") ? "val" : "text";
        return 0 < arguments.length ? (_a[e]() !== t && _a[e](t), e = _a) : e = _a[e](), e;
      },
      calculateCaretPosition: function calculateCaretPosition(t) {
        var e = s.getMasked(),
            n = s.getCaret();

        if (t !== e) {
          var r = _a.data("mask-previus-caret-pos") || 0;
          e = e.length;
          var o,
              i = t.length,
              l = t = 0,
              c = 0,
              u = 0;

          for (o = n; o < e && s.maskDigitPosMap[o]; o++) {
            l++;
          }

          for (o = n - 1; 0 <= o && s.maskDigitPosMap[o]; o--) {
            t++;
          }

          for (o = n - 1; 0 <= o; o--) {
            s.maskDigitPosMap[o] && c++;
          }

          for (o = r - 1; 0 <= o; o--) {
            s.maskDigitPosMapOld[o] && u++;
          }

          n > i ? n = 10 * e : r >= n && r !== i ? s.maskDigitPosMapOld[n] || (r = n, n = n - (u - c) - t, s.maskDigitPosMap[n] && (n = r)) : n > r && (n = n + (c - u) + l);
        }

        return n;
      },
      behaviour: function behaviour(e) {
        e = e || window.event, s.invalid = [];

        var n = _a.data("mask-keycode");

        if (-1 === t.inArray(n, o.byPassKeys)) {
          n = s.getMasked();
          var r = s.getCaret(),
              i = _a.data("mask-previus-value") || "";
          return setTimeout(function () {
            s.setCaret(s.calculateCaretPosition(i));
          }, t.jMaskGlobals.keyStrokeCompensation), s.val(n), s.setCaret(r), s.callbacks(e);
        }
      },
      getMasked: function getMasked(t, a) {
        var r,
            i = [],
            l = void 0 === a ? s.val() : a + "",
            c = 0,
            u = e.length,
            p = 0,
            f = l.length,
            d = 1,
            v = "push",
            k = -1,
            m = 0;

        if (a = [], n.reverse) {
          v = "unshift", d = -1;
          var h = 0;
          c = u - 1, p = f - 1;

          var g = function g() {
            return -1 < c && -1 < p;
          };
        } else h = u - 1, g = function g() {
          return c < u && p < f;
        };

        for (; g();) {
          var M = e.charAt(c),
              y = l.charAt(p),
              b = o.translation[M];
          b ? (y.match(b.pattern) ? (i[v](y), b.recursive && (-1 === k ? k = c : c === h && c !== k && (c = k - d), h === k && (c -= d)), c += d) : y === r ? (m--, r = void 0) : b.optional ? (c += d, p -= d) : b.fallback ? (i[v](b.fallback), c += d, p -= d) : s.invalid.push({
            p: p,
            v: y,
            e: b.pattern
          }), p += d) : (t || i[v](M), y === M ? (a.push(p), p += d) : (r = M, a.push(p + m), m++), c += d);
        }

        return t = e.charAt(h), u !== f + 1 || o.translation[t] || i.push(t), i = i.join(""), s.mapMaskdigitPositions(i, a, f), i;
      },
      mapMaskdigitPositions: function mapMaskdigitPositions(t, a, e) {
        for (t = n.reverse ? t.length - e : 0, s.maskDigitPosMap = {}, e = 0; e < a.length; e++) {
          s.maskDigitPosMap[a[e] + t] = 1;
        }
      },
      callbacks: function callbacks(t) {
        var r = s.val(),
            o = r !== i,
            l = [r, t, _a, n],
            c = function c(t, a, e) {
          "function" == typeof n[t] && a && n[t].apply(this, e);
        };

        c("onChange", !0 === o, l), c("onKeyPress", !0 === o, l), c("onComplete", r.length === e.length, l), c("onInvalid", 0 < s.invalid.length, [r, t, _a, s.invalid, n]);
      }
    };
    _a = t(_a);
    var r,
        o = this,
        i = s.val();
    e = "function" == typeof e ? e(s.val(), void 0, _a, n) : e, o.mask = e, o.options = n, o.remove = function () {
      var t = s.getCaret();
      return o.options.placeholder && _a.removeAttr("placeholder"), _a.data("mask-maxlength") && _a.removeAttr("maxlength"), s.destroyEvents(), s.val(o.getCleanVal()), s.setCaret(t), _a;
    }, o.getCleanVal = function () {
      return s.getMasked(!0);
    }, o.getMaskedVal = function (t) {
      return s.getMasked(!1, t);
    }, o.init = function (i) {
      if (i = i || !1, n = n || {}, o.clearIfNotMatch = t.jMaskGlobals.clearIfNotMatch, o.byPassKeys = t.jMaskGlobals.byPassKeys, o.translation = t.extend({}, t.jMaskGlobals.translation, n.translation), o = t.extend(!0, {}, o, n), r = s.getRegexMask(), i) s.events(), s.val(s.getMasked());else {
        n.placeholder && _a.attr("placeholder", n.placeholder), _a.data("mask") && _a.attr("autocomplete", "off"), i = 0;

        for (var l = !0; i < e.length; i++) {
          var c = o.translation[e.charAt(i)];

          if (c && c.recursive) {
            l = !1;
            break;
          }
        }

        l && _a.attr("maxlength", e.length).data("mask-maxlength", !0), s.destroyEvents(), s.events(), i = s.getCaret(), s.val(s.getMasked()), s.setCaret(i);
      }
    }, o.init(!_a.is("input"));
  };

  t.maskWatchers = {};

  var e = function e() {
    var e = t(this),
        s = {},
        r = e.attr("data-mask");
    if (e.attr("data-mask-reverse") && (s.reverse = !0), e.attr("data-mask-clearifnotmatch") && (s.clearIfNotMatch = !0), "true" === e.attr("data-mask-selectonfocus") && (s.selectOnFocus = !0), n(e, r, s)) return e.data("mask", new a(this, r, s));
  },
      n = function n(a, e, _n) {
    _n = _n || {};
    var s = t(a).data("mask"),
        r = JSON.stringify;
    a = t(a).val() || t(a).text();

    try {
      return "function" == typeof e && (e = e(a)), "object" != _typeof(s) || r(s.options) !== r(_n) || s.mask !== e;
    } catch (t) {}
  },
      s = function s(t) {
    var a = document.createElement("div"),
        e = (t = "on" + t) in a;
    return e || (a.setAttribute(t, "return;"), e = "function" == typeof a[t]), e;
  };

  t.fn.mask = function (e, s) {
    s = s || {};
    var r = this.selector,
        o = t.jMaskGlobals,
        i = o.watchInterval;
    o = s.watchInputs || o.watchInputs;

    var l = function l() {
      if (n(this, e, s)) return t(this).data("mask", new a(this, e, s));
    };

    return t(this).each(l), r && "" !== r && o && (clearInterval(t.maskWatchers[r]), t.maskWatchers[r] = setInterval(function () {
      t(document).find(r).each(l);
    }, i)), this;
  }, t.fn.masked = function (t) {
    return this.data("mask").getMaskedVal(t);
  }, t.fn.unmask = function () {
    return clearInterval(t.maskWatchers[this.selector]), delete t.maskWatchers[this.selector], this.each(function () {
      var a = t(this).data("mask");
      a && a.remove().removeData("mask");
    });
  }, t.fn.cleanVal = function () {
    return this.data("mask").getCleanVal();
  }, t.applyDataMask = function (a) {
    ((a = a || t.jMaskGlobals.maskElements) instanceof t ? a : t(a)).filter(t.jMaskGlobals.dataMaskAttr).each(e);
  }, s = {
    maskElements: "input,td,span,div",
    dataMaskAttr: "*[data-mask]",
    dataMask: !0,
    watchInterval: 300,
    watchInputs: !0,
    keyStrokeCompensation: 10,
    useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && s("input"),
    watchDataMask: !1,
    byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
    translation: {
      0: {
        pattern: /\d/
      },
      9: {
        pattern: /\d/,
        optional: !0
      },
      "#": {
        pattern: /\d/,
        recursive: !0
      },
      A: {
        pattern: /[a-zA-Z0-9]/
      },
      S: {
        pattern: /[a-zA-Z]/
      }
    }
  }, t.jMaskGlobals = t.jMaskGlobals || {}, (s = t.jMaskGlobals = t.extend(!0, {}, s, t.jMaskGlobals)).dataMask && t.applyDataMask(), setInterval(function () {
    t.jMaskGlobals.watchDataMask && t.applyDataMask();
  }, s.watchInterval);
}, window.jQuery, window.Zepto);