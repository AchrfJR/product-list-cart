let cart = [];

function addToCart(productName, price) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1; // Increase quantity if product already exists
    } else {
        cart.push({ name: productName, price: price, quantity: 1 }); // Add new product to cart
    }
    updateCart();
    updateButtonDisplay(productName);
}

function updateButtonDisplay(productName) {
    const button = document.querySelector(`button[data-product="${productName}"]`);
    const product = cart.find(item => item.name === productName);
    const quantity = product ? product.quantity : 0;

    // Set the button content
    button.innerHTML = `
        <div class="quantity-display" style="display: none;">
            <button class="decrement" onclick="decrement('${productName}')">
                <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrement">
            </button>
            <span class="quantity-number">${quantity}</span>
            <button class="increment" onclick="increment('${productName}', ${product ? product.price : 0})">
                <img src="./assets/images/icon-increment-quantity.svg" alt="Increment">
            </button>
        </div>
        <span style="display: ${quantity > 0 ? 'none' : 'inline'};">Add to Cart</span>
    `;

    const quantityDisplay = button.querySelector('.quantity-display');

    button.addEventListener('mouseenter', () => {
        quantityDisplay.style.display = 'flex'; // Show quantity display
        button.style.color = 'hsl(14, 55%, 42%)'; // Change text color on hover
        button.style.borderColor = 'hsl(14, 55%, 42%)'; // Change border color on hover
    });

    button.addEventListener('mouseleave', () => {
        if (quantity === 0) {
            button.innerHTML = `<span>Add to Cart</span>`; // Show "Add to Cart" if no items
        }
    });
}

function increment(productName, price) {
    addToCart(productName, price); // Call addToCart to add one item
}

function decrement(productName) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity -= 1; // Decrease quantity
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.name !== productName); // Remove item if quantity is zero
        }
    }
    updateCart();
    updateButtonDisplay(productName);
}

function updateCart() {
    const cartItemsElement = document.getElementById("cart-items");
    const cartCountElement = document.getElementById("cart-count");

    cartItemsElement.innerHTML = "";
    let total = 0;

    cart.forEach((cartItem, index) => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.textContent = `${cartItem.quantity} x ${cartItem.name} - $${(cartItem.price * cartItem.quantity).toFixed(2)}`;

        const removeButton = document.createElement("button");
        removeButton.className = "remove-item";
        
        // Use an icon for the remove button
        const removeIcon = document.createElement("img");
        removeIcon.src = "./assets/images/icon-remove-item.svg"; // Update with your icon path
        removeIcon.alt = "Remove";
        
        removeButton.appendChild(removeIcon);
        removeButton.onclick = () => {
            cart.splice(index, 1); // Remove item from cart
            updateCart();
            updateButtonDisplay(cartItem.name); // Update button display after removal
        };

        itemElement.appendChild(removeButton);
        cartItemsElement.appendChild(itemElement);

        total += cartItem.price * cartItem.quantity;
    });

    cartCountElement.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsElement.innerHTML = "<p>Your added items will appear here</p>";
    }

    // Calculate and update total price
    total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalPriceElement = document.getElementById("total-price");
    totalPriceElement.innerHTML = `$${total.toFixed(2)}`;
}

function confirmOrder() {
    const modal = document.getElementById('order-confirmation-modal');
    const orderSummaryElement = document.getElementById('order-summary');
    orderSummaryElement.innerHTML = '';

    // Add the items to the order summary
    cart.forEach(item => {
        const summaryItem = document.createElement('p');
        summaryItem.textContent = `${item.name} - $${item.price} (x${item.quantity})`;
        orderSummaryElement.appendChild(summaryItem);
    });

    // Show the modal
    modal.style.display = 'flex';

    // Empty the cart after confirming the order
    cart = [];
    updateCart();
}

function closeModal() {
    const modal = document.getElementById('order-confirmation-modal');
    modal.style.display = 'none';
}



