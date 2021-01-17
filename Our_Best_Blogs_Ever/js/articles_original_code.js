(function()
{
    window.addEventListener('DOMContentLoaded', () =>
    {
        let counter = 0;
        let request = true;
        const step = 6;
        const start_spinner = "start";
        const button = document.querySelector(".button");
        const block = document.querySelector(".blocks .blocks-row");
        const block_spinner = document.querySelector(".spinner");

        const spinner = (command, error, error_articles) =>
        {
            const spinner_element = document.querySelector(".loadingio-spinner-double-ring-mmxwcmu6s6");
            if (command === start_spinner)
            {
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
                    spinner_element.remove();
                    block_spinner.style.display = "none";
                    request = true;
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

        const add_blocks = (json, counter_articles) =>
        {
            const spinner_element = document.querySelector(".loadingio-spinner-double-ring-mmxwcmu6s6");
            if (counter_articles === step &&
                spinner_element !== null)
            {
                spinner("off");
            }
            if (json.id !== undefined)
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
            }
            if (counter_articles === step)
            {
                request = true;
            }
        }

        const loaded_articles = (number, value = 1) =>
        {
            let counter_articles = 0;
            let error_articles = 0;
            request = false;
            for (let i = value; i < number; i++) {
                fetch('https://jsonplaceholder.typicode.com/posts/' + i)
                    .then((response) => { counter_articles++; return response.json(); })
                    .then((json) => add_blocks(json, counter_articles))
                    .catch((error) => { error_articles++; spinner(start_spinner, error, error_articles); } );
            } // - код для запроса новых данных
        }

        const start_loaded_articles = (value) =>
        {
            if ((request === false && value !== "request_button") ||
                (request === true && value === "request_button")) {
                const arr = [];
                let articles = document.querySelectorAll(".blocks .block_theme_article");
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
                counter++;
            }
        }

        button.addEventListener('click', () =>
        {
            start_loaded_articles("request_button");
        });
    });
})
()