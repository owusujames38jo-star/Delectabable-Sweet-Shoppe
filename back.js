const express = require('express');
const path = require('path');
const app = express();
// Use port 5000 as requested
const port = 5000; 

// =======================================================
// DUMMY DATABASE 
// =======================================================

const products = [
    {
        _id: 'prod101',
        name: 'Classic Chocolate Cake',
        description: 'Rich, moist chocolate cake with dark chocolate ganache.',
        price: 35.00,
        images: ['/images/carousel-cake-1.jpg'],
        category: 'Cake',
        isFeatured: true
    },
    {
        _id: 'prod102',
        name: 'Strawberry Cheesecake',
        description: 'Creamy New York-style cheesecake topped with fresh strawberries.',
        price: 42.50,
        images: ['/images/carousel-cake-2.jpg'],
        category: 'Cheesecake',
        isFeatured: true
    },
    {
        _id: 'prod103',
        name: 'Artisan Sourdough Loaf',
        description: 'Naturally leavened bread with a crispy crust and chewy interior.',
        price: 8.99,
        images: ['/images/carousel-cake-3.jpg'],
        category: 'Bread',
        isFeatured: false
    },
    {
        _id: 'prod104',
        name: 'Vanilla Bean Cupcake',
        description: 'Fluffy vanilla cupcake crowned with a swirl of vanilla buttercream.',
        price: 3.50,
        images: ['/images/placeholder.jpg'],
        category: 'Cupcake',
        isFeatured: true
    },
];


// =======================================================
// MIDDLEWARE AND CONFIGURATION
// =======================================================

// Serves static files from the 'public' directory (CRITICAL FOR LOADING CSS/IMAGES)
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(express.json());


// =======================================================
// API ROUTES
// =======================================================

// Route to fetch the list of products for the frontend
app.get('/api/products', (req, res) => {
    // Only send featured products for the main page grid
    const featuredProducts = products.filter(p => p.isFeatured);
    
    res.json({
        status: 'success',
        data: { 
            products: featuredProducts 
        },
    });
});


// =======================================================
// START SERVER
// =======================================================

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});