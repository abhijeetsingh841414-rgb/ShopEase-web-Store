document.getElementById("form").addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullname").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const address = document.getElementById("address").value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;


    if(!fullName || !phoneNumber || !address){
        alert("Please fill in all the required delivery details!");
        return;
    }

    const phoneDigit = /^[0-9]{10}$/;
    if(!phoneDigit.test(phoneNumber)){
        alert("Please enter a valid 10-digit phone number!");
        return;
    }

    const cart = JSON.parse(localStorage.getItem('shopeaseCart')) || [];
    if(cart.length === 0){
        alert("Your cart is empty! Add some items before checkout!");
        window.location.href = 'index.html';
        return;
    }


    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderDetails = {
        allOrderId : 'SE-' + Math.floor(100000 + Math.random() * 900000),
        name : fullName,
        phone : phoneNumber,
        address : address,
        payment : paymentMethod,
        items : cart,
        total : totalAmount,
        date : new Date().toLocaleDateString(),
    };


    const AllOrders = JSON.parse(localStorage.getItem('shopeaseCart')) || [];
    AllOrders.push(orderDetails);
    localStorage.setItem('shopeaseCart', JSON.stringify(AllOrders));


    localStorage.removeItem('shopeaseCart');

    alert(`Your Order Placed Successfully!  \nOrder Id : ${orderDetails.allOrderId}\nTotal Amount : ₹${totalAmount}`);
    window.location.href = 'index.html'

});