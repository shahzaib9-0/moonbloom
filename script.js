// Moon Bloom - E-commerce JavaScript

// Product data array with all available images
const products = [
    { 
        name: "Lunar Crystal Lamp", 
        price: 89.99, 
        image: "images/1000108187.jpg",
        description: "Elegant crystal lamp with soft moonlight glow"
    },
    { 
        name: "Moonstone Jewelry Set", 
        price: 149.99, 
        image: "images/1000108188.jpg",
        description: "Premium moonstone necklace and earrings"
    },
    { 
        name: "Celestial Perfume", 
        price: 79.99, 
        image: "images/1000108189.jpg",
        description: "Mystical fragrance inspired by moonlit nights"
    },
    { 
        name: "Starlight Candle", 
        price: 34.99, 
        image: "images/1000108190.jpg",
        description: "Hand-poured candle with starry wax patterns"
    },
    { 
        name: "Moon Phase Wall Art", 
        price: 199.99, 
        image: "images/1000108191.jpg",
        description: "Beautiful wall hanging depicting moon phases"
    },
    { 
        name: "Aurora Dream Catcher", 
        price: 64.99, 
        image: "images/1000108192.jpg",
        description: "Handcrafted dream catcher with aurora colors"
    },
    { 
        name: "Cosmic Tea Set", 
        price: 124.99, 
        image: "images/1000108193.jpg",
        description: "Ceramic tea set with galaxy-inspired design"
    },
    { 
        name: "Lunar Garden Kit", 
        price: 49.99, 
        image: "images/1000108194.jpg",
        description: "Complete kit for growing moon garden plants"
    },
    { 
        name: "Stardust Bath Salts", 
        price: 29.99, 
        image: "images/1000108195.jpg",
        description: "Relaxing bath salts with shimmering stardust"
    },
    { 
        name: "Nebula Throw Blanket", 
        price: 89.99, 
        image: "images/1000108196.jpg",
        description: "Soft blanket with nebula-inspired patterns"
    },
    { 
        name: "Moonbeam Essential Oil", 
        price: 39.99, 
        image: "images/1000108197.jpg",
        description: "Calming essential oil blend for peaceful sleep"
    },
    { 
        name: "Galaxy Phone Case", 
        price: 24.99, 
        image: "images/1000108198.jpg",
        description: "Protective case with mesmerizing galaxy design"
    },
    { 
        name: "Cosmic Meditation Cushion", 
        price: 74.99, 
        image: "images/1000108199.jpg",
        description: "Comfortable cushion for meditation and relaxation"
    },
    { 
        name: "Lunar Calendar", 
        price: 19.99, 
        image: "images/1000108200.jpg",
        description: "Beautiful wall calendar tracking moon phases"
    },
    { 
        name: "Stellar Night Light", 
        price: 44.99, 
        image: "images/1000108202.jpg",
        description: "Soft night light projecting star patterns"
    }
];

// Cart functionality
let cart = [];
let cartCount = 0;

// DOM elements
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartCountElement = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeCart = document.getElementById('closeCart');
const searchBar = document.querySelector('.search-bar');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    updateCartDisplay();
});

// Load products into the grid
function loadProducts(productsToShow = products) {
    productGrid.innerHTML = '';
    
    productsToShow.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productGrid.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4='">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="add-to-cart" onclick="addToCart(${index})">
            <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
    `;
    
    return card;
}

// Add product to cart
function addToCart(productIndex) {
    const product = products[productIndex];
    const existingItem = cart.find(item => item.id === productIndex);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productIndex,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    cartCount += 1;
    updateCartDisplay();
    showAddToCartAnimation();
}

// Remove product from cart
function removeFromCart(productIndex) {
    const itemIndex = cart.findIndex(item => item.id === productIndex);
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        cartCount -= item.quantity;
        cart.splice(itemIndex, 1);
        updateCartDisplay();
    }
}

// Update cart quantity
function updateCartQuantity(productIndex, newQuantity) {
    const item = cart.find(item => item.id === productIndex);
    if (item) {
        const quantityDiff = newQuantity - item.quantity;
        item.quantity = newQuantity;
        cartCount += quantityDiff;
        
        if (item.quantity <= 0) {
            removeFromCart(productIndex);
        } else {
            updateCartDisplay();
        }
    }
}

// Update cart display
function updateCartDisplay() {
    cartCountElement.textContent = cartCount;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.6); padding: 2rem;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
    } else {
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZTwvdGV4dD48L3N2Zz4='">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="quantity-controls">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" class="quantity-btn">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" class="quantity-btn">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="remove-btn">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        
        cartTotal.textContent = total.toFixed(2);
    }
}

// Show add to cart animation
function showAddToCartAnimation() {
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.style.transform = 'scale(1.2)';
    cartBtn.style.boxShadow = '0 0 25px rgba(138, 43, 226, 0.8)';
    
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
        cartBtn.style.boxShadow = '0 0 20px rgba(138, 43, 226, 0.6)';
    }, 300);
}

// Setup event listeners
function setupEventListeners() {
    // Cart modal toggle
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
    
    // Search functionality
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        loadProducts(filteredProducts);
    });
    
    // CTA button scroll to products
    const ctaBtn = document.querySelector('.cta-btn');
    ctaBtn.addEventListener('click', () => {
        document.querySelector('.main-content').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Search products
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    loadProducts(filteredProducts);
}

// Checkout functionality (placeholder)
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase! Total: $${total.toFixed(2)}\n\nThis is a demo - no actual payment was processed.`);
    
    // Clear cart after checkout
    cart = [];
    cartCount = 0;
    updateCartDisplay();
    cartModal.classList.remove('active');
}

// Add checkout event listener
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
});

// Add CSS for quantity controls and remove button
const style = document.createElement('style');
style.textContent = `
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0.5rem 0;
    }
    
    .quantity-btn {
        background: rgba(138, 43, 226, 0.2);
        border: 1px solid rgba(138, 43, 226, 0.5);
        color: #ffffff;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .quantity-btn:hover {
        background: rgba(138, 43, 226, 0.4);
        transform: scale(1.1);
    }
    
    .quantity {
        color: #ffffff;
        font-weight: 600;
        min-width: 20px;
        text-align: center;
    }
    
    .remove-btn {
        background: rgba(255, 107, 107, 0.2);
        border: 1px solid rgba(255, 107, 107, 0.5);
        color: #ff6b6b;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.5rem;
    }
    
    .remove-btn:hover {
        background: rgba(255, 107, 107, 0.4);
        transform: scale(1.1);
    }
    
    .product-description {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        line-height: 1.4;
    }
`;
document.head.appendChild(style);

// Add loading animation for images
function addImageLoadingAnimation() {
    const images = document.querySelectorAll('.product-image, .cart-item-image');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.addEventListener('error', function() {
            this.style.opacity = '0.7';
        });
    });
}

// Initialize image loading animations
document.addEventListener('DOMContentLoaded', addImageLoadingAnimation);

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', addScrollAnimations);
