const header = document.querySelector(".header");
const main_block_top = document.querySelector(".main-block-top");

window.onscroll = function() {
    const avatarSourceBottom = main_block_top.getBoundingClientRect().bottom + window.pageYOffset;
    const mql = window.matchMedia('all and (min-width: 1025px)');
    if (mql.matches) {
        if (window.pageYOffset > avatarSourceBottom) {
            header.classList.add("menu-fixed");
        } else {
            header.classList.remove("menu-fixed");
        }
    }
};