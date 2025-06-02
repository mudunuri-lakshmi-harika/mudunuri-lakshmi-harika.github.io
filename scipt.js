const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const cartBox = document.getElementById("cartBox");
const cartIcon = document.getElementById("cartIcon");
const closeCartBtn = document.getElementById("closeCartBtn");

// Load cart
let cartData = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartData));
}

function updateCartDisplay() {
  cartItems.innerHTML = "";
  let totalAmount = 0;

  cartData.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price">Rs. ${item.price}</span>
        </div>
        <div class="cart-item-actions">
          <button class="remove-item" data-index="${index}">×</button>
          <button class="buy-now-item" data-index="${index}">Buy Now</button>
        </div>
      </div>
    `;
    cartItems.appendChild(li);
    totalAmount += item.price;
  });

  cartTotal.textContent = `Total: Rs. ${totalAmount}`;
  cartCount.textContent = cartData.length;

  // Remove item button
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      cartData.splice(index, 1);
      saveCart();
      updateCartDisplay();
    });
  });

  // Buy Now per item
  document.querySelectorAll(".buy-now-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      const item = cartData[index];
      alert(`Proceeding to buy:\n${item.name} for Rs. ${item.price}`);
    });
  });
}

// Add to Cart (from homepage)
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const itemName = button.getAttribute("data-name");
    const itemPrice = parseInt(button.getAttribute("data-price"));
    const itemImage = button.getAttribute("data-image"); // <- Ensure you include this attribute

    cartData.push({ name: itemName, price: itemPrice, image: itemImage });
    saveCart();
    updateCartDisplay();
  });
});

// Buy Now (from homepage)
document.querySelectorAll(".buy-now").forEach(button => {
  button.addEventListener("click", () => {
    const itemName = button.getAttribute("data-name");
    const itemPrice = button.getAttribute("data-price");
    alert(`Proceeding to buy: ${itemName} for Rs. ${itemPrice}`);
  });
});

// Toggle Cart
cartIcon.addEventListener("click", () => {
  cartBox.style.display = cartBox.style.display === "block" ? "none" : "block";
});

// Close Cart
closeCartBtn.addEventListener("click", () => {
  cartBox.style.display = "none";
});

// One-button "Buy Now" for entire cart
const buyNowBtn = document.createElement("button");
buyNowBtn.textContent = "Buy All";
buyNowBtn.classList.add("cart-buy-now");
buyNowBtn.addEventListener("click", () => {
  if (cartData.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  const totalAmount = cartData.reduce((sum, item) => sum + item.price, 0);
  alert(`Proceeding to checkout\nItems: ${cartData.length}\nTotal: Rs. ${totalAmount}`);
});
cartBox.appendChild(buyNowBtn);

// On page load
updateCartDisplay();

// Save selected product and navigate to product page
function viewProduct(name, price, image) {
  localStorage.setItem("selectedProductName", name);
  localStorage.setItem("selectedProductPrice", price);
  localStorage.setItem("selectedProductImage", image);
  window.location.href = "product.html";
}
// Save selected product and navigate to product page
function viewProduct(name, price, image) {
  localStorage.setItem("selectedProductName", name);
  localStorage.setItem("selectedProductPrice", price);
  localStorage.setItem("selectedProductImage", image);
  window.location.href = "product.html";
}

// ▶️ Play promotional video on page load
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".promo-video");
  if (video) {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Promo video started playing.");
        })
        .catch(error => {
          console.warn("Autoplay was blocked. User may need to interact with the page.", error);
        });
    }
  }
});
