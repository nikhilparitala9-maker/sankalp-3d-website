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
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        displayCart();


        // ==================================
        // FIND MENU
        // ==================================

        const menuButton =
            document.getElementById("menuButton");

        const navLinks =
            document.getElementById("navLinks");


        if (!menuButton || !navLinks) {

            console.log(
                "SANKALP 3D: No mobile menu on this page."
            );

            return;
        }



        // ==================================
        // MOBILE MENU STYLES
        // ==================================

        const mobileStyle =
            document.createElement("style");


        mobileStyle.textContent = `

            @media (max-width: 900px) {

                .header {
                    position: relative !important;
                    z-index: 999999 !important;
                }

                .container.nav {
                    position: relative !important;
                    z-index: 999999 !important;
                }

                #menuButton {
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    position: relative !important;
                    z-index: 9999999 !important;
                    cursor: pointer !important;
                }

                .container.nav .nav-links {
                    display: none !important;
                }

                .container.nav .nav-links.sankalp-mobile-open {

                    display: flex !important;

                    position: absolute !important;

                    top: 100% !important;

                    left: 0 !important;

                    right: 0 !important;

                    width: 100% !important;

                    height: auto !important;

                    max-height: calc(100vh - 75px) !important;

                    flex-direction: column !important;

                    align-items: stretch !important;

                    justify-content: flex-start !important;

                    gap: 0 !important;

                    margin: 0 !important;

                    padding: 10px 20px 20px !important;

                    background: #000000 !important;

                    border-top: 1px solid #333333 !important;

                    border-bottom: 1px solid #333333 !important;

                    overflow-y: auto !important;

                    visibility: visible !important;

                    opacity: 1 !important;

                    z-index: 9999998 !important;
                }

                .container.nav .nav-links.sankalp-mobile-open a {

                    display: block !important;

                    width: 100% !important;

                    padding: 16px 5px !important;

                    color: #ffffff !important;

                    background: transparent !important;

                    font-size: 16px !important;

                    line-height: 1.4 !important;

                    text-decoration: none !important;

                    border-bottom: 1px solid #333333 !important;

                    visibility: visible !important;

                    opacity: 1 !important;
                }

                .container.nav .nav-links.sankalp-mobile-open a:hover {

                    color: #d4af37 !important;
                }

            }

        `;


        document.head.appendChild(
            mobileStyle
        );



        // ==================================
        // HAMBURGER BUTTON
        // ==================================

        menuButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                const isOpen =
                    navLinks.classList.toggle(
                        "sankalp-mobile-open"
                    );


                if (isOpen) {

                    menuButton.textContent = "✕";

                    menuButton.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                } else {

                    menuButton.textContent = "☰";

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            }
        );



        // ==================================
        // NORMAL NAVIGATION
        // ==================================
        // IMPORTANT:
        // We use normal HTML navigation.
        // No preventDefault here.


        const links =
            navLinks.querySelectorAll("a");


        links.forEach(function (link) {

            const text =
                link.textContent
                    .trim()
                    .toLowerCase();


            if (text === "home") {

                link.href = "index.html";

            }


            else if (text === "about") {

                link.href = "about.html";

            }


            else if (text === "services") {

                link.href = "services.html";

            }


            else if (text === "products") {

                link.href = "products.html";

            }


            else if (text === "how it works") {

                link.href = "how-it-works.html";

            }


            else if (text === "contact") {

                link.href = "contact.html";

            }


            // Close mobile menu
            // before normal navigation

            link.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove(
                        "sankalp-mobile-open"
                    );

                    menuButton.textContent = "☰";

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });



        // ==================================
        // LOGO
        // ==================================

        document
            .querySelectorAll(".logo")
            .forEach(function (logo) {

                logo.href = "index.html";

            });



        // ==================================
        // GET A QUOTE
        // ==================================

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