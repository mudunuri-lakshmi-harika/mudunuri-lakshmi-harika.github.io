// --- CART SYSTEM (SAME AS HOMEPAGE) ---
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const cartBox = document.getElementById("cartBox");
const cartIcon = document.getElementById("cartIcon");
const closeCartBtn = document.getElementById("closeCartBtn");

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

  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      cartData.splice(index, 1);
      saveCart();
      updateCartDisplay();
    });
  });

  document.querySelectorAll(".buy-now-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      const item = cartData[index];
      alert(`Proceeding to buy:\n${item.name} for Rs. ${item.price}`);
    });
  });
}

// Toggle cart
cartIcon.addEventListener("click", () => {
  cartBox.style.display = cartBox.style.display === "block" ? "none" : "block";
});

closeCartBtn.addEventListener("click", () => {
  cartBox.style.display = "none";
});

// Buy all button
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

updateCartDisplay();

// --- PRODUCT DETAILS ---
function loadProductDetails() {
  const name = localStorage.getItem("selectedProductName");
  const price = localStorage.getItem("selectedProductPrice");
  const image = localStorage.getItem("selectedProductImage");

  if (name && price && image) {
    document.getElementById("productName").textContent = name;
    document.getElementById("productPrice").textContent = `Rs. ${price}`;
    document.getElementById("productImage").src = image;
  }
}

document.getElementById("addToCartBtn").addEventListener("click", () => {
  const name = document.getElementById("productName").textContent;
  const price = parseInt(document.getElementById("productPrice").textContent.replace("Rs. ", ""));
  const image = document.getElementById("productImage").src;

  cartData.push({ name, price, image });
  saveCart();
  updateCartDisplay();
});

document.getElementById("buyNowBtn").addEventListener("click", () => {
  const name = document.getElementById("productName").textContent;
  const price = document.getElementById("productPrice").textContent;
  alert(`Proceeding to buy: ${name} for ${price}`);
});

// --- RELATED PRODUCTS CLICK ---
document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    const name = card.querySelector("h4").textContent;
    const price = card.querySelector("p").textContent.replace("Rs. ", "");
    const image = card.querySelector("img").getAttribute("src");

    localStorage.setItem("selectedProductName", name);
    localStorage.setItem("selectedProductPrice", price);
    localStorage.setItem("selectedProductImage", image);

    window.location.href = "product.html"; // Reload to same page
  });
});

// On load
loadProductDetails();
