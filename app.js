// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Smartphone X",
        price: 899.99,
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/336d29ee-2791-48f0-a075-8ff0109df49e.png",
        description: "Latest flagship smartphone with advanced camera system, powerful processor, and all-day battery life.",
        category: "Smartphones"
    },
    {
        id: 2,
        name: "UltraSlim Laptop Pro",
        price: 1299.99,
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8f032e5a-8592-4a26-9259-bf60e2ee09eb.png",
        description: "Lightweight yet powerful laptop with stunning display, fast performance, and ultra-portable design.",
        category: "Laptops"
    },
    {
        id: 3,
        name: "Smart Watch Series 5",
        price: 349.99,
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/64b14293-51cd-4da5-a08d-6f671ff051a1.png",
        description: "Advanced smartwatch with health monitoring, GPS, and always-on retina display.",
        category: "Wearables"
    },
    {
        id: 4,
        name: "Wireless Noise-Canceling Headphones",
        price: 299.99,
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/080f90df-6ad3-40d1-aa48-0d79fddbfbde.png",
        description: "Immersive sound experience with adaptive noise cancellation and 30-hour battery life.",
        category: "Audio"
    },
    {
        id: 5,
        name: "Gaming Console X",
        price: 499.99,
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cd9d1d49-c506-45b2-9b5a-bd70b59013d9.png",
        description: "Next-generation gaming console with 4K graphics, fast loading times, and exclusive titles.",
        category: "Gaming"
    },
    {
        id: 6,
        name: "Professional DSLR Camera",
        price: 1499.99,
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/98dfc7bb-e0c5-4257-8e16-9b0ce3f115b4.png",
        description: "High-resolution camera with advanced autofocus, 4K video, and exceptional low-light performance.",
        category: "Cameras"
    },
    {
        id: 7,
        name: "Wireless Charging Pad",
        price: 49.99,
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/28f03459-2225-46bf-80f4-5a3f5396706a.png",
        description: "Fast wireless charging pad compatible with all Qi-enabled devices with LED indication.",
        category: "Accessories"
    },
    {
        id: 8,
        name: "Portable Bluetooth Speaker",
        price: 129.99,
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e3ce1f7e-45a4-4c4a-aa7e-e1a80a9ef68a.png",
        description: "Waterproof speaker with 360° sound, party lights, and 24-hour playtime.",
        category: "Audio"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartButton = document.getElementById('cartButton');
const closeCart = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
    renderCartItems();
    
    // Event listeners
    cartButton.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    closeModal.addEventListener('click', closeProductModal);
    
    // Close modal when clicking outside
    productModal.addEventListener('click', function(e) {
        if (e.target === productModal) {
            closeProductModal();
        }
    });
});

// Render products to the grid
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg overflow-hidden shadow-md';
        productCard.innerHTML = `
            <div class="relative">
                <img src="${product.image}" alt="${product.name} product image showing design and features" class="w-full h-56 object-cover">
                <button class="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
                    <i class="far fa-heart text-gray-600"></i>
                </button>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-1">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-3">${product.category}</p>
                <div class="flex justify-between items-center">
                    <span class="text-blue-600 font-bold">$${product.price.toFixed(2)}</span>
                    <button class="view-product bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-300" data-id="${product.id}">
                        View Details
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to view product buttons
    document.querySelectorAll('.view-product').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            openProductModal(productId);
        });
    });
    
    // Add event listeners to add to cart buttons in modal
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
            closeProductModal();
        });
    });
}

// Open product modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductPrice').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('modalProductDescription').textContent = product.description;
        document.getElementById('modalProductImage').src = product.image;
        document.getElementById('modalProductImage').alt = `Detailed view of ${product.name} showing all features and design elements`;
        document.querySelector('.add-to-cart').setAttribute('data-id', product.id);
        
        productModal.classList.remove('hidden');
    }
}

// Close product modal
function closeProductModal() {
    productModal.classList.add('hidden');
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('translate-x-full');
    renderCartItems();
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg cart-notification';
        notification.textContent = 'Product added to cart!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartSubtotal.textContent = '$0.00';
        return;
    }
    
    emptyCartMessage.classList.add('hidden');
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'flex items-center py-4 border-b border-gray-200';
        cartItem.innerHTML = `
            <div class="w-16 h-16 bg-gray-200 rounded overflow-hidden mr-4">
                <img src="${item.image}" alt="${item.name} product thumbnail" class="w-full h-full object-cover">
            </div>
            <div class="flex-grow">
                <h4 class="font-medium">${item.name}</h4>
                <p class="text-gray-600 text-sm">$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="ml-4">
                <p class="font-semibold">$${itemTotal.toFixed(2)}</p>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
}