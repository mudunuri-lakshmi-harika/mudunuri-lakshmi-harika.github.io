const CartItems=document.querySelector(".cart-items");
function DisplayCartItems(){
  const items=JSON.parse(localStorage.getItem('cart'));
  items.forEach(item => {
    const cartItem=document.createElement("div");
    cartItem.className="cart_item";
    cartItem.innerHTML=`
    <div class="cart_item">
              <p class="cart_id" >${item.id}</p>
              <p class="cart_title">${item.title}</p>
              <img src="${item.images}" alt="${item.title}" class="cart_img"/>
              <p class="cart_price">${item.price}</p>
              <p class="cart_delete">Delete</p>
    `
    CartItems.appendChild(cartItem);
  });
}
DisplayCartItems();
