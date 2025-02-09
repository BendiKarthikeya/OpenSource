document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  updateCartTotal();
});

// 🛒 Function to Add Products to Cart
function addToCart(event) {
  const product = event.target.closest(".product");
  const productId = product.getAttribute("data-id");

  // ✅ Fix for product name selection (handles h3 correctly)
  const productName = product.querySelector("h3") ;
  // ✅ Fix for price selection (selects the final price correctly)
  const productPrice = parseFloat(
    product.querySelector(".text-primary").innerText.replace("$", "")
  );

  const productImage = product.querySelector("img").src;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product is already in cart
  let existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1; // Increase quantity if already in cart
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartFromStorage(); // 🔄 Updates cart display
}

// ❌ Function to Remove Items from Cart (Reduce Quantity or Remove)
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1; // Reduce quantity by 1
    } else {
      cart.splice(itemIndex, 1); // Remove item if quantity is 1
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartFromStorage();
}

// 🔄 Function to Load Cart from Local Storage and Display
function loadCartFromStorage() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".cart-items");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" width="50">
        <p>${item.name} - $${item.price} (x${item.quantity})</p>
        <button class="remove-item btn btn-danger btn-sm" data-id="${item.id}">Remove</button>
      `;
      cartContainer.appendChild(cartItem);
    });

    // Add event listeners for "Remove" buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        removeFromCart(e.target.getAttribute("data-id"));
      });
    });
  }

  updateCartTotal();
}

// 💰 Function to Update Cart Total
function updateCartTotal() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.querySelector(".cart-total").innerText = `Total: $${total.toFixed(2)}`;
}

// 🔄 Initial Load for All Products
loadCartFromStorage();
