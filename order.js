document.addEventListener('DOMContentLoaded', function() {
    // Get cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('jollibeeCart')) || [];
    
    // Get DOM elements
    const orderItemsContainer = document.getElementById('orderItems');
    const totalElement = document.getElementById('total');
    const orderIdElement = document.getElementById('orderId');
    const qrcodeContainer = document.getElementById('qrcode');
    
    // Generate order ID
    const orderId = generateOrderId();
    orderIdElement.textContent = orderId;
    
    // Display order items and calculate total
    function displayOrderItems() {
        // Clear the container
        orderItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            // Redirect back to menu if cart is empty
            window.location.href = 'index.html';
            return;
        }

        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Update total display
        totalElement.textContent = `${total.toLocaleString('vi-VN')}₫`;
        
        // Display each item
        cart.forEach(item => {
            const orderItemElement = document.createElement('div');
            orderItemElement.className = 'order-item';
            orderItemElement.innerHTML = `
                <div class="order-item-details">
                    <span class="order-item-quantity">${item.quantity}</span>
                    <span class="order-item-name">${item.name}</span>
                </div>
                <span class="order-item-price">${(item.price * item.quantity).toLocaleString('vi-VN')}₫</span>
            `;
            orderItemsContainer.appendChild(orderItemElement);
        });        // Tạo mã QR cho đơn hàng
        const paymentInfo = `MB BANK
STK: 0123456789
TEN: JOLLIBEE VIETNAM
SO TIEN: ${total.toLocaleString('vi-VN')}VND
NOI DUNG: Thanh toan don hang ${orderId}`;
        
        // Xóa QR code cũ nếu có
        qrcodeContainer.innerHTML = '';
        
        // Tạo QR code mới
        generateQRCode(paymentInfo);
    }
    
    // Generate QR code    function generateQRCode(data) {
        if (qrcodeContainer) {
            // Tạo QR code với kích thước lớn hơn
            new QRCode(qrcodeContainer, {
                text: data,
                width: 256,
                height: 256,
                colorDark: "#e3000b",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }
    
    // Generate a random order ID
    function generateOrderId() {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 90000) + 10000;
        
        return `JB${year}${month}${day}${random}`;
    }

    // Initialize the display
    displayOrderItems();
});
