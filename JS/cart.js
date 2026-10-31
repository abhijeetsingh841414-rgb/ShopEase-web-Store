cart = JSON.parse(localStorage.getItem('shopeaseCart')) || [];
const cartContent = document.getElementById("cart-content");

function displayCartPage(){
    if(cart.length === 0){
        cartContent.innerHTML = `<div class="empty-cart-container">
        <i class="fa-solid fa-cart-arrow-down" style="color: #ccc; font-size: 50px; margin-bottom: 15px"></i>
          <h2>Your Cart is Currently Empty</h2>
          <p style="color: #777; margin: 10px 0">
            Looks like you haven't added anything to your cart yet.
          </p>
          <a href="index.html" class="btn">Start Shooping</a>
        </div>`;
        return;
    }

    let subTotal = 0;
    let tableHTML = `
    <table class="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
        `;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subTotal += itemTotal;
            tableHTML += `
            <tr>
              <td>
                <div class="cartItem">
                  <img src="${item.image}" alt="${item.title}" />
                  <span><strong>${item.title}</strong></span>
                </div>
              </td>
              <td>₹ ${item.price}</td>
              <td>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span style="margin: 0 8px;">${item.quantity}</span>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
              </td>
              <td>₹ ${item.price * item.quantity}</td>
              <td>
                <button class="deleteBtn" onclick="removeItem(${item.id})">
                  <i class="fa-solid fa-trash-can"></i>
                <button>
              </td>
            </tr>
          `;       
        });

        tableHTML += `
        </tbody>
        </table>
        <div class="cartSummary">
          <div class="summaryRow">
            <span>Subtotal</span>
            <span>₹ ${subTotal}</span>
          </div>
          <div class="summaryRow">
            <span>Shipping fee</span>
            <span>FREE</span>
          </div>
          <div class="summaryRow total">
            <span>Total amount</span>
            <span>₹ ${subTotal}</span>
          </div>
          <button class="btn" style="width: 100%; margin-top: 15px;" onclick="alert('Proceeding to Payment!')">Proceed to Checkout</button>
        </div>
        `;

        cartContent.innerHTML = tableHTML;
}


function changeQuantity(id, change){
    const item = cart.find(p => p.id === id);
    if(item){
        item.quantity += change;
        if(item.quantity <= 0) {
            cart = cart.filter(p => p.id !== id)
        }
        saveAndReload();
    }
}

function removeItem(id){
    cart = cart.filter(p => p.id !== id)
    saveAndReload();
}

function saveAndReload(){
    localStorage.setItem('shopeaseCart', JSON.stringify(cart));
    displayCartPage();
}

displayCartPage();
