document.addEventListener('DOMContentLoaded', () => {
  // Load product data from localStorage
  let productData = JSON.parse(localStorage.getItem('selectedProduct'));

  if (!productData) {
    alert('No product selected!');
    // Optionally redirect back to shop page
    window.location.href = 'vortex.html'; 
    return;
  }

  // Elements
  const productImg = document.getElementById('product-img');
  const productTitle = document.getElementById('product-title');
  const productPrice = document.getElementById('product-price');
  const productSize = document.getElementById('product-size');
  const relatedList = document.querySelector('.related-list');

  // Cart related elements
  const cartIcon = document.getElementById('cart-icon');
  const cart = document.querySelector('.cart');
  const closeCart = document.getElementById('cart-close');
  const cartContent = document.querySelector('.cart-content');
  const totalPrice = document.querySelector('.total-price');
  const buyBtn = document.querySelector('.btn-buy');

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Set initial product details
  function updateProductDetails(item) {
    productData = item; // update current productData reference
    productImg.src = item.imgSrc;
    productImg.alt = item.title;
    productTitle.textContent = item.title;
    productPrice.textContent = `₹${item.price}`; 
    productSize.value = item.size || "M";
    localStorage.setItem('selectedProduct', JSON.stringify(item));
  }

  updateProductDetails(productData);

  // Related products data
  const relatedProducts = [
    { title: "Casual Black", price: 899, imgSrc: "product5.webp", size: "M" },
    { title: "Arial Black", price: 999, imgSrc: "product6.webp", size: "M" },
    { title: "Sporty White", price: 799, imgSrc: "product7.png", size: "L" },
  ];

  // Render related items
  function renderRelatedItems() {
    relatedList.innerHTML = '';
    relatedProducts.forEach(item => {
      if (item.title === productData.title) return; // skip current product

      const div = document.createElement('div');
      div.className = 'related-item';
      div.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.title}" />
        <h4>${item.title}</h4>
        <div class="price">₹${item.price}</div>
      `;

      div.addEventListener('click', () => {
        updateProductDetails(item);
      });

      relatedList.appendChild(div);
    });
  }

  renderRelatedItems();

  // CART FUNCTIONS

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

  // Add to cart button (bottom-right cart icon)
  document.querySelector('.bottom-cart-icon').addEventListener('click', () => {
    const title = productTitle.textContent;
    const price = parseFloat(productPrice.textContent);
    const imgSrc = productImg.src;
    const size = productSize.value;

    const existingItem = cartItems.find(item => item.title === title && item.size === size);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ title, price, imgSrc, size, quantity: 1 });
    }

    saveCartAndRender();
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
