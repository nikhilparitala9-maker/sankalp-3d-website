// ==========================================
// SANKALP 3D - CART SYSTEM
// ==========================================

let cart = JSON.parse(localStorage.getItem("sankalpCart")) || [];


// ------------------------------------------
// SAVE CART
// ------------------------------------------

function saveCart() {
    localStorage.setItem("sankalpCart", JSON.stringify(cart));
}


// ------------------------------------------
// UPDATE CART COUNT
// ------------------------------------------

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}


// ------------------------------------------
// ADD TO CART
// ------------------------------------------

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );

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


// ------------------------------------------
// REMOVE FROM CART
// ------------------------------------------

function removeFromCart(name) {

    cart = cart.filter(
        item => item.name !== name
    );

    saveCart();

    displayCart();
    updateCartCount();
}


// ------------------------------------------
// CHANGE QUANTITY
// ------------------------------------------

function changeQuantity(name, change) {

    const product = cart.find(
        item => item.name === name
    );

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


// ------------------------------------------
// DISPLAY CART
// ------------------------------------------

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <h2>Your cart is empty.</h2>

                <p>
                    Add some products from our collection.
                </p>

                <a href="products.html" class="button">
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

        const itemTotal = item.price * item.quantity;

        total += itemTotal;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

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


// ------------------------------------------
// INITIALIZE
// ------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();

    displayCart();

});
/* =========================================================
   SANKALP 3D - NAVIGATION + BUTTON FIX
   Add this code at the END of JS/script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.querySelector(".nav-links");

    /* ---------- Mobile Menu ---------- */

    if (menuButton && navLinks) {

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");

        const style = document.createElement("style");

        style.id = "sankalp-navigation-fix";

        style.textContent = `
            @media (max-width: 900px) {

                .nav-links.sankalp-mobile-open {
                    display: flex !important;
                    position: absolute !important;
                    top: 100% !important;
                    left: 0 !important;
                    right: 0 !important;
                    width: 100% !important;
                    max-width: none !important;
                    margin: 0 !important;
                    padding: 18px 20px !important;
                    flex-direction: column !important;
                    align-items: stretch !important;
                    justify-content: flex-start !important;
                    gap: 0 !important;
                    background: #050505 !important;
                    border-top: 1px solid #242424 !important;
                    border-bottom: 1px solid #242424 !important;
                    z-index: 99999 !important;
                }

                .nav-links.sankalp-mobile-open a {
                    display: block !important;
                    width: 100% !important;
                    padding: 15px 4px !important;
                    text-align: left !important;
                    border-bottom: 1px solid #1d1d1d !important;
                }

                .nav-links.sankalp-mobile-open a:last-child {
                    border-bottom: 0 !important;
                }

                .container.nav {
                    position: relative !important;
                }

                .menu-button {
                    position: relative !important;
                    z-index: 100000 !important;
                    cursor: pointer !important;
                }
            }
        `;

        document.head.appendChild(style);


        menuButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                navLinks.classList.toggle("sankalp-mobile-open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

            menuButton.textContent =
                isOpen ? "✕" : "☰";
        });


        /* Close menu when clicking outside */

        document.addEventListener("click", function (event) {

            if (
                navLinks.classList.contains("sankalp-mobile-open") &&
                !navLinks.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                navLinks.classList.remove(
                    "sankalp-mobile-open"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );

                menuButton.textContent = "☰";
            }
        });
    }


    /* ---------- Page Routes ---------- */

    const routes = {

        "home": "homepage.html",
        "about": "about.html",
        "services": "services.html",
        "products": "products.html",
        "how it works": "how-it-works.html",
        "contact": "contact.html",
        "cart": "cart.html"

    };


    /* ---------- Clean Text ---------- */

    function cleanText(text) {

        return text
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();

    }


    /* ---------- Navigation From Button Text ---------- */

    function navigateFromText(element) {

        const text =
            cleanText(element.textContent);


        /* Get a Quote */

        if (text.includes("get a quote")) {

            window.location.href =
                "contact.html";

            return true;
        }


        /* Explore Services */

        if (text === "explore services") {

            window.location.href =
                "services.html";

            return true;
        }


        /* Cart */

        if (
            text === "cart" ||
            text.startsWith("cart ")
        ) {

            window.location.href =
                "cart.html";

            return true;
        }


        return false;
    }


    /* ---------- Reliable Button Navigation ---------- */

    document.addEventListener(
        "click",
        function (event) {

            const clickable =
                event.target.closest(
                    "a, button, .button, .nav-button, .cart-link"
                );

            if (!clickable) return;


            /* Don't break Add to Cart */

            if (
                clickable.classList.contains(
                    "add-cart"
                )
            ) {
                return;
            }


            /* Menu handled separately */

            if (
                clickable.id === "menuButton"
            ) {
                return;
            }


            if (
                navigateFromText(clickable)
            ) {

                event.preventDefault();


                /* Close mobile menu */

                if (
                    navLinks &&
                    navLinks.classList.contains(
                        "sankalp-mobile-open"
                    )
                ) {

                    navLinks.classList.remove(
                        "sankalp-mobile-open"
                    );
                }
            }

        }
    );


    /* ---------- Fix Header Navigation ---------- */

    document
        .querySelectorAll(".nav-links a")
        .forEach(function (link) {

            const text =
                cleanText(link.textContent);

            if (routes[text]) {

                link.setAttribute(
                    "href",
                    routes[text]
                );
            }

        });


    /* ---------- Logo → Homepage ---------- */

    document
        .querySelectorAll(".logo")
        .forEach(function (logo) {

            logo.setAttribute(
                "href",
                "homepage.html"
            );

        });


    /* ---------- Fix Quote Buttons ---------- */

    document
        .querySelectorAll("a, button")
        .forEach(function (element) {

            const text =
                cleanText(element.textContent);


            if (
                text.includes("get a quote")
            ) {

                element.setAttribute(
                    "data-sankalp-quote",
                    "true"
                );

                if (
                    element.tagName === "A"
                ) {

                    element.setAttribute(
                        "href",
                        "contact.html"
                    );
                }
            }


            /* Explore Services */

            if (
                text === "explore services"
            ) {

                if (
                    element.tagName === "A"
                ) {

                    element.setAttribute(
                        "href",
                        "services.html"
                    );
                }
            }

        });

});
/* =========================================================
   SANKALP 3D - MOBILE MENU
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.querySelector(".nav-links");

    if (!menuButton || !navLinks) {
        return;
    }

    menuButton.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        navLinks.classList.toggle("mobile-menu-open");

    });


    /* Close menu after clicking a navigation link */

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("mobile-menu-open");

        });

    });

});