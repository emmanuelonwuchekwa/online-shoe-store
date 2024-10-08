document.addEventListener('DOMContentLoaded', function() {
    let iconCart = document.querySelector('.icon-cart');
    let close = document.querySelector('.close');
    let body = document.querySelector('body');

    iconCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });

    close.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });

    // Select elements
    const cartTab = document.querySelector('.cartTab');
    const listCart = document.querySelector('.listCart');
    const addToCartButtons = document.querySelectorAll('.btn'); // Add a more specific selector if needed

    // Create a cart object to manage items
    let cart = {};

    // Function to add product to the cart
    function addToCart(product) {
        const { image, name, price } = product;

        // Check if the product already exists in the cart
        if (cart[name]) {
            // Increase the quantity if it already exists
            cart[name].quantity += 1;
            cart[name].totalPrice = cart[name].price * cart[name].quantity;
        } else {
            // Add new product to the cart
            cart[name] = {
                image,
                name,
                price,
                quantity: 1,
                totalPrice: price
            };
        }
        updateCart();
    }

    // Function to update the cart display
    function updateCart() {
        listCart.innerHTML = ''; // Clear existing cart items
        let totalItems = 0; // Track total number of items

        for (let productName in cart) {
            const item = cart[productName];
            totalItems += item.quantity; // Update total items count

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');

            itemDiv.innerHTML = `
                <div class="image">
                    <img src="${item.image}">
                </div>
                <div class="name">${item.name}</div>
                <div class="totalPrice">$${item.totalPrice.toFixed(2)}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;

            listCart.appendChild(itemDiv);

            itemDiv.querySelector('.plus').addEventListener('click', () => {
                adjustQuantity(item.name, 1);
            });
            itemDiv.querySelector('.minus').addEventListener('click', () => {
                adjustQuantity(item.name, -1);
            });
        }

        // Update cart item count
        document.querySelector('.cart-count').textContent = totalItems;
    }

    // Function to adjust quantity of a product
    function adjustQuantity(name, change) {
        if (cart[name]) {
            cart[name].quantity += change;
            if (cart[name].quantity <= 0) {
                delete cart[name]; // Remove item if quantity is 0 or less
            } else {
                cart[name].totalPrice = cart[name].price * cart[name].quantity;
            }
            updateCart();
        }
    }

    // Add event listeners to all "Add To Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Prevent default behavior
            event.preventDefault();

            // Get the card element
            const card = event.target.closest('.card');
            if (!card) return;

            // Extract product details
            const image = card.querySelector('.image img').src;
            const name = card.querySelector('.products_text h2').textContent;
            const price = parseFloat(card.querySelector('.products_text h3').textContent.replace('$', ''));

            // Add product to the cart
            addToCart({ image, name, price });
        });
    });

    // Function to open the modal
    function openPaymentModal() {
        console.log('Button clicked!');
        // Get the modal element
        const modal = document.querySelector('.payment-container');
        const background = document.querySelector('.blur-background');

        // Get the total price from the cartTab (assuming you have an element to display the total price)
        const totalPrice = document.querySelector('.cartTab-total-price');
        if (totalPrice) {
            const totalPriceValue = totalPrice.textContent;
            const totalPriceField = modal.querySelector('.payment-total-price');
            if (totalPriceField) {
                totalPriceField.textContent = totalPriceValue;
            }
        }

        // Display the modal and blur the background
        modal.style.display = 'block';
        background.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Disable scrolling
    }

    // Function to close the modal
    function closePaymentModal() {
        const modal = document.querySelector('.payment-container');
        const background = document.querySelector('.blur-background');

        modal.style.display = 'none';
        background.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Event listener for the "Checkout" button
    document.getElementById('checkoutBtn').addEventListener('click', openPaymentModal);

    // Event listener for the "Close" button inside the modal
    document.querySelector('.close-payment-modal').addEventListener('click', closePaymentModal);

    // Optionally close the modal when clicking outside of it
    document.querySelector('.blur-background').addEventListener('click', closePaymentModal);
});
