let iconCart = document.querySelector('.icon-cart');
let close = document.querySelector('.close');
let body = document.querySelector('body');

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

close.addEventListener('click', () => {
    body.classList.toggle('showCart');
})