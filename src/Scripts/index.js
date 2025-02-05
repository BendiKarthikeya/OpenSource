document.addEventListener("DOMContentLoaded", () => {
    loadCartFromStorage(); // Load cart from local storage on page load

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });

    updateCartTotal();
});

// 🛒 Function to Add Products to Cart
function addToCart(event) {
    const product = event.target.closest(".product");
    const productId = product.getAttribute("data-id");
    const productName = product.querySelector(".product-name").innerText;
    const productPrice = parseFloat(product.querySelector(".product-price").innerText.replace("$", ""));
    const productImage = product.querySelector("img").src;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartTotal();
}

// ❌ Function to Remove Items from Cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartTotal();
}

// 🔄 Function to Load Cart from Local Storage
function loadCartFromStorage() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.querySelector(".cart-items");
    cartContainer.innerHTML = "";

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <p>${item.name} - $${item.price} (x${item.quantity})</p>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (e) => {
            removeFromCart(e.target.getAttribute("data-id"));
        });
    });

    updateCartTotal();
}

// 💰 Function to Update Cart Total
function updateCartTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.querySelector(".cart-total").innerText = `Total: $${total.toFixed(2)}`;
}
