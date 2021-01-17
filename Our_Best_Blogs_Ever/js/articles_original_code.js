(function()
{
    window.addEventListener('DOMContentLoaded', () =>
    {
        const array_id = [];
        let counter = 0;
        const step = 6;
        let block_button = false;
        let block_error = false;
        const start_spinner = "start";
        const button = document.querySelector(".button");
        const block = document.querySelector(".blocks .blocks-row");
        const block_spinner = document.querySelector(".spinner");

        const article_id = (id) =>
        {
            const articles = document.querySelectorAll(".block_theme_article");
            for (let i = 0; i < articles.length; i++)
            {
                if (Number(articles[i].dataset.id) === id)
                {
                    return true;
                }
            }
            return false;
        }

        const fetch_id = (id) =>
        {
            if (article_id(id) === false)
            {
                fetch('https://jsonplaceholder.typicode.com/posts/' + id)
                    .then((response) => response.json())
                    .then((json) => add_blocks(json, 1, id))
                    .catch((error) => { setTimeout(fetch_id, 1000, id) } );
            }
        }

        const check_array_id = () =>
        {
            for (let i = 0; i < array_id.length; i++)
            {
                if (array_id[i] !== i + 1)
                {
                    fetch_id(i + 1);
                }
            }
        }

        const spinner = (command, error, error_articles, number) =>
        {
            const spinner_element = document.querySelector(".loadingio-spinner-double-ring-mmxwcmu6s6");
            if (command === start_spinner)
            {
                block_error = true;
                block_spinner.style.display = "flex";
                if (spinner_element === null)
                {
                    const string = '<div class="loadingio-spinner-double-ring-mmxwcmu6s6">' +
                        '<div class="ldio-mlxrpb9uod">' +
                        '<div></div>'+
                        '<div></div>'+
                        '<div><div></div></div>'+
                        '<div><div></div></div>'+
                        '</div></div>';
                    block_spinner.innerHTML = string;
                }
                if (error !== null)
                {
                    console.error("Ошибка: ", error);
                }
                if (error !== null && error_articles === 1)
                {
                    request = false;
                    setTimeout(start_loaded_articles, 5000, "request");
                }
            }
            else
            {
                if (spinner_element !== null)
                {
                    check_array_id();
                    block_error = false;
                    spinner_element.remove();
                    block_spinner.style.display = "none";
                }
            }
        }

        const max_number = (arr) =>
        {
            let number = 1;
            for (let i = 0; i < arr.length; i++)
            {
                if (arr[i] !== undefined && arr[i] > number)
                {
                    number = arr[i];
                }
            }
            return number;
        }

        const check_id = (id) =>
        {
            for (let a = 0; a < array_id.length; a++)
            {
                if (array_id[a] === id)
                {
                    console.log("id_error = " + id);
                    return false;
                }
            }
            return true;
        }

        const add_blocks = (json, counter_articles, i) =>
        {
            const spinner_element = document.querySelector(".loadingio-spinner-double-ring-mmxwcmu6s6");
            if (counter_articles === step &&
                spinner_element !== null)
            {
                spinner("off");
            }
            if (json.id !== undefined && check_id(json.id) === true)
            {
                const string = '<article class="col-12 col-lg-6 block block_theme_article" data-id="' + json.id + '">' +
                    '<div class="block__text-block block__text-block_theme_article">' +
                    '        <h3 class="block__header block__header_theme_article">' +
                    json.title + '</h3>' +
                    '        <div class="block__text-block-description">' +
                    '<p class="block__up-text block__up-text_theme_article">' +
                    json.body + '</p>' +
                    '        <a href="#" class="block__url block__url_theme_article">' +
                    '            Read More' +
                    '        </a>' +
                    '    </div>' +
                    '</div>' +
                    '</article>';
                block.insertAdjacentHTML('beforeend', string);
                array_id[i - 1] = json.id;
            }
            if (counter_articles === step && json.id !== undefined)
            {
                block_button = false;
                counter++;
            }
        }

        const loaded_articles = (number, value = 1) =>
        {
            let counter_articles = 0;
            let error_articles = 0;
            for (let i = value; i < number; i++) {
                fetch('https://jsonplaceholder.typicode.com/posts/' + i)
                    .then((response) => { counter_articles++; return response.json(); })
                    .then((json) => add_blocks(json, counter_articles, i))
                    .catch((error) => { error_articles++; spinner(start_spinner, error, error_articles, number); } );
            } // - код для запроса новых данных
        }

        const start_loaded_articles = (value) =>
        {
            if ((value === "request" && block_error === true) ||
                (value === "request_button" && block_button === false && block_error !== true))
            {
                const arr = [];
                const articles = document.querySelectorAll(".blocks .block_theme_article");
                if (counter === 0)
                {
                    loaded_articles(step + 1);
                }
                else
                {
                    for (let i = 2; i < articles.length; i++) {
                        arr[i] = Number(articles[i].dataset.id);
                    }
                    let id = max_number(arr) + 1;
                    loaded_articles(id + step, id);
                }
            }
        }

        button.addEventListener('click', () =>
        {
            start_loaded_articles("request_button");
            block_button = true;
        });
    });
})
()