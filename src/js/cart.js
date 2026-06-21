let cart = JSON.parse(localStorage.getItem('cafe_press_cart')) || [];

function saveCart() {
    localStorage.setItem('cafe_press_cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = totalItems;
    }
}

function addToCart(productId, name, size, price, quantity) {
    if (quantity <= 0) return;
    
    // مفتاح فريد لدمج العناصر لو متطابقين في المنتج والمقاس
    const itemKey = `${productId}_${size || 'single'}`;
    
    const existingItemIndex = cart.findIndex(item => item.key === itemKey);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            key: itemKey,
            id: productId,
            name: name,
            size: size,
            price: price,
            quantity: quantity
        });
    }
    saveCart();

    // تشغيل الإشعار بالمظهر الجديد وتمرير اسم المنتج
    showToastNotification(name);
}

// دالة تشغيل إشعار الـ Toast بالهيكل الجديد (الخلفية البيضاء، الحافة اليمنى، والأيقونة المستدعاة)
function showToastNotification(productName) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;

    // بناء محتوى الإشعار باستخدام أيقونة السلة بدلاً من الإيموجي
    toast.innerHTML = `
        <img src="./src/icon/cart.svg" class="toast-icon" alt="سلة">
        <span>تم إضافة ${productName} إلى السلة!</span>
    `;
    
    toast.classList.add('show');

    // يختفي بنعومة ويعود لليمين مرة أخرى بعد ثانيتين
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function updateCartItemQuantity(key, newQty) {
    const itemIndex = cart.findIndex(item => item.key === key);
    if (itemIndex > -1) {
        if (newQty <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = newQty;
        }
        saveCart();
        if (window.currentPage === 'cart') {
            renderCartPage();
        }
    }
}

function removeCartItem(key) {
    cart = cart.filter(item => item.key !== key);
    saveCart();
    if (window.currentPage === 'cart') {
        renderCartPage();
    }
}

function calculateTotalPrice() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// صياغة نص رسالة إرسال الطلب عبر الواتساب لتشمل أعداد الطلبات بشكل منظم
function sendOrderViaWhatsApp() {
    if (cart.length === 0) {
        return;
    }
    
    const phoneNumber = "+201029456680";
    let message = "طلب جديد من كافيه بريس ☕️\n";
    message += "-------------------------\n";
    
    cart.forEach(item => {
        const sizeText = item.size ? ` (${item.size})` : '';
        const itemTotal = item.price * item.quantity;
        message += `• عدد (${item.quantity}) × ${item.name}${sizeText} - بسعر: ${itemTotal} ج.م\n`;
    });
    
    message += "-------------------------\n";
    message += `السعر الإجمالي: ${calculateTotalPrice()} ج.م\n`;
    message += "-------------------------\n";
    message += "شكراً لاختيارك كافيه بريس";
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}