// ============================================================
// SANKALP 3D
// COMPLETE JAVASCRIPT
// CART + NAVIGATION + MOBILE MENU
// ============================================================


// ============================================================
// CART SYSTEM
// ============================================================

let cart = JSON.parse(
    localStorage.getItem("sankalpCart")
) || [];


// ============================================================
// SAVE CART
// ============================================================

function saveCart() {

    localStorage.setItem(
        "sankalpCart",
        JSON.stringify(cart)
    );

}


// ============================================================
// UPDATE CART COUNT
// ============================================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    const totalItems = cart.reduce(
        function (total, item) {
            return total + item.quantity;
        },
        0
    );

    cartCount.textContent = totalItems;

}


// ============================================================
// ADD TO CART
// ============================================================

function addToCart(name, price) {

    const existingProduct =
        cart.find(function (item) {
            return item.name === name;
        });


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

    alert(
        name + " added to cart!"
    );

}


// ============================================================
// REMOVE FROM CART
// ============================================================

function removeFromCart(name) {

    cart = cart.filter(function (item) {

        return item.name !== name;

    });


    saveCart();

    displayCart();

    updateCartCount();

}


// ============================================================
// CHANGE QUANTITY
// ============================================================

function changeQuantity(name, change) {

    const product =
        cart.find(function (item) {

            return item.name === name;

        });


    if (!product) {
        return;
    }


    product.quantity += change;


    if (product.quantity <= 0) {

        removeFromCart(name);

        return;

    }


    saveCart();

    displayCart();

    updateCartCount();

}


// ============================================================
// DISPLAY CART
// ============================================================

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    if (!cartItems || !cartTotal) {
        return;
    }


    // EMPTY CART
    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your cart is empty.
                </h2>

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


    cart.forEach(function (item) {

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
                    type="button"
                    onclick="changeQuantity('${item.name}', -1)">

                    −

                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    type="button"
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
                type="button"
                class="remove-item"
                onclick="removeFromCart('${item.name}')">

                Remove

            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =
        "₹" + total;

}


// ============================================================
// MOBILE MENU
// ============================================================

function setupMobileMenu() {

    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.querySelector(".nav-links");


    if (!menuButton || !navLinks) {
        return;
    }


    // Make sure the header can contain the menu
    const navContainer =
        menuButton.closest(".container.nav");

    if (navContainer) {

        navContainer.style.position =
            "relative";

    }


    // ========================================================
    // MOBILE MENU CSS
    // ========================================================

    if (
        !document.getElementById(
            "sankalp-mobile-menu-style"
        )
    ) {

        const style =
            document.createElement("style");


        style.id =
            "sankalp-mobile-menu-style";


        style.textContent = `

            @media screen and (max-width: 900px) {

                .container.nav {
                    position: relative !important;
                }


                .menu-button {
                    display: block !important;
                    position: relative !important;
                    z-index: 999999 !important;

                    width: 44px !important;
                    height: 44px !important;

                    padding: 0 !important;

                    background: transparent !important;

                    border: none !important;

                    color: #ffffff !important;

                    font-size: 26px !important;

                    line-height: 44px !important;

                    text-align: center !important;

                    cursor: pointer !important;
                }


                .nav-links.sankalp-menu-visible {

                    display: flex !important;

                    position: absolute !important;

                    top: 100% !important;

                    left: 0 !important;

                    right: 0 !important;

                    width: 100% !important;

                    height: auto !important;

                    max-height: calc(100vh - 70px) !important;

                    overflow-y: auto !important;

                    flex-direction: column !important;

                    align-items: stretch !important;

                    justify-content: flex-start !important;

                    gap: 0 !important;

                    margin: 0 !important;

                    padding: 8px 20px 18px !important;

                    background: #000000 !important;

                    border-top: 1px solid #292929 !important;

                    border-bottom: 1px solid #292929 !important;

                    box-shadow: 0 15px 30px rgba(0,0,0,.5) !important;

                    z-index: 999998 !important;

                    visibility: visible !important;

                    opacity: 1 !important;

                    transform: none !important;
                }


                .nav-links.sankalp-menu-visible a {

                    display: block !important;

                    width: 100% !important;

                    height: auto !important;

                    padding: 16px 5px !important;

                    margin: 0 !important;

                    color: #ffffff !important;

                    background: transparent !important;

                    font-size: 15px !important;

                    font-weight: 500 !important;

                    line-height: 1.4 !important;

                    text-align: left !important;

                    text-decoration: none !important;

                    border-bottom: 1px solid #242424 !important;

                    visibility: visible !important;

                    opacity: 1 !important;

                }


                .nav-links.sankalp-menu-visible a:last-child {

                    border-bottom: none !important;

                }


                .nav-links.sankalp-menu-visible a:hover {

                    color: #d4af37 !important;

                }

            }

        `;


        document.head.appendChild(style);

    }


    // ========================================================
    // MENU BUTTON CLICK
    // ========================================================

   menuButton.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = navLinks.classList.toggle("sankalp-mobile-open");

    if (isOpen) {
        navLinks.style.cssText = `
            display: flex !important;
            position: absolute !important;
            top: 100% !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0 !important;
            margin: 0 !important;
            padding: 15px 20px 20px !important;
            background: #000 !important;
            z-index: 999999 !important;
            visibility: visible !important;
            opacity: 1 !important;
        `;

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.style.cssText = `
                display: block !important;
                width: 100% !important;
                padding: 15px 5px !important;
                color: #fff !important;
                visibility: visible !important;
                opacity: 1 !important;
            `;
        });

        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-expanded", "true");

    } else {
        navLinks.style.removeProperty("display");
        navLinks.style.removeProperty("position");
        navLinks.style.removeProperty("top");
        navLinks.style.removeProperty("left");
        navLinks.style.removeProperty("right");
        navLinks.style.removeProperty("width");
        navLinks.style.removeProperty("flex-direction");
        navLinks.style.removeProperty("align-items");
        navLinks.style.removeProperty("gap");
        navLinks.style.removeProperty("margin");
        navLinks.style.removeProperty("padding");
        navLinks.style.removeProperty("background");
        navLinks.style.removeProperty("z-index");
        navLinks.style.removeProperty("visibility");
        navLinks.style.removeProperty("opacity");

        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
    }
});

            event.preventDefault();

            event.stopPropagation();


            const opened =
                navLinks.classList.toggle(
                    "sankalp-menu-visible"
                );


            menuButton.textContent =
                opened ? "✕" : "☰";


            menuButton.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

        }
    );


    // ========================================================
    // CLOSE AFTER CLICKING LINK
    // ========================================================

    navLinks
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove(
                        "sankalp-menu-visible"
                    );


                    menuButton.textContent =
                        "☰";


                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });


    // ========================================================
    // CLOSE WHEN CLICKING OUTSIDE
    // ========================================================

    document.addEventListener(
        "click",
        function (event) {

            if (
                !navLinks.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                navLinks.classList.remove(
                    "sankalp-menu-visible"
                );


                menuButton.textContent =
                    "☰";


                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


// ============================================================
// NAVIGATION
// ============================================================

function setupNavigation() {

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    navLinks.forEach(function (link) {

        const text =
            link.textContent
                .trim()
                .toLowerCase();


        // HOME
        if (text === "home") {

            link.setAttribute(
                "href",
                "homepage.html"
            );

        }


        // ABOUT
        else if (text === "about") {

            link.setAttribute(
                "href",
                "about.html"
            );

        }


        // SERVICES
        else if (text === "services") {

            link.setAttribute(
                "href",
                "services.html"
            );

        }


        // PRODUCTS
        else if (text === "products") {

            link.setAttribute(
                "href",
                "products.html"
            );

        }


        // HOW IT WORKS
        else if (
            text === "how it works"
        ) {

            link.setAttribute(
                "href",
                "how-it-works.html"
            );

        }


        // CONTACT
        else if (text === "contact") {

            link.setAttribute(
                "href",
                "contact.html"
            );

        }

    });


    // ========================================================
    // LOGO
    // ========================================================

    document
        .querySelectorAll(".logo")
        .forEach(function (logo) {

            logo.setAttribute(
                "href",
                "homepage.html"
            );

        });


    // ========================================================
    // GET A QUOTE
    // ========================================================

    document
        .querySelectorAll("a")
        .forEach(function (link) {

            const text =
                link.textContent
                    .trim()
                    .toLowerCase();


            if (
                text.includes("get a quote")
            ) {

                link.setAttribute(
                    "href",
                    "contact.html"
                );

            }


            if (
                text === "explore services"
            ) {

                link.setAttribute(
                    "href",
                    "services.html"
                );

            }

        });

}


// ============================================================
// PAGE INITIALIZATION
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        displayCart();

        setupMobileMenu();

        setupNavigation();

    }
);