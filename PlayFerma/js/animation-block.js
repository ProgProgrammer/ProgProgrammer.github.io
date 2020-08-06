const main_blocks = document.getElementsByClassName("main-block");

window.addEventListener('scroll', function() {
    for (let i = 0; i < main_blocks.length; i++) {
        const avatarSourceTop = main_blocks[i].getBoundingClientRect().top + window.pageYOffset - window.innerHeight;
        if (window.pageYOffset > avatarSourceTop) {
            const childrens = main_blocks[i].getElementsByClassName("block-icons");
            animationIcons(childrens);
        }
    }
});

function animationIcons(childrens) {
    let delay = 0;
    
    for (let number = 0; number < childrens.length; number++) {
        setTimeout(function() {
            childrens[number].classList.add("margin-right-40");
        }, delay);
        delay += 200;
    }
}

window.onload = function() {
    const childrens = document.getElementsByClassName("block-icons-top");
    animationIcons(childrens);
}

const buttons_slider = document.getElementsByClassName("main-oblique-blocks-block-relative");
const sliders = document.getElementsByClassName("button-slider");
const slider_top = document.querySelector(".main-oblique-blocks-center");

for (let button = 0; button < buttons_slider.length; button++) {
    buttons_slider[button].addEventListener('click', function() {
        const slider = sliders[button];
        animationSliderCycleFor(button);
        animationSlider(slider, button);
    });
}

function animationSlider(slider, button) {
    if (slider.classList.contains("opacity-mode-off")) {
        slider.classList.remove("opacity-mode-off");
        slider.classList.add("opacity-mode-on");
        setTimeout(() => slider.classList.remove("display-none"), 250);
        setTimeout(() => slider.classList.add("display-flex"), 250);
    } else if (slider.classList.contains("off")) {
        slider.classList.remove("off");
        slider.classList.add("opacity-mode-on");
        setTimeout(() => slider.classList.add("display-flex"), 250);
    }
    
    if (slider_top.classList.contains("border-left-blue") && button != 0) {
        slider_top.classList.remove("border-left-blue");
        slider_top.classList.add("border-left-blue-none");
    } else if (slider_top.classList.contains("border-right-blue") && button != 4) {
        slider_top.classList.remove("border-right-blue");
        slider_top.classList.add("border-right-blue-none");
    } else if (slider_top.classList.contains("border-left-on") && button != 0) {
        slider_top.classList.remove("border-left-on");
        slider_top.classList.add("border-left-blue-none");
    }
    
    if (button == 0 && slider_top.classList.contains("border-left-blue-none") ||
        button == 0 && slider_top.classList.contains("border-right-blue-none")) {
        slider_top.classList.remove("border-left-blue-none");
        slider_top.classList.add("border-left-blue");
        slider_top.classList.remove("border-right-blue-none");
    } else if (button == 4 && slider_top.classList.contains("border-right-blue-none") ||
               button == 4 && slider_top.classList.contains("border-left-blue-none")) {
        slider_top.classList.remove("border-right-blue-none");
        slider_top.classList.add("border-right-blue");
        slider_top.classList.remove("border-left-blue-none");
    }
}

function animationSliderCycleFor(button) {
    for (let i = 0; i < sliders.length; i++) {
        if (sliders[i].classList.contains("on") && button != 0) {
            sliders[i].classList.remove("on");
            sliders[i].classList.add("opacity-mode-off");
            setTimeout(() => sliders[i].classList.add("display-none"), 250);
        } else if (sliders[i].classList.contains("opacity-mode-on")) {
            sliders[i].classList.remove("opacity-mode-on");
            sliders[i].classList.add("opacity-mode-off");            
            setTimeout(() => sliders[i].classList.remove("display-flex"), 250);
            setTimeout(() => sliders[i].classList.add("display-none"), 250);
        }
        
        if (buttons_slider[i].classList.contains("opacity-yellow-on")) {     
            buttons_slider[i].classList.remove("opacity-yellow-on");
            buttons_slider[i].classList.add("opacity-yellow-off");
        } else if (buttons_slider[i].classList.contains("on") && button != 0) {
            buttons_slider[i].classList.remove("on");
            buttons_slider[i].classList.add("opacity-yellow-off");
        }
        
        if (buttons_slider[button].classList.contains("opacity-yellow-off")) {
            buttons_slider[button].classList.remove("opacity-yellow-off");
            buttons_slider[button].classList.add("opacity-yellow-on");
        } else if (buttons_slider[button].classList.contains("off")) {
            buttons_slider[button].classList.remove("off");
            buttons_slider[button].classList.add("opacity-yellow-on");
        } else if (buttons_slider[button].classList.contains("opacity-yellow-off") && button == 0) {
            buttons_slider[i].classList.remove("opacity-yellow-off");
            buttons_slider[button].classList.add("opacity-yellow-on");
            slider_top.classList.remove("border-left-blue-none");
            slider_top.classList.add("border-left-blue");
        }
    }
}