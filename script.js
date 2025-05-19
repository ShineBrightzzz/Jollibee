document.addEventListener('DOMContentLoaded', function() {
    // Sample menu data - in a real app this would come from an API or database
    const menuItems = [
        {
            id: 1,
            name: "Xôi pate thịt",
            description: "Xôi nóng ăn kèm pate và thịt heo",
            price: 39000,
            image: "images/placeholder.jpg"
        },
        {
            id: 2,
            name: "Xôi thịt chả",
            description: "Xôi nóng kèm thịt và chả thơm ngon",
            price: 39000,
            image: "images/placeholder.jpg",        },
        {
            id: 3,
            name: "Xôi pate trứng rán",
            description: "Xôi kèm pate và trứng rán",
            price: 35000,
            image: "images/placeholder.jpg"
        },
        {
            id: 4,
            name: "Xôi Pate Trứng Lạp Xưởng",
            description: "Xôi nóng kèm pate, trứng và lạp xưởng",
            price: 39000,
            image: "images/placeholder.jpg",        },
        {
            id: 5,
            name: "Xôi pate chả",
            description: "Xôi nóng kèm pate và chả",
            price: 37000,
            image: "images/placeholder.jpg"
        },
        {
            id: 6,
            name: "Xôi Trứng Chả Lạp Xưởng",
            description: "Xôi nóng kèm trứng, chả và lạp xưởng",
            price: 42000,
            image: "images/placeholder.jpg",        },
        {
            id: 7, 
            name: "Gà Giòn Vui Vẻ",
            description: "Gà chiên giòn theo bí quyết đặc biệt",
            price: 33000,
            image: "images/chickenjoy.jpg"
        },
        {
            id: 8,
            name: "CB145 - 2 Gà Giòn Vui Vè + 2 Mỳ Ý",
            description: "Combo 2 miếng gà giòn, 2 mỳ ý vừa và nước ngọt",
            price: 145000,
            image: "images/placeholder.jpg",        }
    ];

    let cart = [];
    const cartModal = document.getElementById('cartModal');
    const closeCartModal = document.getElementById('closeCartModal');
    const cartIcon = document.getElementById('cartIcon');
    const mobileCartTotal = document.getElementById('mobileCartTotal');
    const cartBadge = document.getElementById('cartBadge');

    // Display menu items
    function displayMenuItems() {
        const menuContainer = document.getElementById('menuItems');
        menuContainer.innerHTML = '';
        
        menuItems.forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.className = 'menu-item';
            menuItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="menu-item-image" onerror="this.src='images/placeholder.jpg'">
                <div class="item-info">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-description">${item.description}</p>
                    <p class="item-price">${item.price.toLocaleString('vi-VN')}₫</p>
                </div>
                ${getItemControls(item.id)}
            `;
            menuContainer.appendChild(menuItemElement);
        });
    }

    function getItemControls(itemId) {
        const cartItem = cart.find(item => item.id === itemId);
        if (cartItem) {
            return `
                <div class="quantity-control">
                    <button class="quantity-btn decrease" data-id="${itemId}">-</button>
                    <span class="quantity">${cartItem.quantity}</span>
                    <button class="quantity-btn increase" data-id="${itemId}">+</button>
                </div>
            `;
        } else {
            return `<button class="add-to-cart" data-id="${itemId}">+</button>`;
        }
    }    // Add event listeners
    document.addEventListener('click', function(event) {
        let itemId;
        if (event.target.matches('.add-to-cart')) {
            itemId = parseInt(event.target.dataset.id);
            addToCart(itemId);
        } else if (event.target.matches('.quantity-btn.decrease')) {
            itemId = parseInt(event.target.dataset.id);
            decreaseQuantity(itemId);
        } else if (event.target.matches('.quantity-btn.increase')) {
            itemId = parseInt(event.target.dataset.id);
            increaseQuantity(itemId);
        }
    });

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            if (cartModal) {
                updateCartModal();
                cartModal.style.display = 'block';
            }
        });
    }    closeCartModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Handle checkout button click
    document.getElementById('modalCheckoutBtn').addEventListener('click', () => {
        // Save cart to localStorage before redirecting
        localStorage.setItem('jollibeeCart', JSON.stringify(cart));
        // The redirect is handled by the <a> tag now
    });// Cart functions
    function addToCart(itemId) {
        const menuItem = menuItems.find(item => item.id === itemId);
        const existingItem = cart.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...menuItem,
                quantity: 1
            });
        }
        updateUI();
    }

    function decreaseQuantity(itemId) {
        const index = cart.findIndex(item => item.id === itemId);
        if (index !== -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateUI();
        }
    }

    function increaseQuantity(itemId) {
        const cartItem = cart.find(item => item.id === itemId);
        if (cartItem) {
            cartItem.quantity++;
            updateUI();
        }
    }

    function updateUI() {
        displayMenuItems();
        updateCartSummary();
        updateCartModal();
    }    function updateCartSummary() {
        // Calculate total price
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (mobileCartTotal) {
            mobileCartTotal.textContent = `${total.toLocaleString('vi-VN')}₫`;
        }
        
        // Calculate total quantity
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Update cart badge
        if (cartBadge) {
            cartBadge.textContent = totalQuantity;
            cartBadge.style.visibility = totalQuantity > 0 ? 'visible' : 'hidden';
        }
        
        // Update cart total
        if (document.getElementById('cartTotal')) {
            document.getElementById('cartTotal').textContent = `${total.toLocaleString('vi-VN')}₫`;
        }
    }

    function updateCartModal() {
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';

        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Giỏ hàng của bạn đang trống</div>';
            return;
        }

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='images/placeholder.jpg'">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">${(item.price * item.quantity).toLocaleString('vi-VN')}₫</p>
                </div>
                <div class="quantity-control">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
            `;
            cartItems.appendChild(cartItemElement);
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cartTotal').textContent = `${total.toLocaleString('vi-VN')}₫`;
    }

    // Initialize
    displayMenuItems();
});
