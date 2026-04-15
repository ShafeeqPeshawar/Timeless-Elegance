# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a luxury watch e-commerce website called "TIMEPIECE" built with vanilla HTML, CSS, and JavaScript. The website features a complete shopping experience with user authentication, product filtering, shopping cart, and checkout functionality.

## Project Structure

- `index.html` - Main HTML file containing the website structure, navigation, product listings, modals (cart, sign in, sign up)
- `styles.css` - Complete styling for the website including responsive design, modals, product cards, and authentication forms
- `script.js` - JavaScript functionality for authentication, cart management, category filtering, and user interactions

## Key Features

### Authentication System
- User registration (Sign Up) with name, email, and password
- User login (Sign In) with email and password validation
- Session persistence using localStorage
- Protected cart access - only logged-in users can add items to cart or checkout
- User data stored in browser's localStorage (simulates a database)

### Product Catalog
- 8 luxury watches organized into 4 categories: Luxury, Sport, Casual, Dress
- Category sidebar with filtering functionality
- Product cards with images (from Unsplash), descriptions, prices, and "Add to Cart" buttons
- Consistent card layout with fixed heights for uniform appearance

### Shopping Cart
- Add watches to cart (authentication required)
- Cart counter in navigation bar
- Full cart modal with:
  - Product images, names, and prices
  - Quantity controls (+/- buttons)
  - Remove item functionality
  - Real-time total price calculation
- Checkout button opens cart modal
- Place order functionality

### UI/UX
- Sticky navigation bar with logo, menu links, auth buttons, cart icon, and checkout button
- Hero section with call-to-action
- Responsive design for mobile and desktop
- Smooth scrolling navigation
- Hover effects and transitions
- Modal overlays for cart and authentication

## Data Storage

The application uses browser localStorage for:
- `users` - Array of registered users (name, email, password)
- `currentUser` - Currently logged-in user session (name, email)

Cart data is stored in memory and cleared on logout.

## Development Notes

- No build process required - open `index.html` directly in a browser
- All images are loaded from Unsplash CDN
- Authentication is client-side only (not production-ready)
- Passwords are stored in plain text in localStorage (for demo purposes only)

## Design System

- Primary color: Gold (#d4af37)
- Dark background: #1a1a1a
- Light background: #f8f8f8
- Font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Responsive breakpoint: 768px

## Future Enhancements

Consider adding:
- Backend API for real authentication and data persistence
- Password hashing and security improvements
- Payment gateway integration
- Order history and user profile pages
- Product search functionality
- Wishlist feature
- Product reviews and ratings
