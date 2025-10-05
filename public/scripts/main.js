// This is the file that runs in your browser
// It handles all client-side functionality

// Assuming components.js is in the same directory
import { headerHTML, footerHTML } from './components.js';

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
            setTimeout(hideSidebar, 300); 
        });
    });
}

// --- 3. Carousel Logic (Specific to index.html) ---
function setupCarousel() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-nav .dot');
    
    if (!carouselSlide || dots.length === 0) return; 

    let currentSlide = 0;
    const totalSlides = dots.length;
    let intervalId;

    const goToSlide = (slideIndex) => {
        // Calculate the translation based on the total number of slides
        carouselSlide.style.transform = `translateX(-${slideIndex * (100 / totalSlides)}%)`;
        
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


// --- 4. Product Fetching & Rendering Function ---
async function fetchAndRenderProducts() {
    const productGrid = document.getElementById('product-list');
    if (!productGrid) return; 

    productGrid.innerHTML = '<p>Loading delicious treats...</p>';

    try {
        // Use a relative path, which automatically points to localhost:5000
        const response = await fetch('/api/products'); 
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
        const data = await response.json();

        productGrid.innerHTML = ''; // Clear the loading message

        if (!data?.data?.products?.length) {
            productGrid.innerHTML = '<p>No products found at this time.</p>';
            return;
        }

        data.data.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.images[0] || '/images/placeholder.jpg'}" alt="${product.name}">
                </div>
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <a href="#" class="add-to-cart-btn" data-product-id="${product._id}">Add to Cart</a>
            `;
            productGrid.appendChild(productCard);
        });
        
        // Add to Cart Listener (Delegated)
        productGrid.addEventListener('click', (event) => {
            const addToCartBtn = event.target.closest('.add-to-cart-btn');
            if (addToCartBtn) {
                event.preventDefault(); 
                const productId = addToCartBtn.dataset.productId;
                if (productId) {
                    console.log(`Product with ID ${productId} was added to the cart!`);
                    // alert(`Added ${productId} to cart!`); // Optional user feedback
                }
            }
        });

    } catch (error) {
        console.error('Failed to fetch products:', error);
        productGrid.innerHTML = '<p>Failed to load products. Check console for server errors.</p>';
    }
}


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Insert components first
    initializePageComponents();
    
    // 2. Set up interactive elements
    setupSidebar();
    
    // 3. Run functionality specific to the index page
    fetchAndRenderProducts();
    setupCarousel();
});