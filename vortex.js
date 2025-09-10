document.addEventListener('DOMContentLoaded', () => {
  const productBoxes = document.querySelectorAll('.product-box');
  const cartIcon = document.getElementById('cart-icon');
  const cart = document.querySelector('.cart');
  const closeCart = document.getElementById('cart-close');
  const cartContent = document.querySelector('.cart-content');
  const totalPrice = document.querySelector('.total-price');
  const buyBtn = document.querySelector('.btn-buy');
  const vid = document.querySelector('video'); // ✅ Select the video element

  // ✅ Attempt to force autoplay if browser blocks it
  if (vid && vid.paused) {
    vid.play().catch(err => {
      console.log('Autoplay failed:', err);
    });
  }

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Product click → go to product page
  productBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const title = box.getAttribute('data-title');
      const price = parseFloat(box.getAttribute('data-price'));
      const imgSrc = box.getAttribute('data-img');
      const size = 'M';

      const productData = { title, price, imgSrc, size };
      localStorage.setItem('selectedProduct', JSON.stringify(productData));
      window.location.href = 'product.html';
    });
  });

  // Cart Logic
  function updateCartCount() {
    const cartCountEl = document.querySelector('.cart-item-count');
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalCount;
    cartCountEl.style.display = totalCount > 0 ? 'inline-block' : 'none';
  }

  function updateTotal() {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPrice.textContent = `₹${total.toFixed(2)}`;
  }

  function renderCart() {
    cartContent.innerHTML = '';

    cartItems.forEach((item, index) => {
      const cartBox = document.createElement('div');
      cartBox.classList.add('cart-box');
      cartBox.innerHTML = `
        <img src="${item.imgSrc}" class="cart-img">
        <div class="cart-detail">
          <h2 class="cart-product-title">${item.title}</h2>
          <span class="cart-price">₹${item.price}</span>
          <div class="cart-size">Size: ${item.size}</div>
          <div class="cart-quantity">
            <button class="decrement" data-index="${index}">-</button>
            <span class="number">${item.quantity}</span>
            <button class="increment" data-index="${index}">+</button>
          </div>
        </div>
        <i class="ri-delete-bin-line cart-remove" data-index="${index}"></i>
      `;
      cartContent.appendChild(cartBox);
    });

    updateTotal();
    updateCartCount();

    document.querySelectorAll('.increment').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = e.target.dataset.index;
        cartItems[i].quantity++;
        saveCartAndRender();
      });
    });

    document.querySelectorAll('.decrement').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = e.target.dataset.index;
        if (cartItems[i].quantity > 1) {
          cartItems[i].quantity--;
        } else {
          cartItems.splice(i, 1);
        }
        saveCartAndRender();
      });
    });

    document.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = e.target.dataset.index;
        cartItems.splice(i, 1);
        saveCartAndRender();
      });
    });
  }

  function saveCartAndRender() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
  }

  cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
    renderCart();
  });

  closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
  });

  buyBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.location.href = 'checkout.html';
  });

  updateCartCount();
});
