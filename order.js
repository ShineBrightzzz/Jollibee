document.addEventListener('DOMContentLoaded', function() {
    // Get cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('jollibeeCart')) || [];
    console.log('Cart loaded:', cart); // Thêm log để kiểm tra
    
    // Get DOM elements
    const orderItemsContainer = document.getElementById('orderItems');
    const totalElement = document.getElementById('total');
    const orderIdElement = document.getElementById('orderId');
    const paymentStatus = document.getElementById('paymentStatus');    // Generate order ID
    const orderId = generateOrderId();
    orderIdElement.textContent = orderId;
    
    function displayOrderItems() {
        console.log('Displaying items:', cart); // Thêm log để kiểm tra
        
        // Clear the container
        orderItemsContainer.innerHTML = '';
        
        if (!cart || cart.length === 0) {
            // Show empty cart message instead of redirecting
            orderItemsContainer.innerHTML = '<div class="empty-cart">Chưa có món ăn nào được chọn</div>';
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
                    <img src="${item.image}" alt="${item.name}" class="order-item-image" onerror="this.src='images/placeholder.jpg'">
                    <div class="order-item-info">
                        <span class="order-item-name">${item.name}</span>
                        <span class="order-item-quantity">Số lượng: ${item.quantity}</span>
                    </div>
                </div>
                <span class="order-item-price">${(item.price * item.quantity).toLocaleString('vi-VN')}₫</span>
            `;            orderItemsContainer.appendChild(orderItemElement);
        });
        
        // Giả lập kiểm tra trạng thái thanh toán
        setTimeout(() => {
            paymentStatus.innerHTML = `
                <i class="fas fa-check-circle" style="color: #4CAF50;"></i>
                <p>Đã thanh toán thành công!</p>
            `;
        }, 3000);    }
    
    function generateQRCode(data) {
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
