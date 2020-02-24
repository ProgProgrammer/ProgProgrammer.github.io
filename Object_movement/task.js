(function ()
{

    window.addEventListener('load', main());

    function main()
    {
        const square_Window = document.querySelector(".square");

        square_Window.addEventListener('mousedown', (event) =>
        {
            square_Window.style.position = 'absolute';
            mouseDragAndDrop(event.pageX, event.pageY);
            document.addEventListener('mousemove', mouseMoving);
        });

        square_Window.addEventListener('mouseup', () =>
        {
            document.removeEventListener('mousemove', mouseMoving);
        });

        function mouseMoving(event) {
            mouseDragAndDrop(event.pageX, event.pageY);
        }

        function mouseDragAndDrop(pageX, pageY) {
            square_Window.style.top = pageY - square_Window.offsetHeight + 'px';
            square_Window.style.left = pageX - square_Window.offsetWidth + 'px';
        }
    }

})

()