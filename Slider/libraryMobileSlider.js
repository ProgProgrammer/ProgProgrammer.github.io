export const mobileSliderObject = {};

mobileSliderObject.mobileSlider = (i, mobileBlock, staticBlocks, timing, mainBlock, obj) =>
{
    let htmlTags;
    let blockBullets;
    const trafficSlider = mainBlock.dataset.trafficSlider;

    if (mainBlock.dataset === "yes")
    {
        blockBullets = document.querySelectorAll(".window-block-pagination-block-bullet");
    }

    if (trafficSlider === "true")
    {
        mainBlock.dataset.trafficSlider = false;
        if (mainBlock.dataset.pagination === "yes" && mainBlock.dataset.paginationTimeout !== "yes")
        {
            mobileSliderObject.paginationMoving(i, obj);
        }
        else if (mainBlock.dataset.pagination === "yes" && mainBlock.dataset.paginationTimeout === "yes")
        {
            setTimeout(mobileSliderObject.paginationMoving, timing, i, obj);
        }
    }
    else
    {
        return;
    }

    if (i === 0)
    {
        htmlTags = staticBlocks[staticBlocks.length-1].outerHTML;
        mobileBlock.insertAdjacentHTML("afterbegin", htmlTags);
        setTimeout(mobileSliderObject.deleteTag, timing, staticBlocks, i, mobileBlock, mainBlock, obj);

        if (/-/.test(mobileBlock.style.transform) === true)
        {
            obj.widthTransform -= staticBlocks[0].offsetWidth;
            mobileBlock.style.left = obj.widthTransform + "px";
            mobileBlock.style.transform = "translate3d(-" + obj.widthTransform + "px, 0px, 0px)";
        }
        else
        {
            obj.widthTransform += staticBlocks[0].offsetWidth;
            mobileBlock.style.left = "-" + obj.widthTransform + "px";
            //console.log(obj.widthTransform);
            mobileBlock.style.transform = "translate3d(" + obj.widthTransform + "px, 0px, 0px)";
        }

    }
    else
    {
        htmlTags = staticBlocks[0].outerHTML;
        mobileBlock.insertAdjacentHTML("beforeend", htmlTags);
        setTimeout(mobileSliderObject.deleteTag, timing, staticBlocks, i, mobileBlock, mainBlock, obj);
        if (obj.widthTransform > 0 && (/-/.test(mobileBlock.style.transform) === false))
        {
            //console.log(obj.widthTransform);
            obj.widthTransform -= staticBlocks[0].offsetWidth;
            //console.log(obj.widthTransform);
            mobileBlock.style.left = "-" + (obj.widthTransform + staticBlocks[0].offsetWidth) + "px";
            mobileBlock.style.transform = "translate3d(" + obj.widthTransform + "px, 0px, 0px)";
        }
        else
        {
            //console.log(mobileBlock.style.transform);
            //console.log(obj.widthTransform);
            obj.widthTransform += staticBlocks[0].offsetWidth;
            //console.log(obj.widthTransform);
            mobileBlock.style.left = (obj.widthTransform - staticBlocks[0].offsetWidth) + "px";
            mobileBlock.style.transform = "translate3d(-" + obj.widthTransform + "px, 0px, 0px)";
        }
    }
}

mobileSliderObject.paginationMoving = (i, obj) =>
{
    const bullets = document.querySelectorAll(".window-block-pagination-block-bullet");
    let bulletId = obj.paginationBullet;
    bullets[bulletId].style.backgroundColor = "grey";
    console.log(i);

    if (i === 0)
    {
        if (bulletId > 0)
        {
            bullets[bulletId - 1].style.backgroundColor = "white";
            obj.paginationBullet = bulletId - 1;
        }
        else
        {
            bullets[bullets.length - 1].style.backgroundColor = "white";
            obj.paginationBullet = bullets.length - 1;
        }
    }
    else if (i === 1)
    {
        if (bulletId < bullets.length - 1)
        {
            bullets[bulletId + 1].style.backgroundColor = "white";
            obj.paginationBullet = bulletId + 1;
        }
        else
        {
            bullets[0].style.backgroundColor = "white";
            obj.paginationBullet = 0;
        }
    }
}

mobileSliderObject.deleteTag = (staticBlocks, i, mobileBlock, mainBlock, obj) =>
{
    staticBlocks = document.querySelectorAll(".window-blocks");
    mainBlock.dataset.trafficSlider = true;
    if (staticBlocks.length > 1 && i === 0)
    {
        staticBlocks[staticBlocks.length-1].remove();
        //console.log(staticBlocks);
    }
    else if (obj.staticBlocksLength === 1 && i === 1 && staticBlocks[2] !== undefined && staticBlocks!== null)
    {
        staticBlocks[2].remove();
        //console.log(i);
    }
    else if (obj.staticBlocksLength > 1)
    {
        staticBlocks[0].remove();
        //console.log(i);
        //console.log(mobileBlock.style.left);
        //console.log(/-/.test(mobileBlock.style.left));

        if (/-/.test(mobileBlock.style.left) === true)
        {
            mobileBlock.style.left = "-" + (obj.widthTransform + staticBlocks[0].offsetWidth) + "px";
            //console.log(mobileBlock.style.left);
        }
        else
        {
            mobileBlock.style.left = (obj.widthTransform + staticBlocks[0].offsetWidth) + "px";
            //console.log(mobileBlock.style.left);
        }
    }
    else
    {
        return;
    }
}