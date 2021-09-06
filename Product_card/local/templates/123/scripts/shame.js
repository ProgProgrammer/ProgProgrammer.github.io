function URL_add_parameter(url, param, value) {
    var hash = {};
    var parser = document.createElement('a');

    parser.href = url;

    var parameters = parser.search.split(/\?|&/);

    for (var i = 0; i < parameters.length; i++) {
        if (!parameters[i])
            continue;

        var ary = parameters[i].split('=');
        hash[ary[0]] = ary[1];
    }

    hash[param] = value;

    var list = [];
    Object.keys(hash).forEach(function (key) {
        list.push(key + '=' + hash[key]);
    });

    parser.search = '?' + list.join('&');
    return parser.href;
}


$(document).ready(function () {

    $('.header-menu--uselinks .show-search-control').on('click', function () {
        $('.header-menu--uselinks .search-bar').addClass('active');
    });
    $('.header-menu--uselinks .search-bar--wrap .search-bar .close-block').on('click', function () {
        $('.header-menu--uselinks .search-bar').removeClass('active');
        $('.title-search-result').fadeOut();
    });

    $('.city_selector').on('change', (event) => {
        var value = event.target.value;
        var _url = window.location.href;
        var newurl = URL_add_parameter(_url, 'CITY', value)
        window.location.href = newurl;
    });

    if ($('#sender_subscribe_component').length) {
        setTimeout(function () {
            $('#sender_subscribe_component .popup-window-close-icon').trigger('click')
        }, 3000)
    }

    $('body').on('click', '.add-to-basket-card', function () {
        setTimeout(function () {
            $('.popup-window,.popup-window-overlay').fadeOut();
        }, 4000);
    });


    $('.faq .faq-links a:eq(0)').addClass('active');
    var faqParentId = $('.faq .faq-links a:eq(0)').data('id');
    $('.faq-item[data-parentid="' + faqParentId + '"]').show().addClass('active');

    $('.faq .faq-links a').on('click', function () {
        $('.faq .faq-links .active').removeClass('active');
        faqParentId = $(this).data('id');
        $('.faq-item.active').hide().removeClass('active');
        $(this).addClass('active');
        $('.faq-item[data-parentid="' + faqParentId + '"]').show().addClass('active');
        return false;
    });

    $('.product-card,.modalCardCatalog').each(function () {
        var title = $(this).find('.product-item-amount-cusom .selected').attr('title');
        var word = wordFrom(title, 'персону', 'персоны', 'персон');
        $(this).find('.small-count-card').html('Цена за блюдо на ' + title + ' ' + word).show();
    });

    //

    /*$('body').on('click', '.block-modal-product-card .more-picture', function () {
        $('.more-picture.active').removeClass('active');
        var src = $(this).data('src');
        $(this).closest('.block-modal-product-card').find('.product-picture img').attr('src', src);
        $(this).addClass('active');
        return false
    });*/

    //

    $('body').on('click', '.custom-plus', function () {
        var $next = $(this).parent().find('.product-item-amount-cusom .selected').next();
        $next.click();
        var title = $(this).parent().find('.product-item-amount-cusom .selected').attr('title');
        var word = wordFrom(title, 'персону', 'персоны', 'персон');
        if ($next) {
            $(this).closest('.product-card').find('.small-count-card').html('Цена за блюдо на ' + title + ' ' + word);
            $(this).closest('.modalCardCatalog').find('.small-count-card').html('Цена за блюдо на ' + title + ' ' + word);
        }
        return false;
    });

    $('body').on('click', '.custom-minus', function () {
        var $prev = $(this).parent().find('.product-item-amount-cusom .selected').prev();
        $prev.click();
        var title = $(this).parent().find('.product-item-amount-cusom .selected').attr('title');
        var word = wordFrom(title, 'персону', 'персоны', 'персон');
        if ($prev) {
            $(this).closest('.product-card').find('.small-count-card').html('Цена за блюдо на ' + title + ' ' + word);
            $(this).closest('.modalCardCatalog').find('.small-count-card').html('Цена за блюдо на ' + title + ' ' + word);
        }
        return false;
    });

    //

    /*$('body').on('click', '.block-modal-product-card .product-picture .pic-next', function () {
        var $n = $('.block-modal-product-card .product-picture .active').next();
        var $n2 = $('.more-picture-wrap .active').next();
        if (!$n.length) {
            $n = $('.block-modal-product-card .product-picture img:eq(0)');
            $n2 = $('.more-picture-wrap div:eq(0)');
        }
        $('.block-modal-product-card .product-picture .active').removeClass('active');
        $('.more-picture-wrap .active').removeClass('active');
        $n.addClass('active');
        $n2.addClass('active');
        return false;
    });

    $('body').on('click', '.block-modal-product-card .product-picture .pic-prev', function () {
        var $n = $('.block-modal-product-card .product-picture .active').prev();
        var $n2 = $('.more-picture-wrap .active').prev();
        if (!$n.length) {
            $n = $('.block-modal-product-card .product-picture img:last-child');
            $n2 = $('.more-picture-wrap div:last-child');
        }
        $('.block-modal-product-card .product-picture .active').removeClass('active');
        $('.more-picture-wrap .active').removeClass('active');
        $n.addClass('active');
        $n2.addClass('active');
        return false;
    });*/

    //

    $('body').on('click', '.js-show-product', function () {
        var id = $(this).data('id');
        $.ajax({
            url: '/xhr/getcatalog.php',
            data: {
                id: id
            },
            success: function (response) {
                $('#modalCardCatalog-content').html(response);
                // $('#modalCardCatalog').modal('show');
                $('.modalCardCatalog').each(function () {
                    var title = $(this).find('.product-item-amount-cusom .selected').attr('title');
                    var word = wordFrom(title, 'персону', 'персоны', 'персон');
                    console.log(word);
                    $(this).find('.small-count-card').html('Цена за блюдо на ' + title + ' ' + word).show();
                });
            }
        });
        // return false;
    });




    $('.promo-price-btn').on('click', function () {
        $.ajax({
            method: 'GET',
            url: '/ajax/addpromo.php?ID=1008',
            success: function (response) {
                window.location.href = '/personal/cart/';
            }
        });
    });


});

function wordFrom(number, one, two, five) {
    number = Math.abs(number);
    number %= 100;
    if (number >= 5 && number <= 20) {
        return five;
    }
    number %= 10;
    if (number == 1) {
        return one;
    }
    if (number >= 2 && number <= 4) {
        return two;
    }
    return five;
};

/* 06.08.2021 - слайдер с фотографиями блюд */

(function()
{
 /*
    js-picture-product
    js-pic
    js-more-picture
  */

    let pictures_product;
    let arrows;
    let paginations;

    function activeImage()
    {
        for (let a = 0; a < pictures_product.length; a++)
        {
            if (pictures_product[a].classList.contains('active'))
            {
                return a;
            }
        }
    }

    function deleteActivePaginations()
    {
        for (let a = 0; a < paginations.length; a++)
        {
            if (paginations[a].classList.contains('active'))
            {
                paginations[a].classList.remove('active');
            }
        }
    }

    function deleteActivePicture()
    {
        for (let a = 0; a < pictures_product.length; a++)
        {
            if (pictures_product[a].classList.contains('active'))
            {
                pictures_product[a].classList.remove('active');
            }
        }
    }

    function slider()
    {
        let img_number;
        let active_image;
        for (let i = 0; i < arrows.length; i++)
        {
            arrows[i].addEventListener('click', () =>
            {
                active_image = activeImage();
                for (let a = 0; a < pictures_product.length; a++)
                {
                    if (pictures_product[a].classList.contains('active'))
                    {
                        img_number = i;
                    }
                }
                deleteActivePicture();
                deleteActivePaginations();
                if (i === 1)
                {
                    if (active_image === 0)
                    {
                        pictures_product[pictures_product.length - 1].classList.add('active');
                        paginations[pictures_product.length - 1].classList.add('active');
                    }
                    else
                    {
                        pictures_product[active_image - 1].classList.add('active');
                        paginations[active_image - 1].classList.add('active');
                    }
                }
                else if (i === 0)
                {
                    if (active_image === pictures_product.length - 1)
                    {
                        pictures_product[0].classList.add('active');
                        paginations[0].classList.add('active');
                    }
                    else
                    {
                        pictures_product[active_image + 1].classList.add('active');
                        paginations[active_image + 1].classList.add('active');
                    }
                }
            });
        }
        for (let i = 0; i < paginations.length; i++)
        {
            paginations[i].addEventListener('click', () =>
            {
                deleteActivePicture();
                deleteActivePaginations();
                pictures_product[i].classList.add('active');
                paginations[i].classList.add('active');
            });
        }
    }

    window.addEventListener('DOMContentLoaded', function()
    {
        const products = document.querySelectorAll('.js-show-product');
        const n_price = document.querySelector('.js-price');
        if (products[0])
        {
            for (let i = 0; i < products.length; i++)
            {
                products[i].addEventListener('click', () =>
                {
                    const interval = setInterval(() => {
                        const not_price = document.querySelector('.js-price');
                        if (not_price !== undefined && not_price !== null)
                        {
                            setTimeout(() =>
                            {
                                pictures_product = document.querySelectorAll('.js-picture-product');
                                arrows = document.querySelectorAll('.js-pic');
                                paginations = document.querySelectorAll('.js-more-picture');
                                setTimeout(slider, 10);
                            }, 1000);
                            clearInterval(interval);
                        }
                    }, 10);
                });
            }
        }
        else if (n_price)
        {
            pictures_product = document.querySelectorAll('.js-picture-product');
            arrows = document.querySelectorAll('.js-pic');
            paginations = document.querySelectorAll('.js-more-picture');
            slider();
        }
    });
})();