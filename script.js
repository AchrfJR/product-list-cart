let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    document.getElementById('cart-count').innerText = cart.length;
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = item.name + " - $" + item.price.toFixed(2);
        cartItems.appendChild(cartItem);
    });
}

document.getElementById('confirm-order').addEventListener('click', () => {
    alert('Order confirmed!');
    cart = [];
    renderCart();
    document.getElementById('cart-count').innerText = cart.length;
});

document.getElementById('start-new-order').addEventListener('click', () => {
    cart = [];
    renderCart();
    document.getElementById('cart-count').innerText = cart.length;
});
