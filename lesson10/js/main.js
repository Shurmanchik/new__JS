"use strict";

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.create = function (text) {
  if (this.selector[0] === ".") {
    this.el = document.createElement("div");
    this.el.classList.add(this.selector);
    document.body.appendChild(this.el);
  }
  if (this.selector[0] === "#") {
    this.el = document.createElement("p");
    this.el.classList.add(this.selector);
    document.body.appendChild(this.el);
  }
  this.el.style.cssText =
    "height: " +
    this.height +
    "px; " +
    "width: " +
    this.width +
    "px; " +
    "background: " +
    this.bg +
    ";" +
    " font-size: " +
    this.fontSize +
    ";";
  this.el.textContent = text;
};

let test = new DomElement("#new", 100, 400, "#cddffd", 26);
test.create("Hello World!");
