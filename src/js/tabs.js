export * from "./tabs";

const tabBtn = document.querySelectorAll(".tab__btn");
const tabContents = document.querySelectorAll(".tab__item");

tabBtn.forEach(function (element) {
  element.addEventListener("click", openTabs);
});

function openTabs(evt) {
  const btnTarget = evt.currentTarget;
  const item = btnTarget.dataset.item;

  tabContents.forEach(function (item) {
    item.classList.remove("tab__item--active");
  });

  tabBtn.forEach(function (item) {
    item.classList.remove("tab__btn--active");
  });

  document.querySelector(`#${item}`).classList.add("tab__item--active");

  btnTarget.classList.add("tab__btn--active");
}
