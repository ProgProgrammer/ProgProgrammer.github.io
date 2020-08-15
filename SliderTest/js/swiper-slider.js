"use strict";

(function () {
    window.addEventListener('DOMContentLoaded', () => {
        const startSwiper = () =>
        {
            var swiper = new Swiper('.swiper-container.partners', {
                slidesPerView: 4,
                slidesOffsetBefore: 13,
                loop: true,
                grabCursor: true,
                navigation: {
                    nextEl: '.swiper-button-next.partners',
                    prevEl: '.swiper-button-prev.partners'
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1
                    },
                    496: {
                        slidesPerView: 2
                    },
                    656: {
                        slidesPerView: 3
                    },
                    784: {
                        slidesPerView: 4
                    }
                }
            });
        };

        const addMaxWidthSlide = () => {
            const defaultHeightBlock = 50;
            let blocks;
            let sliderImages;
            let widthBlocks;
            let widthBlock;
            let heightBlock;
            let blockProportion;
            blocks = document.querySelectorAll(".slider-block .slider-block-a-div");
            sliderImages = document.querySelectorAll(".slider-block .slider-block-a-div-img");
            widthBlocks = blocks[0].offsetWidth;

            for (let i = 0; i < sliderImages.length; i++) {
                widthBlock = sliderImages[i].offsetWidth;
                heightBlock = sliderImages[i].offsetHeight;
                blockProportion = heightBlock / widthBlock * 100;
                heightBlock = widthBlock / 100 * blockProportion;
                widthBlock = widthBlocks;
                heightBlock = widthBlock / 100 * blockProportion;

                if (heightBlock > defaultHeightBlock) {
                    heightBlock = defaultHeightBlock;
                    widthBlock = heightBlock * (100 / blockProportion);
                }

                sliderImages[i].style.maxWidth = `${widthBlock}px`;
                sliderImages[i].style.height = `${heightBlock}px`;
            }
        };

        startSwiper();
        addMaxWidthSlide();
        window.addEventListener('resize', () => {
            startSwiper();
            setTimeout(() => addMaxWidthSlide(), 50);
        });
    });
})();