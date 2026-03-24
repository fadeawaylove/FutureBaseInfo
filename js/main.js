function renderProducts(products) {
    const navList = document.getElementById('nav-list');
    const contentRoot = document.getElementById('content-root');

    navList.innerHTML = products.map(product => {
        const activeClass = product.active ? ' active' : '';
        return `<li class="nav-item${activeClass}" data-product-id="${product.id}">${product.navHtml}</li>`;
    }).join('');

    contentRoot.innerHTML = products.map(product => {
        const activeClass = product.active ? ' active' : '';
        return `<section id="${product.id}" class="content-section${activeClass}">${product.contentHtml}</section>`;
    }).join('');
}

function setActiveProduct(productId) {
    const targetSection = document.getElementById(productId);
    const targetNav = document.querySelector(`.nav-item[data-product-id="${productId}"]`);
    if (!targetSection || !targetNav) {
        return false;
    }

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item === targetNav);
    });

    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.toggle('active', section === targetSection);
    });

    if (window.location.hash !== `#${productId}`) {
        history.replaceState(null, '', `#${productId}`);
    }

    return true;
}

function initProductNavigation(products) {
    const navList = document.getElementById('nav-list');
    navList.addEventListener('click', event => {
        const navItem = event.target.closest('.nav-item');
        if (!navItem) {
            return;
        }

        setActiveProduct(navItem.dataset.productId);
    });

    window.addEventListener('hashchange', () => {
        const hashProduct = window.location.hash.replace('#', '');
        if (hashProduct) {
            setActiveProduct(hashProduct);
        }
    });

    const defaultProduct = products.find(product => product.active)?.id || products[0]?.id;
    const hashProduct = window.location.hash.replace('#', '');
    if (!setActiveProduct(hashProduct || defaultProduct) && defaultProduct) {
        setActiveProduct(defaultProduct);
    }
}

function initPositionCalculators() {
    document.querySelectorAll('.position-calculator').forEach(calc => {
        const tickValue = parseFloat(calc.dataset.tickValue) || 10;
        const tickSize = parseFloat(calc.dataset.tickSize) || 1;
        const maxLossInput = calc.querySelector('.max-loss');
        const priceDiffInput = calc.querySelector('.price-diff');
        const resultValue = calc.querySelector('.calc-result-value');

        if (!maxLossInput || !priceDiffInput || !resultValue) {
            return;
        }

        function calculate() {
            const maxLoss = parseFloat(maxLossInput.value) || 0;
            const priceDiff = parseFloat(priceDiffInput.value) || 0;
            const priceTicks = priceDiff / tickSize;

            if (maxLoss > 0 && priceTicks > 0) {
                const lots = Math.floor(maxLoss / (priceTicks * tickValue));
                resultValue.textContent = lots > 0 ? `${lots} 手` : '0 手';
            } else {
                resultValue.textContent = '-';
            }
        }

        maxLossInput.addEventListener('input', calculate);
        priceDiffInput.addEventListener('input', calculate);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const products = window.PRODUCTS || [];
    renderProducts(products);
    initProductNavigation(products);
    initPositionCalculators();
});
