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
    const cartItemsElement = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');

    // Update cart count
    cartCountElement.innerText = cart.length;

    // Clear the current cart
    cartItemsElement.innerHTML = '';

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your added items will appear here</p>';
        return;
    }

    // Add updated cart items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price} (x${item.quantity})</p>
            <button class="remove-item" onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsElement.appendChild(cartItem);
    });
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
