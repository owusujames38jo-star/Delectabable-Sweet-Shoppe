// ------------------------------------------------------------------
// ⭐ CART UTILITIES (No Change) ⭐
// ------------------------------------------------------------------

// Function to safely retrieve cart data from localStorage
function getCart() {
    const cart = localStorage.getItem('divineDelightsCart');
    // If cart is null or undefined, return an empty array, otherwise return the parsed JSON
    return cart ? JSON.parse(cart) : [];
}

// Function to save the current cart data to localStorage
function saveCart(cart) {
    localStorage.setItem('divineDelightsCart', JSON.stringify(cart));
}

// Function to update the number shown on the cart icon
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // 🛠️ FIX: Select by class, as used in checkout.html: <span class="cart-count">
    const cartCountElement = document.querySelector('.cart-count');
    
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        // Toggle visibility if count is zero
        // Using 'block' for visibility as it sits inline but sometimes needs block properties for alignment
        cartCountElement.style.display = totalItems > 0 ? 'block' : 'none'; 
    }
}

// ------------------------------------------------------------------
// ⭐ NEW PAYMENT UI LOGIC (UPDATED) ⭐
// ------------------------------------------------------------------

/**
 * Handles showing/hiding the credit card input fields based on the selected radio button.
 * It also adds an 'active' class to the selected payment tile for visual styling.
 */
function handlePaymentMethodChange() {
    // 🛠️ NOTE: The payment method radio buttons are named "payment-method" in the JS and now in the corrected HTML
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]'); 
    const ccFieldsContainer = document.getElementById('credit-card-fields');
    const paymentTiles = document.querySelectorAll('.payment-option-tile'); // Select all tile containers
    
    let selectedMethod = 'card'; // Default to card

    paymentMethods.forEach(input => {
        // Remove 'active' class from all tiles first
        const tile = input.closest('.payment-option-tile');
        if (tile) {
            tile.classList.remove('active');
        }

        if (input.checked) {
            selectedMethod = input.dataset.method;
            // Add 'active' class to the currently selected tile
            if (tile) {
                tile.classList.add('active');
            }
        }
    });

    if (ccFieldsContainer) {
        if (selectedMethod === 'card') {
            // Show the credit card fields by adding the 'active' class
            ccFieldsContainer.classList.add('active');
        } else {
            // Hide the credit card fields by removing the 'active' class
            ccFieldsContainer.classList.remove('active');
        }
    }
}

// ------------------------------------------------------------------
// ⭐ CHECKOUT PAGE MANAGEMENT (No Change) ⭐
// ------------------------------------------------------------------

/**
 * Removes an item from the cart.
 * @param {string} productId - The ID of the product to remove.
 */
function removeItem(productId) {
    let cart = getCart();
    // Filter out the item with the matching product ID
    cart = cart.filter(item => item.id !== productId);

    saveCart(cart);
    updateCartCount();
    // Re-populate the summary to update the view instantly
    if (document.querySelector('.checkout-container')) {
        populateOrderSummary();
    }
}

/**
 * Changes the quantity of an item in the cart.
 * @param {string} productId - The ID of the product to modify.
 * @param {number} newQuantity - The new quantity.
 */
function changeQuantity(productId, newQuantity) {
    let cart = getCart();
    const quantity = parseInt(newQuantity);

    if (quantity <= 0) {
        // If the new quantity is 0 or less, remove the item
        removeItem(productId);
        return;
    }

    const itemToUpdate = cart.find(item => item.id === productId);

    if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
    }
    
    saveCart(cart);
    updateCartCount();
    // Re-populate the summary to update the view instantly
    if (document.querySelector('.checkout-container')) {
        populateOrderSummary();
    }
}


// ------------------------------------------------------------------
// ⭐ FORM VALIDATION FUNCTION (CORRECTED) ⭐
// ------------------------------------------------------------------

/**
 * Validates the required fields in the shipping and payment forms.
 * Uses the .cc-required class to determine which fields are conditionally required.
 * @returns {boolean} True if all required fields are valid, otherwise false.
 */
function validateCheckoutForm() {
    const form = document.getElementById('shipping-form');
    let isValid = true;
    
    // Check which payment method is selected
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked')?.dataset.method || 'card';

    // Get all fields marked as required in the HTML (including shipping and CC fields)
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        // Use the CSS class to determine if it's a conditionally required credit card field
        const isCCField = field.classList.contains('cc-required'); 
        
        // Define when this field SHOULD be validated
        // 1. If it's a non-CC field (like email or address) -> always validate (shouldValidate is true)
        // 2. If it's a CC field AND 'card' method is selected -> validate it (shouldValidate is true)
        // 3. If it's a CC field AND 'card' method is NOT selected -> skip validation (shouldValidate is false)
        const shouldValidate = !isCCField || (isCCField && selectedMethod === 'card');

        // Reset validity state first
        field.classList.remove('error');
        field.setCustomValidity(''); 
        
        // Skip validation if we decided we shouldn't validate this specific field (e.g., hidden CC field)
        if (!shouldValidate) {
            return; 
        }
        
        // --- START VALIDATION FOR RELEVANT FIELDS ---
        
        // 1. Check for basic empty value
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            // Provide a more specific error message for CC fields if they are required
            field.setCustomValidity(isCCField ? 'Card payment requires this field.' : 'This field is required.'); 
        } 
        
        // 2. Run custom validation checks if field is relevant and not already marked invalid
        else {
            
            if (field.id === 'email' && !field.value.includes('@')) {
                isValid = false;
                field.classList.add('error');
                field.setCustomValidity('Please enter a valid email address.');
            } 
            // Simple card number check
            else if (field.id === 'card-number' && field.value.replace(/\s/g, '').length !== 16) {
                isValid = false;
                field.classList.add('error');
                field.setCustomValidity('Card number must be 16 digits.');
            } 
            // CVV check
            else if (field.id === 'cvv' && (field.value.length < 3 || field.value.length > 4)) {
                isValid = false;
                field.classList.add('error');
                field.setCustomValidity('CVV must be 3 or 4 digits.');
            }
        }
        
        // Important: Report validity to show native browser tooltips for invalid fields
        if (field.classList.contains('error')) {
            field.reportValidity();
        }
    });

    return isValid;
}


// ------------------------------------------------------------------
// ⭐ EXISTING FUNCTIONS (No Change) ⭐
// ------------------------------------------------------------------

// Function to add a product to the cart
function addToCart(product) {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        // If the item already exists, just increase the quantity
        existingItem.quantity += 1;
    } else {
        // Otherwise, add the new item with quantity 1
        product.quantity = 1;
        // Ensure price is stored as a number, not just parsed once for the checkout view
        product.price = parseFloat(product.price); 
        cart.push(product);
    }
    
    saveCart(cart);
    updateCartCount();
    console.log(`${product.name} added to cart!`); 
}

// Function to clear the entire cart from local storage
function clearCart() {
    localStorage.removeItem('divineDelightsCart');
    updateCartCount();
    // Refresh the checkout summary after clearing
    if (document.querySelector('.checkout-container')) {
        populateOrderSummary();
    }
}

// Function to display cart items and calculate costs on the checkout page
function populateOrderSummary() {
    const cart = getCart();
    // 🛠️ Updated to select the elements needed for checkout page structure
    const cartItemsContainer = document.getElementById('cart-items-container');
    const subtotalElement = document.getElementById('subtotal');
    const totalCostElement = document.getElementById('total-cost');
    const shippingElement = document.getElementById('shipping-cost');
    const clearCartButton = document.getElementById('clear-cart-btn'); // Also grab the clear button
    const placeOrderButton = document.getElementById('checkout-btn'); // Grab the place order button

    const shippingCost = 5.00; // Fixed shipping for now

    // 🛠️ Removed non-existent ID 'order-summary-content'
    if (!cartItemsContainer || !subtotalElement || !totalCostElement || !shippingElement) {
        // Safety check: only run this function on the checkout page if all elements exist
        return; 
    }

    cartItemsContainer.innerHTML = ''; // Clear items container
    shippingElement.textContent = `$${shippingCost.toFixed(2)}`; // Set shipping cost
    
    // --- Empty Cart Logic ---
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="fa-solid fa-cookie-bite"></i>
                <p>Your basket is feeling light! Add some baked goods to sweeten your day.</p>
                <a href="index.html" class="cta-button">Start Shopping</a>
            </div>
        `;
        subtotalElement.textContent = '$0.00';
        totalCostElement.textContent = '$0.00'; 
        shippingElement.textContent = '$0.00'; // Shipping is free/waived if cart is empty
        
        // Disable and hide buttons when cart is empty
        if (clearCartButton) clearCartButton.style.display = 'none';
        if (placeOrderButton) placeOrderButton.disabled = true;

        return;
    }
    
    // --- Cart Not Empty Logic ---

    // Enable buttons if items are in the cart
    if (clearCartButton) clearCartButton.style.display = 'inline-block';
    if (placeOrderButton) placeOrderButton.disabled = false;


    let subtotal = 0;

    cart.forEach(item => {
        const price = parseFloat(item.price);
        const itemTotal = price * item.quantity;
        subtotal += itemTotal;

        // Structured HTML for checkout page, including quantity input and remove button
        const itemHTML = `
            <div class="cart-item" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-price">$${price.toFixed(2)}</p>
                    <div class="item-controls">
                        <label for="qty-${item.id}">Qty:</label>
                        <input type="number" id="qty-${item.id}" value="${item.quantity}" min="1" 
                            onchange="changeQuantity('${item.id}', this.value)" class="item-quantity-input">
                        <button class="remove-btn" onclick="removeItem('${item.id}')" aria-label="Remove ${item.name}">
                            <i class="fa-solid fa-trash-can"></i> Remove
                        </button>
                    </div>
                </div>
                <span class="item-total-price">$${itemTotal.toFixed(2)}</span>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;
    });

    // Calculate totals
    const finalTotal = subtotal + shippingCost;
    
    // Update summary totals
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalCostElement.textContent = `$${finalTotal.toFixed(2)}`;
    shippingElement.textContent = `$${shippingCost.toFixed(2)}`; // Display shipping cost
    
    // Set up the listener for the "Clear Cart" button if it exists on the page
    if (clearCartButton) {
        clearCartButton.onclick = clearCart;
    }
}


// ------------------------------------------------------------------
// ⭐ INITIALIZATION & EVENT LISTENERS (PWA FIX - CORRECTED PATH) ⭐
// ------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial load: Update cart count on all pages
    updateCartCount();

    // 🌟 PWA FIX: Service Worker Registration 🌟
    // The path is changed to '/service-worker.js' to ensure the browser 
    // looks in the site's root directory, fixing the 404 error if the script 
    // is in the root.
    if ('serviceWorker' in navigator) {
        // FIX: Use root-relative path '/'
        navigator.serviceWorker.register('/public/sw.js', {
            scope: '/public/'
        })
            .then(reg => console.log('Service Worker registered successfully. Scope:', reg.scope))
            .catch(err => console.error('Service Worker registration failed:', err));
    }

    // 2. Add event listeners for the 'Add to Cart' buttons (on index.html/product pages)
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const button = card.querySelector('.add-to-cart-btn');
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault(); 
                
                const product = {
                    id: card.dataset.productId,
                    name: card.dataset.productName,
                    // Parse price immediately for use in cart functions
                    price: parseFloat(card.dataset.productPrice), 
                    image: card.dataset.productImage 
                };
                
                if (product.id && product.name && !isNaN(product.price)) {
                    addToCart(product);
                } else {
                    console.error("Missing product data on card:", card);
                }
            });
        }
    });

    // 3. Populate Checkout Summary and add listeners (if we are on the checkout page)
    if (document.querySelector('.checkout-container')) {
        populateOrderSummary();
        
        // 🟢 NEW: Add listener to payment method radio buttons
        const paymentMethodInputs = document.querySelectorAll('input[name="payment-method"]');
        paymentMethodInputs.forEach(input => {
            input.addEventListener('change', handlePaymentMethodChange);
        });

        // Initialize payment fields state on load
        handlePaymentMethodChange(); 
        
        // Add listener for the main "Proceed to Payment" button on the checkout page
        const checkoutButton = document.getElementById('checkout-btn');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', (e) => { // Use 'e' to access event object if needed
                e.preventDefault(); // Prevents default button behavior if it was type="submit"
                const cart = getCart();

                if (cart.length === 0) {
                    alert('Your cart is empty. Please add items before checking out.');
                    return;
                }
                
                // 🟢 Run Validation before proceeding
                if (!validateCheckoutForm()) {
                    // Validation function will handle highlighting fields and showing native messages
                    alert('Please complete all required fields and correct any errors before placing your order.');
                    return;
                }
                
                // If cart has items AND form is valid: Proceed with simulated order
                alert('Order placed successfully! (Form Data Validated. This is a demo. Actual payment processing would happen here.)');
                
                // Clear the cart and redirect after successful order
                clearCart();
                window.location.href = 'index.html'; // Redirect to home page
            });
        }
        
        // Add listener for the form submission to prevent default action
        const shippingForm = document.getElementById('shipping-form');
        if (shippingForm) {
            shippingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Submitting the form will now trigger the checkout button's validation logic
                document.getElementById('checkout-btn').click();
            });
        }
    }
});