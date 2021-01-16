(function()
{
    window.addEventListener('DOMContentLoaded', () =>
    {
        let counter = 0;
        const step = 6;
        const button = document.querySelector(".button");
        const block = document.querySelector(".blocks .blocks-row");

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

        const add_blocks = (json) =>
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

        const loaded_articles = (number, value = 1) =>
        {
            for (let i = value; i < number; i++) {
                fetch('https://jsonplaceholder.typicode.com/posts/' + i)
                    .then((response) => response.json())
                    .then((json) => add_blocks(json));
            } // - код для запроса новых данных
        }

        button.addEventListener('click', () =>
        {
            const arr = [];
            let articles = document.querySelectorAll(".blocks .block_theme_article");
            if (counter === 0)
            {
                loaded_articles(step + 1);
            }
            else
            {
                for(let i = 2; i < articles.length; i++)
                {
                    arr[i] = Number(articles[i].dataset.id);
                }
                let id = max_number(arr) + 1;
                loaded_articles(id + step, id);
            }
            counter++;
        });
    });
})
()