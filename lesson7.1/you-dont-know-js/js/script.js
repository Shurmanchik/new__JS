"use strict";

let books = document.querySelectorAll(".books"),
  book = document.querySelectorAll(".book"),
  title = document.querySelectorAll("a"),
  advertising = document.querySelector(".adv");

books[0].appendChild(book[2]);
books[0].insertBefore(book[0], book[3]);
books[0].insertBefore(book[4], book[3]);

document.body.setAttribute(
  "style",
  "background-image: url(image/you-dont-know-js.jpg)"
);
title[4].innerHTML = "Книга 3. this и Прототипы Объектов";

advertising.classList.remove("adv");

let list = book[0].querySelector("ul"),
  listElements = book[0].querySelectorAll("li");

list.insertBefore(listElements[2], listElements[10]);
list.insertBefore(listElements[6], listElements[4]);
list.insertBefore(listElements[7], listElements[9]);
list.insertBefore(listElements[8], listElements[4]);

let list5 = book[5].querySelector("ul"),
  listElements5 = book[5].querySelectorAll("li");

list5.insertBefore(listElements5[9], listElements5[2]);
list5.insertBefore(listElements5[5], listElements5[8]);
list5.insertBefore(listElements5[2], listElements5[6]);

let list6 = book[2].querySelector("ul"),
  listElements6 = book[2].querySelectorAll("li"),
  newElements = document.createElement("li");

newElements.textContent = "Глава 8: За пределами ES6";

list6.insertBefore(newElements, listElements6[9]);

console.log(list);
console.log(book);
