const burger = document.querySelector(".burger");
const burger_line_top = document.querySelector(".burger-line-top");
const burger_line_middle = document.querySelector(".burger-line-middle");
const burger_line_bottom = document.querySelector(".burger-line-bottom");
const nav = document.querySelector(".nav");
const buttons = document.getElementsByClassName("button-li-menu");

for (let button of buttons) {
    button.addEventListener('click', closeMenu);
}

burger.addEventListener('click', function() {
    if (nav.classList.contains("open-menu")) {
        closeMenu();
    } else {
        burger_line_top.classList.remove("close-burger-line-top");
        burger_line_middle.classList.remove("close-burger-line-middle");
        burger_line_bottom.classList.remove("close-burger-line-bottom");
        nav.classList.remove("close-menu");
        burger_line_top.classList.add("open-burger-line-top");
        burger_line_middle.classList.add("open-burger-line-middle");
        burger_line_bottom.classList.add("open-burger-line-bottom");
        nav.classList.add("open-menu");
    }
});

function closeMenu() {
    burger_line_top.classList.remove("open-burger-line-top");
    burger_line_middle.classList.remove("open-burger-line-middle");
    burger_line_bottom.classList.remove("open-burger-line-bottom");
    nav.classList.remove("open-menu");
    burger_line_top.classList.add("close-burger-line-top");
    burger_line_middle.classList.add("close-burger-line-middle");
    burger_line_bottom.classList.add("close-burger-line-bottom");
    nav.classList.add("close-menu");
    setTimeout(() => nav.classList.remove("close-menu"), 300);
    setTimeout(() => burger_line_top.classList.remove("close-burger-line-top"), 300);
    setTimeout(() => burger_line_middle.classList.remove("close-burger-line-middle"), 300);
    setTimeout(() => burger_line_bottom.classList.remove("close-burger-line-bottom"), 300);
}