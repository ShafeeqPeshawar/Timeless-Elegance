let cartCount = 0;
let cartItems = [];
let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.querySelector('.cart-count');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const cartModal = document.getElementById('cartModal');
    const closeModal = document.querySelector('.close-modal');
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    const placeOrderBtn = document.querySelector('.place-order');

    // Auth elements
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const signInModal = document.getElementById('signInModal');
    const signUpModal = document.getElementById('signUpModal');
    const closeSignIn = document.querySelector('.close-signin');
    const closeSignUp = document.querySelector('.close-signup');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const switchToSignUp = document.getElementById('switchToSignUp');
    const switchToSignIn = document.getElementById('switchToSignIn');
    const userSection = document.querySelector('.user-section');
    const userNameElement = document.querySelector('.user-name');
    const logoutBtn = document.querySelector('.logout-btn');

    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showUserSection();
    }

    // Sign In button
    signInBtn.addEventListener('click', function() {
        signInModal.classList.add('show');
    });

    // Sign Up button
    signUpBtn.addEventListener('click', function() {
        signUpModal.classList.add('show');
    });

    // Close modals
    closeSignIn.addEventListener('click', function() {
        signInModal.classList.remove('show');
    });

    closeSignUp.addEventListener('click', function() {
        signUpModal.classList.remove('show');
    });

    // Switch between Sign In and Sign Up
    switchToSignUp.addEventListener('click', function() {
        signInModal.classList.remove('show');
        signUpModal.classList.add('show');
    });

    switchToSignIn.addEventListener('click', function() {
        signUpModal.classList.remove('show');
        signInModal.classList.add('show');
    });

    // Sign Up Form
    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('signUpName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;
        const confirmPassword = document.getElementById('signUpConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert('User with this email already exists!');
            return;
        }

        // Create new user
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Account created successfully! Please sign in.');
        signUpForm.reset();
        signUpModal.classList.remove('show');
        signInModal.classList.add('show');
    });

    // Sign In Form
    signInForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            currentUser = { name: user.name, email: user.email };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showUserSection();
            signInForm.reset();
            signInModal.classList.remove('show');
            alert(`Welcome back, ${user.name}!`);
        } else {
            alert('Invalid email or password!');
        }
    });

    // Logout
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            currentUser = null;
            localStorage.removeItem('currentUser');
            cartItems = [];
            cartCount = 0;
            cartCountElement.textContent = cartCount;
            hideUserSection();
            alert('You have been logged out successfully.');
        }
    });

    function showUserSection() {
        signInBtn.style.display = 'none';
        signUpBtn.style.display = 'none';
        userSection.style.display = 'flex';
        userNameElement.textContent = `Hello, ${currentUser.name}`;
    }

    function hideUserSection() {
        signInBtn.style.display = 'block';
        signUpBtn.style.display = 'block';
        userSection.style.display = 'none';
    }

    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Check if user is logged in
            if (!currentUser) {
                alert('Please sign in to add items to cart!');
                signInModal.classList.add('show');
                return;
            }

            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            const priceValue = parseFloat(productPrice.replace('$', '').replace(',', ''));

            // Check if item already exists in cart
            const existingItem = cartItems.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({
                    name: productName,
                    price: priceValue,
                    image: productImage,
                    quantity: 1
                });
            }

            cartCount++;
            cartCountElement.textContent = cartCount;

            this.textContent = 'Added!';
            this.style.background = '#4CAF50';

            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '#1a1a1a';
            }, 1500);
        });
    });

    // Open cart modal
    checkoutBtn.addEventListener('click', function() {
        // Check if user is logged in
        if (!currentUser) {
            alert('Please sign in to view your cart!');
            signInModal.classList.add('show');
            return;
        }

        displayCart();
        cartModal.classList.add('show');
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        cartModal.classList.remove('show');
    });

    continueShoppingBtn.addEventListener('click', function() {
        cartModal.classList.remove('show');
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.classList.remove('show');
        }
        if (event.target === signInModal) {
            signInModal.classList.remove('show');
        }
        if (event.target === signUpModal) {
            signUpModal.classList.remove('show');
        }
    });

    // Display cart items
    function displayCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        const totalPriceElement = document.getElementById('totalPrice');

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
            totalPriceElement.textContent = '$0';
            return;
        }

        let cartHTML = '';
        let total = 0;

        cartItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toLocaleString()}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn decrease-qty" data-index="${index}">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn increase-qty" data-index="${index}">+</button>
                    </div>
                    <div class="cart-item-price">$${itemTotal.toLocaleString()}</div>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = cartHTML;
        totalPriceElement.textContent = `$${total.toLocaleString()}`;

        // Add event listeners for quantity buttons
        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cartItems[index].quantity++;
                cartCount++;
                cartCountElement.textContent = cartCount;
                displayCart();
            });
        });

        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity--;
                    cartCount--;
                    cartCountElement.textContent = cartCount;
                    displayCart();
                }
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cartCount -= cartItems[index].quantity;
                cartCountElement.textContent = cartCount;
                cartItems.splice(index, 1);
                displayCart();
            });
        });
    }

    // Place order
    placeOrderBtn.addEventListener('click', function() {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        alert('Thank you for your order! Your watches will be delivered soon.');
        cartItems = [];
        cartCount = 0;
        cartCountElement.textContent = cartCount;
        cartModal.classList.remove('show');
    });

    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
