// Sample product data
const products = [
    { id: 1, name: "Laptop", price: 999, image: "public/laptop.jpg" },
    { id: 2, name: "Phone", price: 699, image: "public/phone.jpg" },
    { id: 3, name: "Headphones", price: 199, image: "public/headphone.jpg" },
];

let cart = [];

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    products.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
});

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        cartItems.innerHTML += `<p>${item.name} - $${item.price}</p>`;
        total += item.price;
    });
    
    cartTotal.textContent = total;
    cartCount.textContent = cart.length;
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('active');
}

// Open cart 