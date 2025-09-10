document.addEventListener('DOMContentLoaded', () => {
  const authSection = document.getElementById('auth-section');
  const loginModal = document.getElementById('login-modal');
  const closeBtn = document.querySelector('.close-btn');
  const loginForm = document.getElementById('login-form');
  const errorMsg = document.getElementById('error-msg');
  const profilePopup = document.getElementById('profile-popup');
  const profileName = document.getElementById('profile-name');
  const profileCartCount = document.getElementById('profile-cart-count');
  const profileBuyBtn = document.getElementById('profile-buy-btn');
  const profileLogoutBtn = document.getElementById('profile-logout-btn');
  const cartCountDisplay = document.querySelector('.cart-item-count');
  const addToCartBtn = document.getElementById('add-to-cart-btn');

  // ✅ Clear login and cart only on true refresh (not back)
  if (performance.navigation.type === 1) {
    const prevEmail = localStorage.getItem('email');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    if (prevEmail) {
      localStorage.removeItem(`cartItems_${prevEmail}`);
    }
  }

  function getCartKey(email) {
    return `cartItems_${email}`;
  }

  function updateCartCount(email) {
    if (!email) {
      cartCountDisplay.textContent = '0';
      profileCartCount.textContent = '0';
      cartCountDisplay.style.display = 'none';
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem(getCartKey(email))) || [];
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountDisplay.textContent = totalCount;
    profileCartCount.textContent = totalCount;
    cartCountDisplay.style.display = totalCount > 0 ? 'inline-block' : 'none';
  }

  function updateAuthUI() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('email');

    if (isLoggedIn && email) {
      authSection.innerHTML = `
        <button id="profile-trigger" style="background:none; border:none; color:#007bff; text-decoration:underline; cursor:pointer;">👤 ${email}</button>
      `;

      document.getElementById('profile-trigger').addEventListener('click', () => {
        profileName.textContent = `👤 ${email}`;
        updateCartCount(email);
        profilePopup.style.display = 'block';
      });

      profileBuyBtn.addEventListener('click', () => {
        const cartItems = JSON.parse(localStorage.getItem(getCartKey(email))) || [];
        if (cartItems.length === 0) {
          alert('Your cart is empty!');
          return;
        }
        window.location.href = 'checkout.html';
      });

      profileLogoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem(getCartKey(email));
        profilePopup.style.display = 'none';
        updateCartCount(null);
        updateAuthUI();
      });

      updateCartCount(email);
    } else {
      authSection.innerHTML = `
        <button id="auth-btn" style="background:none; border:none; color:#007bff; text-decoration:underline; cursor:pointer;">Login</button>
      `;
      updateCartCount(null);

      document.getElementById('auth-btn').addEventListener('click', () => {
        loginModal.style.display = 'flex';
      });
    }
  }

  updateAuthUI();

  closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
    const validPassword = password.length >= 6;

    if (validEmail && validPassword && emailInput === 'user@example.com' && password === 'pass123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', emailInput);
      loginModal.style.display = 'none';
      errorMsg.textContent = '';
      updateAuthUI();
    } else {
      errorMsg.textContent = 'Invalid email or password';
    }
  });

  window.addEventListener('click', (e) => {
    if (!e.target.closest('#profile-popup') && !e.target.closest('#profile-trigger')) {
      profilePopup.style.display = 'none';
    }

    if (e.target === loginModal) {
      loginModal.style.display = 'none';
    }
  });

  addToCartBtn?.addEventListener('click', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('email');

    if (!isLoggedIn || !email) {
      alert('Please login to add items to cart.');
      updateCartCount(null);
      return;
    }

    const cartKey = getCartKey(email);
    const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    const newItem = { id: Date.now(), quantity: 1 };
    cartItems.push(newItem);
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
    updateCartCount(email);
  });
});
