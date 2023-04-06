export * from "./main";

const menuBtn = document.querySelector(".icon-menu");
const menu = document.querySelector(".menu");
const headerTop = document.querySelector(".header__top");
const body = document.querySelector("body");

menuBtn.addEventListener("click", function () {
  menuBtn.classList.toggle("active");
  menu.classList.toggle("active");

  // проверяем, есть ли у меню класс "active"
  if (menu.classList.contains("active")) {
    headerTop.style.display = "none"; // скрываем headerTop
    body.classList.add("no-scroll");
  } else {
    headerTop.style.display = "flex"; // показываем headerTop
    body.classList.remove("no-scroll");
  }
});

window.addEventListener("scroll", () => {
  // текущая позиция вертикальной прокрутки
  const scrollPosition = window.scrollY;
  if (scrollPosition >= 100 && !menu.classList.contains("active")) {
    headerTop.classList.add("header__top-scroll");
  } else {
    headerTop.classList.remove("header__top-scroll");
  }
});
