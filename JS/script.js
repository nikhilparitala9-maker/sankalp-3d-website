// ==========================================
// SANKALP 3D - COMPLETE SCRIPT
// ==========================================

// ==============================
// CART SYSTEM
// ==============================

let cart = JSON.parse(localStorage.getItem("sankalpCart")) || [];

function saveCart() {
    localStorage.setItem("sankalpCart", JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}

function addToCart(name, price) {

    const existingProduct =
        cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    alert(name + " added to cart!");
}

function removeFromCart(name) {

    cart = cart.filter(
        item => item.name !== name
    );

    saveCart();
    displayCart();
    updateCartCount();
}

function changeQuantity(name, change) {

    const product =
        cart.find(item => item.name === name);

    if (!product) return;

    product.quantity += change;

    if (product.quantity <= 0) {
        removeFromCart(name);
        return;
    }

    saveCart();
    displayCart();
    updateCartCount();
}

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty.</h2>

                <p>
                    Add some products from our collection.
                </p>

                <a
                    href="products.html"
                    class="button">

                    Browse Products

                </a>
            </div>
        `;

        cartTotal.textContent = "₹0";

        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price} each
                </p>

            </div>

            <div class="quantity-controls">

                <button
                    onclick="changeQuantity('${item.name}', -1)">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity('${item.name}', 1)">
                    +
                </button>

            </div>

            <div class="cart-item-price">

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart('${item.name}')">

                Remove

            </button>
        `;

        cartItems.appendChild(cartItem);

    });

    cartTotal.textContent = "₹" + total;
}


// ==============================
// MOBILE MENU
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();
    displayCart();

    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.getElementById("navLinks");

    if (!menuButton || !navLinks) {
        console.log("SANKALP 3D: menu elements not found");
        return;
    }

    menuButton.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        const opened =
            navLinks.classList.toggle("sankalp-mobile-open");

        if (opened) {
            menuButton.innerHTML = "✕";
            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );
        } else {
            menuButton.innerHTML = "☰";
            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove(
                "sankalp-mobile-open"
            );

            menuButton.innerHTML = "☰";

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // Navigation links

    navLinks.querySelectorAll("a").forEach(function (link) {

        const text =
            link.textContent.trim().toLowerCase();

        if (text === "home") {
            link.href = "homepage.html";
        }

        if (text === "about") {
            link.href = "about.html";
        }

        if (text === "services") {
            link.href = "services.html";
        }

        if (text === "products") {
            link.href = "products.html";
        }

        if (text === "how it works") {
            link.href = "how-it-works.html";
        }

        if (text === "contact") {
            link.href = "contact.html";
        }

    });


    // Logo

    document.querySelectorAll(".logo").forEach(function (logo) {
        logo.href = "homepage.html";
    });


    // Get a Quote

    document.querySelectorAll("a").forEach(function (link) {

        const text =
            link.textContent.trim().toLowerCase();

        if (text.includes("get a quote")) {
            link.href = "contact.html";
        }

        if (text === "explore services") {
            link.href = "services.html";
        }

    });

});