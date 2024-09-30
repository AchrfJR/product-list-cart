let cart = [];

function addToCart(productName, price) {
    // Check if the product is already in the cart
    const productExists = cart.find(item => item.name === productName);
    if (productExists) {
        productExists.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(productName) {
    // Remove the product from the cart
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById("cart-items");
    const cartCountElement = document.getElementById("cart-count");
    const cartTotalElement = document.getElementById("cart-total");

    cartItemsElement.innerHTML = "";
    total = 0;

    cart.forEach((cartItem, index) => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item"; // Changed from <p> to <div> for better control
        itemElement.textContent = `${cartItem.item} - $${cartItem.price.toFixed(2)}`;
        
        // Create the remove button as an icon
        const removeButton = document.createElement("button");
        removeButton.className = "remove-item";
        removeButton.onclick = () => {
            cart.splice(index, 1);
            updateCart();
        };

        itemElement.appendChild(removeButton);
        cartItemsElement.appendChild(itemElement);

        total += cartItem.price;
    });

    cartCountElement.textContent = cart.length;
    cartTotalElement.textContent = `Order Total: $${total.toFixed(2)}`;

    if (cart.length === 0) {
        cartItemsElement.innerHTML = "<p>Your added items will appear here</p>";
    }
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
