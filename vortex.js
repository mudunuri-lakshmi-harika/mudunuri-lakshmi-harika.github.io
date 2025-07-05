
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cart = document.querySelector('.cart');
    const closeCart = document.getElementById('cart-close');
    const cartContent = document.querySelector('.cart-content');
    const totalPrice = document.querySelector('.total-price');
    const buyBtn = document.querySelector('.btn-buy');
    let cartItems = [];

    // Function to show the image in full screen
    function showFullScreenImage(imageSrc) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${imageSrc}" class="modal-img" />
                <span class="close-modal">×</span>
            </div>
        `;
        document.body.appendChild(modal);

        // Close the modal when clicked
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        // Close the modal when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Add event listener to product images for full-screen functionality
    document.querySelectorAll('.product-box img').forEach((img) => {
        img.addEventListener('click', () => {
            showFullScreenImage(img.src); // Show the clicked image in full-screen
        });
    });

    function updateCartCount() {
        const cartCountEl = document.querySelector('.cart-item-count');
        let totalCount = 0;
        cartItems.forEach(item => {
            totalCount += item.quantity;
        });
        cartCountEl.textContent = totalCount;
        cartCountEl.style.display = totalCount > 0 ? 'inline-block' : 'none';
    }

    cartIcon.addEventListener("click", () => {
        cart.classList.add("active");
    });

    // Close cart
    closeCart.addEventListener("click", () => {
        cart.classList.remove("active");
    });

    cartIcon.addEventListener('click', () => {
        cart.style.display = 'block';
    });

    closeCart.addEventListener('click', () => {
        cart.style.display = 'none';
    });

    document.querySelectorAll('.add-cart').forEach((btn) => {
        btn.addEventListener('click', () => {
            const productBox = btn.closest('.product-box');
            const title = productBox.querySelector('.product-title').innerText;
            const price = parseFloat(productBox.querySelector('.price').innerText);
            const imgSrc = productBox.querySelector('img').src;
            const size = productBox.querySelector('.size').value;

            const existingItem = cartItems.find(item => item.title === title && item.size === size);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({ title, price, imgSrc, size, quantity: 1 });
            }

            renderCart();
        });
    });

    // Render Cart
    function renderCart() {
    cartContent.innerHTML = '';

    cartItems.forEach((item, i) => {
        const box = document.createElement('div');
        box.className = 'cart-box';
        box.innerHTML = `
            <img src="${item.imgSrc}" class="cart-img">
            <div class="cart-detail">
                <h2 class="cart-product-title">${item.title}</h2>
                <span class="cart-price">₹${item.price}</span> <!-- Add rupee symbol here -->
                <div class="cart-size">Size: ${item.size}</div>
                <div class="cart-quantity">
                    <button class="decrement" data-index="${i}">-</button>
                    <span class="number">${item.quantity}</span>
                    <button class="increment" data-index="${i}">+</button>
                </div>
            </div>
            <i class="ri-delete-bin-line cart-remove" data-index="${i}"></i>
        `;
        cartContent.appendChild(box);
    });

    updateTotal();
    updateCartCount();

    document.querySelectorAll('.increment').forEach(btn => {
        btn.addEventListener('click', e => {
            const index = e.target.dataset.index;
            cartItems[index].quantity++;
            renderCart();
        });
    });

    document.querySelectorAll('.decrement').forEach(btn => {
        btn.addEventListener('click', e => {
            const index = e.target.dataset.index;
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
            } else {
                cartItems.splice(index, 1);
            }
            renderCart();
        });
    });

    document.querySelectorAll('.cart-remove').forEach(btn => {
        btn.addEventListener('click', e => {
            const index = e.target.dataset.index;
            cartItems.splice(index, 1);
            renderCart();
        });
    });
}

function updateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    totalPrice.innerText = `₹${total.toFixed(2)}`; // Add rupee symbol
}



buyBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Save cartItems to localStorage for transfer to checkout page
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Navigate to the checkout page
    window.location.href = 'checkout.html';
});
});
