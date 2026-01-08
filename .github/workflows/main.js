// --- Product Data (Fake Database) ---
const products = [
    {
        id: 1,
        name: "Royal Black Silk Saree",
        price: 4500,
        image: "https://images.unsplash.com/photo-1610189012906-478338275202?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Premium Gold Sherwani",
        price: 12000,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Luxury Cotton Panjabi",
        price: 2500,
        image: "https://images.unsplash.com/photo-1626162383820-22c95e492212?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Velvet Evening Gown",
        price: 8500,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop"
    }
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Splash Screen Handling
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
        }, 1000);
    }, 2500); // Logo shows for 2.5 seconds

    // 2. Render Products
    renderProducts();
});

// --- State Management ---
let cart = [];

// --- Functions ---

function renderProducts() {
    const container = document.getElementById('product-container');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="price">৳${product.price}</span>
                <button class="btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
    
    // Simple visual feedback
    alert(`${product.name} added to cart!`);
    toggleCart(); // Auto open cart to show item
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Update Badge
    cartCount.innerText = cart.length;

    // Update Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        cartTotal.innerText = '৳0';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span>৳${item.price}</span>
                </div>
                <span class="remove-item" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </span>
            </div>
        `;
    }).join('');

    cartTotal.innerText = '৳' + total;
}

// --- Toggles & Modals ---

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('.overlay').classList.toggle('active'); // Note: overlay logic needs selector fix in css or here
    // Simple overlay toggle fix
    const overlay = document.querySelector('.overlay');
    if(overlay.style.display === 'block') {
        overlay.style.display = 'none';
    } else {
        overlay.style.display = 'block';
    }
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    toggleCart(); // Close sidebar
    document.getElementById('checkout-modal').style.display = 'flex';
}

function closeCheckout() {
    document.getElementById('checkout-modal').style.display = 'none';
}

function processPayment(event) {
    event.preventDefault();
    
    // Simulate Processing
    const btn = event.target.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "Processing...";
    btn.disabled = true;

    setTimeout(() => {
        alert("Order Placed Successfully! We will contact you soon.");
        cart = []; // Clear cart
        updateCartUI();
        closeCheckout();
        btn.innerText = originalText;
        btn.disabled = false;
    }, 2000);
}

