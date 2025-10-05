// --- Header HTML Content ---
export const headerHTML = `
    <ul class="sidebar" id="sidebarMenu">
        <li class="close-btn">
            <a href="#" id="closeSidebar"><i class="fa-solid fa-times"></i></a> 
        </li>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#" class="brand-name">Divine Delectable</a></li>
    </ul>

    <div class="top-bar">
        <div class="logo">
            <img src="/images/logo.png" alt="Divine Delectable Logo">
            <span class="logo-text">A Taste of Heaven</span>
        </div>
        
        <div class="search hideOnMobile">
            <input type="text" placeholder="Search products...">
            <button><i class="fa-solid fa-search"></i></button>
        </div>
        
        <div class="account">
            <a href="#"><i class="fa-solid fa-user"></i> Account</a>
            <a href="#"><i class="fa-solid fa-shopping-cart"></i> Cart</a>
            <a href="#" class="menu-button" id="openSidebar"><i class="fa-solid fa-bars"></i></a>
        </div>
    </div>
    
    <nav class="hideOnMobile">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Recipes</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
`;

// --- Footer HTML Content (Updated for Professional Look) ---
export const footerHTML = `
    <div class="footer-content">
        
        <div class="footer-section footer-contact">
            <h3>Contact Us</h3>
            <p><i class="fa-solid fa-location-dot"></i> 123 Baker Street, Sweet City, 54321</p>
            <p><i class="fa-solid fa-phone"></i> (555) 123-4567</p>
            <p><i class="fa-solid fa-envelope"></i> info@divinedelectable.com</p>
        </div>

        <div class="footer-section footer-links">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="about.html">Our Story</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">FAQ</a></li>
            </ul>
        </div>
        
        <div class="footer-section footer-social">
            <h3>Follow Us</h3>
            <div class="social-icons">
                <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                <a href="#" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
            </div>
            <p class="logo-text" style="font-size: 1.2rem; margin-top: 15px;">Divine Delectable</p>
        </div>

    </div>
    
    <div class="footer-bottom">
        <p>&copy; <span id="currentYear"></span> Divine Delectable Bakery. All rights reserved.</p>
    </div>
`;