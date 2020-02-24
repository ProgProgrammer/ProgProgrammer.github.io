import { mobileSliderObject } from "./libraryMobileSlider.js";

(function ()
{
    let mainBlock;
    let mobileBlock;
    let staticBlocks;
    let timing;
    let arrows;
    let autoTiming;
    let pagination;
    let autoDirection;
    let dataPagination;
    let bullet;
    let obj = {};
    obj.sliderInterval;
    obj.widthTransform = 0;
    obj.paginationBullet = 0;
    
    window.addEventListener('DOMContentLoaded', ()=>
    {
        mainBlock = document.querySelector(".window");
        timing = mainBlock.dataset.timing;
        autoTiming = mainBlock.dataset.autoTiming;
        autoDirection = mainBlock.dataset.autoDirection;
        dataPagination = mainBlock.dataset.pagination;
        mobileBlock = document.querySelector(".window-block");
        staticBlocks = document.querySelectorAll(".window-blocks");
        pagination = document.querySelector(".window-block-pagination");
        bullet = pagination.querySelector(".window-block-pagination-block-bullet");
        obj.staticBlocksLength = staticBlocks.length;
        arrows = document.querySelectorAll(".arrow");
        
        if (timing !== "")
        {
            mobileBlock.style.transitionDuration = timing + "ms";
        }
        else
        {
            timing = 500;
            mobileBlock.style.transitionDuration = timing + "ms";
        }
        
        createSlider(mainBlock, timing, mobileBlock, arrows);
        
        if (dataPagination === "yes")
        {
            if (staticBlocks.length > 1)
            {
                createPagination(staticBlocks, pagination, bullet);
            }
        }
        
        window.addEventListener('resize', ()=> 
        {
            createSlider(mainBlock, timing, mobileBlock, arrows);
        });
        
        for (let i = 0; i < arrows.length; i++)
        {
            arrows[i].addEventListener('click', ()=> {
                staticBlocks = document.querySelectorAll(".window-blocks");
                clearInterval(obj.sliderInterval);
                clearInterval(obj.sliderInterval);
                mobileSliderObject.mobileSlider(i, mobileBlock, staticBlocks, timing, mainBlock, obj);
                sliderInterval(autoDirection, autoTiming, mobileBlock, timing, mainBlock);
            });            
        }
        
        sliderInterval(autoDirection, autoTiming, mobileBlock, timing, mainBlock);
        
    });
    
    const createSlider = (mainBlock, timing, mobileBlock, arrows) =>
    {
        let widthBlock;
        staticBlocks = document.querySelectorAll(".window-blocks");
        const widthMainblock = mainBlock.offsetWidth;
        const heightMainblock = mainBlock.offsetHeight;
        
        for (let i = 0; i < staticBlocks.length; i++)
        {
            staticBlocks[i].style.width = widthMainblock + "px";
            staticBlocks[i].style.height = heightMainblock + "px";
        }
        
        for (let a = 0; a < staticBlocks.length; a++)
        {
            widthBlock = staticBlocks[a].offsetWidth;
        }
        
        for (let b = 0; b < arrows.length; b++)
        {
            arrows[b].style.top = (heightMainblock / 2) - (arrows[b].offsetHeight / 2) + "px";
        }
    }

    const createPagination = (staticBlocks, pagination, bullet) =>
    {
        let htmlBullet;
        const paginationBlock = pagination.querySelector(".window-block-pagination-block");
        pagination.style.display = "flex";
        
        htmlBullet = bullet.outerHTML;
        
        for (let i = 0; i < staticBlocks.length-1; i++)
        {
            paginationBlock.insertAdjacentHTML("afterbegin", htmlBullet);             
        }
        
        const blockBullet = pagination.querySelectorAll(".window-block-pagination-block-bullet");
        blockBullet[0].style.backgroundColor = "white";
    }

    const sliderInterval = (autoDirection, autoTiming, mobileBlock, timing, mainBlock) =>
    {
        let direction;
        if (autoDirection === "right" || autoDirection === "yes")
        {
            if (autoTiming === "yes")
            {
                direction = 1;
                autoTiming = 5000;
            }
            else if (autoTiming !== "")
            {
                direction = 1;
            }
        }
        else if (autoDirection === "left")
        {
            if (autoTiming === "yes")
            {
                direction = 0;
                autoTiming = 5000;
            }
            else if (autoTiming !== "")
            {
                direction = 0;
            }
        }
        
        obj.sliderInterval = setInterval(autoSlider, autoTiming, direction, mobileBlock, timing, mainBlock);
    }

    const autoSlider = (i, mobileBlock, timing, mainBlock) =>
    {
        staticBlocks = document.querySelectorAll(".window-blocks");
        mobileSliderObject.mobileSlider(i, mobileBlock, staticBlocks, timing, mainBlock, obj);
    }
})

()