(function()
{
    main();

    function main()
    {
        const groups_Buttons = document.querySelectorAll(".group-buttons");
        const input_Text = document.querySelector(".input");
        const texts = document.querySelectorAll(".form-texts-text");
        const button_Style = document.querySelector(".button-style");
        const window_Absolute = document.querySelector(".form-column-input-text");
        const window_Absolute_Text = window_Absolute.querySelector(".form-column-input-text-p");
        const object_Buttons = {};
        object_Buttons.buttons_Top = "";
        object_Buttons.buttons_Bottom = "";
        object_Buttons.StyleMain = "style.css";
        object_Buttons.StyleChange = "style2.css";
        object_Buttons.buttons_BackgroundClick = "red";
        object_Buttons.buttons_Background = "buttonface";
        object_Buttons.BorderBlack = "black";
        object_Buttons.BorderRed = "red";
        object_Buttons.InsertTags = "insert-tags";
        object_Buttons.InserNoTags = "insert-no-tags";
        object_Buttons.ReplaceTags = "replacement-tags";
        object_Buttons.ReplaceNoTags = "replacement-no-tags";
        object_Buttons.BeforeBegin = "before-begin";
        object_Buttons.AfterBegin = "after-begin";
        object_Buttons.BeforeEnd = "before-end";
        object_Buttons.AfterEnd = "after-end";

        for (let i = 0; i < groups_Buttons.length; i++)
        {
            groups_Buttons[i].addEventListener('click', () =>
            {
                const buttons = groups_Buttons[i].querySelectorAll(".button");
                for (let a = 0; a < buttons.length; a++)
                {
                    if (buttons[a] == event.target)
                    {
                        if (checkPartButtons(object_Buttons, groups_Buttons, i, buttons, a, window_Absolute_Text, input_Text) === false)
                        {
                            buttons[a].style.background = object_Buttons.buttons_BackgroundClick;
                            groups_Buttons[i].classList.add("background-red");
                            return;
                        }
                        else
                        {
                            buttons[a].style.background = object_Buttons.buttons_BackgroundClick;
                            borderNone(object_Buttons);
                            groups_Buttons[i].classList.add("background-red");
                        }
                    }
                }
            });
        }

        button_Style.addEventListener('click', function ()
        {
            const link_Href = document.querySelector("link");
            if (link_Href.getAttribute('href') == object_Buttons.StyleMain)
            {
                link_Href.setAttribute('href', object_Buttons.StyleChange);
                button_Style.style.backgroundColor = object_Buttons.buttons_BackgroundClick;
            }
            else
            {
                link_Href.setAttribute('href', object_Buttons.StyleMain);
                button_Style.style.backgroundColor = object_Buttons.buttons_Background;
            }
        });

        input_Text.oninput = function ()
        {
            checkAllButtons(object_Buttons, groups_Buttons, window_Absolute, window_Absolute_Text, input_Text);
        }
        for (let a = 0; a < texts.length; a++)
        {
            texts[a].addEventListener('click', () =>
            {
                if (object_Buttons.buttons_Top == object_Buttons.InsertTags)
                {
                    texts[a].innerHTML += input_Text.value;
                }
                else if (object_Buttons.buttons_Top == object_Buttons.InserNoTags)
                {
                    texts[a].innerText += input_Text.value;
                }
                else if (object_Buttons.buttons_Top == object_Buttons.ReplaceTags)
                {
                    texts[a].outerHTML = input_Text.value;
                }
                else if (object_Buttons.buttons_Top == object_Buttons.ReplaceNoTags)
                {
                    texts[a].outerText = input_Text.value;
                }
                else if (object_Buttons.buttons_Bottom == object_Buttons.BeforeBegin)
                {
                    texts[a].insertAdjacentHTML('beforebegin', input_Text.value);
                }
                else if (object_Buttons.buttons_Bottom == object_Buttons.AfterBegin)
                {
                    texts[a].insertAdjacentHTML('afterbegin', input_Text.value);
                }
                else if (object_Buttons.buttons_Bottom == object_Buttons.BeforeEnd)
                {
                    texts[a].insertAdjacentHTML('beforeend', input_Text.value);
                }
                else if (object_Buttons.buttons_Bottom == object_Buttons.AfterEnd)
                {
                    texts[a].insertAdjacentHTML('afterend', input_Text.value);
                }
            });
        }
    }

    function checkAllButtons(object_Buttons, groups_Buttons, window_Absolute, window_Absolute_Text, input_Text)
    {

        if (object_Buttons.buttons_Top == "" && object_Buttons.buttons_Bottom == "")
        {

            if (object_Buttons.buttons_Top == "")
            {
                const buttons_Group_Top = document.querySelector(".form-column");
                buttons_Group_Top.classList.add("border-red");
                window_Absolute.style.display = "flex";
                window_Absolute_Text.style.display = "flex";
                input_Text.style.borderColor = object_Buttons.BorderRed;
            }

            if (object_Buttons.buttons_Bottom == "")
            {
                const buttons_Group_Bottom = document.querySelector(".form-buttons-input");
                buttons_Group_Bottom.classList.add("border-red");
                window_Absolute.style.display = "flex";
                window_Absolute_Text.style.display = "flex";
                input_Text.style.borderColor = object_Buttons.BorderRed;
            }
        }
        else
        {
            borderNone(object_Buttons);
        }
    }

    function checkPartButtons(object_Buttons, groups_Buttons, i, buttons, a, window_Absolute_Text, input_Text)
    {
        if (groups_Buttons[0].classList.contains("background-red") && i == 1)
        {
            groups_Buttons[0].classList.remove("background-red");
            changeBackground(0, groups_Buttons, a, object_Buttons, i);
            return false;
        }
        else if (groups_Buttons[1].classList.contains("background-red") && i == 0)
        {
            groups_Buttons[1].classList.remove("background-red");
            changeBackground(1, groups_Buttons, a, object_Buttons, i);
            return false;
        }
        else
        {
            for (let c = 0; c < groups_Buttons.length; c++)
            {
                if (groups_Buttons[c].classList.contains("border-red"))
                {
                    groups_Buttons[c].classList.remove("border-red");
                }
            }
            for (let b = 0; b < buttons.length; b++)
            {
                if (buttons[b].style.background == object_Buttons.buttons_BackgroundClick && b !== a)
                {
                    buttons[b].style.background = object_Buttons.buttons_Background;
                }
            }
            if (i == 0)
            {
                if (a == 0)
                {
                    object_Buttons.buttons_Top = object_Buttons.InsertTags;
                }
                else if (a == 1)
                {
                    object_Buttons.buttons_Top = object_Buttons.InserNoTags;
                }
                else if (a == 2)
                {
                    object_Buttons.buttons_Top = object_Buttons.ReplaceTags;
                }
                else if (a == 3)
                {
                    object_Buttons.buttons_Top = object_Buttons.ReplaceNoTags;
                }

                checkWindowAbsolute(i, window_Absolute_Text, input_Text, object_Buttons);
            }
            else if (i == 1)
            {
                if (a == 0)
                {
                    object_Buttons.buttons_Bottom = object_Buttons.BeforeBegin;
                }
                else if (a == 1)
                {
                    object_Buttons.buttons_Bottom = object_Buttons.AfterBegin;
                }
                else if (a == 2)
                {
                    object_Buttons.buttons_Bottom = object_Buttons.BeforeEnd;
                }
                else if (a == 3)
                {
                    object_Buttons.buttons_Bottom = object_Buttons.AfterEnd;
                }

                checkWindowAbsolute(i, window_Absolute_Text, input_Text, object_Buttons);
            }
        }
    }

    function checkWindowAbsolute(i, window_Absolute_Text, input_Text, object_Buttons)
    {
        if (window_Absolute_Text.style.display == "flex")
        {
            document.querySelector(".form-column-input-text").style.display = "none";
            window_Absolute_Text.style.display = "none";
            input_Text.style.borderColor = object_Buttons.BorderBlack;
        }
    }

    function borderNone(object_Buttons)
    {
        const buttons = document.querySelectorAll(".button");
        for (let i = 0; i < buttons.length; i++)
        {
            if (buttons[i].style.borderColor == object_Buttons.BorderRed)
            {
                buttons[i].style.borderColor == object_Buttons.BorderBlack;
            }
        }
    }

    function changeBackground(b, groups_Buttons, a, object_Buttons, i)
    {
        const buttons = groups_Buttons[b].querySelectorAll(".button");
        for (let a = 0; a < buttons.length; a++)
        {
            if (buttons[a].style.background = object_Buttons.buttons_BackgroundClick)
            {
                buttons[a].style.background = object_Buttons.buttons_Background;
            }
        }
        if (groups_Buttons[b].classList.contains("background-red") && b == 0)
        {
            groups_Buttons[1].classList.remove("background-red");
        }
        else if (groups_Buttons[b].classList.contains("background-red") && b == 1)
        {
            groups_Buttons[0].classList.remove("background-red");
        }

        object_Buttons.buttons_Top = "";
        object_Buttons.buttons_Bottom = "";

        if (i == 0)
        {
            if (a == 0)
            {
                object_Buttons.buttons_Top = object_Buttons.InsertTags;
            }
            else if (a == 1)
            {
                object_Buttons.buttons_Top = object_Buttons.InserNoTags;
            }
            else if (a == 2)
            {
                object_Buttons.buttons_Top = object_Buttons.ReplaceTags;
            }
            else if (a == 3)
            {
                object_Buttons.buttons_Top = object_Buttons.ReplaceNoTags;
            }
        }
        else if (i == 1)
        {
            if (a == 0)
            {
                object_Buttons.buttons_Bottom = object_Buttons.BeforeBegin;
            }
            else if (a == 1)
            {
                object_Buttons.buttons_Bottom = object_Buttons.AfterBegin;
            }
            else if (a == 2)
            {
                object_Buttons.buttons_Bottom = object_Buttons.BeforeEnd;
            }
            else if (a == 3)
            {
                object_Buttons.buttons_Bottom = object_Buttons.AfterEnd;
            }
        }

        return;
    }
})

()