// This is the file that runs in your browser
// It handles all client-side functionality

// Assuming components.js is in the same directory
import { headerHTML, footerHTML } from './components.js';

// --- MOCK DATA: For front-end development without a backend API ---
// This structure must match what your cart.js expects.
const MOCK_PRODUCTS = [
    { 
        id: 'dd101', 
        name: 'Artisan Sourdough', 
        price: 5.99, 
        image: './images/product-1.jpg',
        description: 'Naturally leavened and baked fresh daily.'
    },
    { 
        id: 'dd102', 
        name: 'Chocolate Croissant', 
        price: 3.50, 
        image: './images/product-2.jpg',
        description: 'Flaky pastry filled with rich dark chocolate.'
    },
    { 
        id: 'dd103', 
        name: 'Red Velvet Cake Slice', 
        price: 7.50, 
        image: './images/product-3.jpg',
        description: 'Classic velvety cake with cream cheese frosting.'
    }
    // Add more mock products here for breads.html, pastries.html, etc.
];

// --- 1. Load Header, Footer, and Set Dynamic Year ---
function initializePageComponents() {
    // Insert Header and Footer HTML into the placeholders
    document.getElementById('header-placeholder').innerHTML = headerHTML;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;

    // Set dynamic year in the footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// --- 2. Mobile Sidebar Functionality ---
function setupSidebar() {
    // These IDs come from components.js
    const sidebar = document.getElementById('sidebarMenu');
    const openBtn = document.getElementById('openSidebar');
    const closeBtn = document.getElementById('closeSidebar');

    if (!sidebar || !openBtn || !closeBtn) return;

    // Open the sidebar when the menu button is clicked
    const showSidebar = (e) => {
        e.preventDefault();
        // Uses the CSS class 'show' for smooth slide transition
        sidebar.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevents scrolling behind the menu
    };

    // Close the sidebar when the close button is clicked
    const hideSidebar = (e) => {
        if (e) e.preventDefault();
        sidebar.classList.remove('show');
        document.body.style.overflow = 'auto'; // Re-enables scrolling
    };
    
    openBtn.addEventListener('click', showSidebar);
    closeBtn.addEventListener('click', hideSidebar);

    // Close sidebar if a link inside it is clicked
    sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            // Give a short delay before closing to allow navigation
            setTimeout(hideSidebar, 300); 
        });
    });
}

// --- 3. Carousel Logic (Specific to index.html) ---
function setupCarousel() {
    const carouselContainer = document.querySelector('.carousel-container'); // Need container for width calculations
    const carouselSlide = document.querySelector('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-nav .dot');
    
    if (!carouselSlide || dots.length === 0) return; 

    let currentSlide = 0;
    const totalSlides = dots.length;
    let intervalId;

    const goToSlide = (slideIndex) => {
        // NOTE: The calculation needs to be based on slide width, typically 100% of container.
        // Assuming your CSS sets each slide width correctly.
        carouselSlide.style.transform = `translateX(-${currentSlide * 100}%)`; 
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
        currentSlide = slideIndex;
    };

    const startAutoScroll = () => {
        return setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }, 5000);
    };

    // Initialize and handle auto-scroll restart on manual click
    const setupDotListeners = () => {
        clearInterval(intervalId); // Clear any old interval
        intervalId = startAutoScroll(); // Start new interval
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(intervalId); 
                goToSlide(index);
                // Restart auto-scroll after a short delay
                setTimeout(() => {
                    intervalId = startAutoScroll();
                }, 5000); 
            });
        });
    };
    
    goToSlide(0); // Initialize to the first slide
    setupDotListeners();
}


// --- 4. Product Rendering Function (Using Mock Data) ---
// This function renders products and sets up data attributes for cart.js to use.
function renderProducts(products = MOCK_PRODUCTS) {
    const productGrid = document.getElementById('product-list');
    if (!productGrid) return; // Exit if not on a product page

    // 🟢 ACCESSIBILITY IMPROVEMENT: Add ARIA roles to the product grid
    productGrid.setAttribute('role', 'region');
    productGrid.setAttribute('aria-labelledby', 'products-heading');
    
    // Assuming you have an H2 or H1 with the ID 'products-heading' before the grid.
    // In index.html, the H2 is "Our Signature Bestsellers". You should add id="products-heading" to it.

    productGrid.innerHTML = ''; // Clear content

    if (products.length === 0) {
        productGrid.innerHTML = '<p>No products found at this time.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // IMPORTANT: Set data attributes for cart.js's DOMContentLoaded listener to pick up
        productCard.setAttribute('data-product-id', product.id);
        productCard.setAttribute('data-product-name', product.name);
        productCard.setAttribute('data-product-price', product.price.toFixed(2));
        productCard.setAttribute('data-product-image', product.image);

        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name} - ${product.description}">
            </div>
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            
            <button class="add-to-cart-btn" aria-label="Add ${product.name} to cart">
                Add to Cart
            </button>
        `;
        productGrid.appendChild(productCard);
    });
    
    // NOTE: We don't need a custom Add to Cart listener here 
    // because the logic is already handled by cart.js's DOMContentLoaded listener, 
    // which looks for '.product-card' elements with data-attributes.
}


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Insert components first
    initializePageComponents();
    
    // 2. Set up interactive elements
    setupSidebar();
    
    // 3. Run functionality specific to the index page
    if (document.getElementById('product-list')) {
        renderProducts(); // Renders mock data on index.html
    }

    if (document.querySelector('.carousel-slide')) {
        setupCarousel();
    }
    
    // NOTE: Service worker registration and updateCartCount() are typically handled by cart.js
    // but they should run here if cart.js is not imported or does not have its own DOMContentLoaded listener.
});