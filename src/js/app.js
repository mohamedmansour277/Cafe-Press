// نظام الـ Routing وعرض الصفحات ديناميكياً

// نظام الـ Routing وعرض الصفحات ديناميكياً
window.currentPage = 'home';

// حل مشكلة الإزاحة التلقائية (50px) عند الريفريش - إجبار المتصفح على فتح القمة دائماً
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
    // عند أول تحميل، نلغي التأثير الناعم (smooth) عشان ما يحصلش تداخل
    navigateTo('home', null, false); 
});

// أضفنا بارامتر ثالث (smooth) وقيمته الافتراضية true
function navigateTo(pageId, sectionId = null, smooth = true) {
    window.currentPage = pageId;
    const mainContent = document.getElementById('mainContent');
    
    // 1. أولاً: بناء ورسم الصفحة الجديدة بالكامل في الـ DOM
    if (pageId === 'home') {
        renderHomePage(mainContent);
    } else if (pageId === 'section' && sectionId) {
        renderSectionPage(mainContent, sectionId);
    } else if (pageId === 'cart') {
        renderCartPage(mainContent);
    }

    // 2. ثانياً: إجبار المتصفح على التصفير والطلوع للقمة فوراً بعد بناء الصفحة
    // وضعناها داخل setTimeout (حتى لو بـ 0 ملي ثانية) لتأكيد تنفيذها بعد انتهاء الـ Rendering تماماً
    setTimeout(() => {
        window.scrollTo({ 
            top: 0, 
            behavior: smooth ? 'smooth' : 'auto' 
        });
    }, 0);
}

function renderHomePage(container) {
    container.innerHTML = `
        <div class="home-container">
            <h1 class="brand-title">Cafe Press</h1>
            <p class="brand-subtitle">أكثر من مجرد كافيه .. على مزاجك بالظبط</p>
            
            <h2 class="menu-label">المنيو</h2>
            
            <div class="categories-grid">
                <div class="category-card" onclick="navigateTo('section', 'pizza')">
                    <div class="image-placeholder skeleton" id="loader_pizza"></div>
                    <img src="./src/imgs/pizzaSec.webp" alt="البيتزا والمكرونة" onload="handleImageLoad(this, 'loader_pizza')">
                </div>
                
                <div class="category-card" onclick="navigateTo('section', 'grill')">
                    <div class="image-placeholder skeleton" id="loader_grill"></div>
                    <img src="./src/imgs/fireSec.webp" alt="المشويات" onload="handleImageLoad(this, 'loader_grill')">
                </div>
                
                <div class="category-card" onclick="navigateTo('section', 'bakery')">
                    <div class="image-placeholder skeleton" id="loader_bakery"></div>
                    <img src="./src/imgs/dessertSec.webp" alt="التحلية والمخبوزات" onload="handleImageLoad(this, 'loader_bakery')">
                </div>
                
                <div class="category-card" onclick="navigateTo('section', 'drinks')">
                    <div class="image-placeholder skeleton" id="loader_drinks"></div>
                    <img src="./src/imgs/drinkSec.webp" alt="المشروبات" onload="handleImageLoad(this, 'loader_drinks')">
                </div>
            </div>
        </div>
    `;
}

// دالة ذكية لإخفاء الـ Skeleton وإظهار الصورة بنعومة فور اكتمال تحميلها
function handleImageLoad(imgElement, loaderId) {
    imgElement.classList.add('loaded');
    const loader = document.getElementById(loaderId);
    if (loader) {
        loader.style.display = 'none';
    }
}

function renderSectionPage(container, sectionId) {
    const sectionData = CAFE_MENU[sectionId];
    if (!sectionData) return;

    let productsHTML = '';
    
    sectionData.items.forEach(product => {
        let sizesHTML = '';
        let initialPrice = product.price;

        if (product.hasSizes) {
            initialPrice = product.prices.medium; // الافتراضي وسط
            sizesHTML = `
                <div class="sizes-container" id="sizes_${product.id}">
                    <button class="size-btn" onclick="selectProductSize('${product.id}', 'صغير', ${product.prices.small})">صغير</button>
                    <button class="size-btn active" onclick="selectProductSize('${product.id}', 'وسط', ${product.prices.medium})">وسط</button>
                    <button class="size-btn" onclick="selectProductSize('${product.id}', 'كبير', ${product.prices.large})">كبير</button>
                </div>
            `;
        }

        productsHTML += `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.img}" alt="${product.name}" class="product-img">
                <div class="product-info">
                    <div class="product-name-row">
                        <h3 class="product-name">${product.name}</h3>
                        <span class="product-price" id="price_${product.id}">${initialPrice} ج</span>
                    </div>
                    <p class="product-desc">${product.desc}</p>
                    
                    ${sizesHTML}
                    
                    <div class="action-row">
                        <div class="qty-counter">
                            <button class="qty-btn" onclick="changeUiQty('${product.id}', -1)">-</button>
                            <span class="qty-val" id="qty_${product.id}">1</span>
                            <button class="qty-btn" onclick="changeUiQty('${product.id}', 1)">+</button>
                        </div>
                        <button class="add-to-cart-btn" onclick="triggerAddToCart('${product.id}', '${product.name}', ${product.hasSizes})">+ أضــف للسلة</button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="section-container">
            <div class="section-header">
                <h2 class="section-title">${sectionData.title}</h2>
                <img src="./src/icon/back.svg" alt="رجوع" class="back-icon" onclick="navigateTo('home')">
            </div>
            <div class="products-grid">
                ${productsHTML}
            </div>
        </div>
    `;
    
    // حفظ المقاسات المحددة افتراضياً في سمات العنصر
    sectionData.items.forEach(product => {
        const card = document.querySelector(`[data-product-id="${product.id}"]`);
        if (card) {
            if (product.hasSizes) {
                card.setAttribute('data-selected-size', 'وسط');
                card.setAttribute('data-selected-price', product.prices.medium);
            } else {
                card.setAttribute('data-selected-size', '');
                card.setAttribute('data-selected-price', product.price);
            }
        }
    });
}

function selectProductSize(productId, sizeLabel, price) {
    const card = document.querySelector(`[data-product-id="${productId}"]`);
    card.setAttribute('data-selected-size', sizeLabel);
    card.setAttribute('data-selected-price', price);
    
    // تحديث السعر المعروض
    document.getElementById(`price_${productId}`).innerText = `${price} ج.م`;
    
    // تغيير الـ active state للأزرار
    const buttons = document.querySelectorAll(`#sizes_${productId} .size-btn`);
    buttons.forEach(btn => {
        if (btn.innerText === sizeLabel) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function changeUiQty(productId, change) {
    const qtyElem = document.getElementById(`qty_${productId}`);
    let currentQty = parseInt(qtyElem.innerText);
    currentQty += change;
    if (currentQty < 1) currentQty = 1;
    qtyElem.innerText = currentQty;
}

function triggerAddToCart(productId, name, hasSizes) {
    const card = document.querySelector(`[data-product-id="${productId}"]`);
    const size = card.getAttribute('data-selected-size');
    const price = parseFloat(card.getAttribute('data-selected-price'));
    const qty = parseInt(document.getElementById(`qty_${productId}`).innerText);
    
    addToCart(productId, name, hasSizes ? size : null, price, qty);
    
    // إعادة العداد لـ 1 بعد الإضافة
    document.getElementById(`qty_${productId}`).innerText = "1";
}

function renderCartPage(container = null) {
    const mainContent = container || document.getElementById('mainContent');
    
    if (cart.length === 0) {
        mainContent.innerHTML = `
            <h2 class="cart-title">سلة الطلبات</h2>
            <div class="empty-cart-message">سلتك فارغة تماماً.. تصفح المنيو وأضف وجباتك المفضلة!</div>
        `;
        return;
    }
    
    let cartItemsHTML = '';
    cart.forEach(item => {
        const sizeInfo = item.size ? `المقاس: ${item.size}` : 'حجم واحد';
        cartItemsHTML += `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <span class="cart-item-meta">${sizeInfo} | الكمية: ${item.quantity}</span>
                    <span class="cart-item-price">${item.price * item.quantity} ج</span>
                </div>
                <div class="cart-item-actions">
                    <div class="qty-counter">
                        <button class="qty-btn" onclick="updateCartItemQuantity('${item.key}', ${item.quantity - 1})">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartItemQuantity('${item.key}', ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-item-btn" onclick="removeCartItem('${item.key}')">حذف</button>
                </div>
            </div>
        `;
    });
    
    mainContent.innerHTML = `
        <h2 class="cart-title">سلة الطلبات</h2>
        <div class="cart-items-list">
            ${cartItemsHTML}
        </div>
        <button class="checkout-btn" onclick="sendOrderViaWhatsApp()">
            إتمام الطلب عبر الواتساب (${calculateTotalPrice()} ج.م)
        </button>
    `;
}