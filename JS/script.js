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