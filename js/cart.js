const CartItems = document.querySelector(".cart-items");

function DisplayCartItems() {
  const items = JSON.parse(localStorage.getItem("cart")) || []; // Ensure items is always an array

  if (items.length === 0) {
    console.warn("No items found in the cart.");
    return;
  }

  items.forEach(item => {
    console.log("Item:", item); // Debugging

    // Ensure 'image' property exists and is not undefined
    const imageUrl = item.image ? item.image : "mudunuri-lakshmi-harika.github.io/images/items/"; // Fallback image

    const cartItem = document.createElement("div");
    cartItem.className = "cart_item";
    cartItem.innerHTML = `
      <p class="cart_id">${item.id}</p>
      <p class="cart_title">${item.title}</p>
      <img src="${imageUrl}" alt="${item.title}" class="cart_img"/>
      <p class="cart_price">${item.price}</p>
      <p class="cart_delete">Delete</p>
    `;

    CartItems.appendChild(cartItem);
  });
}

DisplayCartItems();
