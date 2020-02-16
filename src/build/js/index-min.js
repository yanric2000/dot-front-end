"use strict";

var x = function x() {
  return "teste";
},
    y = function y() {
  return "segundo teste";
};

y = function y(_ref) {
  var e = _ref.nome;
  return e;
};