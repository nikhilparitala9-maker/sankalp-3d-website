// ==========================================
// SANKALP 3D - COMPLETE SCRIPT
// ==========================================


// ==========================================
// CART SYSTEM
// ==========================================

let cart = JSON.parse(
    localStorage.getItem("sankalpCart")
) || [];


// SAVE CART
function saveCart() {

    localStorage.setItem(
        "sankalpCart",
        JSON.stringify(cart)
    );

}


// UPDATE CART COUNT
function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;

}


// ADD TO CART
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


// REMOVE FROM CART
function removeFromCart(name) {

    cart = cart.filter(
        item => item.name !== name
    );

    saveCart();

    displayCart();

    updateCartCount();

}


// CHANGE QUANTITY
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


// DISPLAY CART
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


    cartTotal.textContent =
        "₹" + total;

}


// ==========================================
// MOBILE NAVIGATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        updateCartCount();

        displayCart();


        const menuButton =
            document.getElementById("menuButton");

        const navLinks =
            document.querySelector(".nav-links");


        if (!menuButton || !navLinks) {

            console.log(
                "SANKALP 3D: Navigation elements not found."
            );

            return;

        }


        // --------------------------------------
        // MOBILE MENU STYLE
        // --------------------------------------

        const mobileStyle =
            document.createElement("style");


        mobileStyle.textContent = `

            @media (max-width: 900px) {

                .container.nav {
                    position: relative !important;
                }


                .menu-button {
                    display: block !important;

                    position: relative !important;

                    z-index: 100002 !important;

                    background: transparent !important;

                    border: none !important;

                    color: #ffffff !important;

                    font-size: 26px !important;

                    cursor: pointer !important;
                }


                .nav-links.mobile-open {

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

                    padding: 12px 20px 20px !important;

                    background: #000000 !important;

                    border-top: 1px solid #292929 !important;

                    border-bottom: 1px solid #292929 !important;

                    z-index: 100001 !important;

                    visibility: visible !important;

                    opacity: 1 !important;

                }


                .nav-links.mobile-open a {

                    display: block !important;

                    width: 100% !important;

                    padding: 17px 5px !important;

                    color: #ffffff !important;

                    background: transparent !important;

                    text-decoration: none !important;

                    font-size: 15px !important;

                    line-height: 1.4 !important;

                    text-align: left !important;

                    border-bottom: 1px solid #222222 !important;

                    visibility: visible !important;

                    opacity: 1 !important;

                }


                .nav-links.mobile-open a:last-child {

                    border-bottom: none !important;

                }

            }

        `;


        document.head.appendChild(
            mobileStyle
        );


        // --------------------------------------
        // OPEN / CLOSE MENU
        // --------------------------------------

        menuButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                const isOpen =
                    navLinks.classList.toggle(
                        "mobile-open"
                    );


                menuButton.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );


                menuButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close menu"
                        : "Open menu"
                );


                menuButton.textContent =
                    isOpen ? "✕" : "☰";

            }
        );


        // --------------------------------------
        // CLOSE MENU AFTER NAVIGATION
        // --------------------------------------

        navLinks
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navLinks.classList.remove(
                            "mobile-open"
                        );

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuButton.textContent =
                            "☰";

                    }
                );

            });


        // --------------------------------------
        // CLOSE WHEN CLICKING OUTSIDE
        // --------------------------------------

        document.addEventListener(
            "click",
            function (event) {

                if (
                    navLinks.classList.contains(
                        "mobile-open"
                    ) &&
                    !navLinks.contains(
                        event.target
                    ) &&
                    !menuButton.contains(
                        event.target
                    )
                ) {

                    navLinks.classList.remove(
                        "mobile-open"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.textContent =
                        "☰";

                }

            }
        );


        // ======================================
        // NAVIGATION LINKS
        // ======================================

        const navigation =
            navLinks.querySelectorAll("a");


        navigation.forEach(function (link) {

            const text =
                link.textContent
                    .trim()
                    .toLowerCase();


            if (text === "home") {

                link.href =
                    "homepage.html";

            }


            if (text === "about") {

                link.href =
                    "about.html";

            }


            if (text === "services") {

                link.href =
                    "services.html";

            }


            if (text === "products") {

                link.href =
                    "products.html";

            }


            if (
                text === "how it works"
            ) {

                link.href =
                    "how-it-works.html";

            }


            if (text === "contact") {

                link.href =
                    "contact.html";

            }

        });


        // ======================================
        // LOGO
        // ======================================

        document
            .querySelectorAll(".logo")
            .forEach(function (logo) {

                logo.href =
                    "homepage.html";

            });


        // ======================================
        // GET A QUOTE
        // ======================================

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

                    link.href =
                        "contact.html";

                }


                if (
                    text === "explore services"
                ) {

                    link.href =
                        "services.html";

                }

            });


    }
);