document.addEventListener('DOMContentLoaded', function () {
  const searchWrap = document.querySelector('.show-search--button');
  searchWrap.setAttribute('data-click', '0');

  searchWrap.addEventListener('click', function (e) {
    if (this.getAttribute('data-click') == '0') {
      this.setAttribute('data-click', '1');
      this.classList.add('show-search--button--active');
    } else {
      this.setAttribute('data-click', '0');
      this.classList.remove('show-search--button--active');
    }
  })
});