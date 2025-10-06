// API Configuration
const API_BASE_URL = `${window.location.protocol}//${window.location.host}/api`;
const API_ENDPOINTS = {
    products: `${API_BASE_URL}/produtos`
};

// Global State
let products = [];
let filteredProducts = [];
let isEditing = false;
let editingProductId = null;

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const productModal = document.getElementById('productModal');
const productForm = document.getElementById('productForm');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const addProductBtn = document.getElementById('addProductBtn');
const toastContainer = document.getElementById('toastContainer');

// Stats Elements
const totalProducts = document.getElementById('totalProducts');
const totalValue = document.getElementById('totalValue');
const avgPrice = document.getElementById('avgPrice');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadProducts();
}

// Event Listeners
function setupEventListeners() {
    // Modal events
    addProductBtn.addEventListener('click', () => openModal());
    closeModal.addEventListener('click', () => closeModalHandler());
    cancelBtn.addEventListener('click', () => closeModalHandler());
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeModalHandler();
    });

    // Form submission
    productForm.addEventListener('submit', handleFormSubmit);

    // Search functionality
    searchInput.addEventListener('input', handleSearch);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModalHandler();
    });
}

// API Functions
async function fetchProducts() {
    try {
        const response = await fetch(API_ENDPOINTS.products);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        showToast('Erro ao carregar produtos', 'error');
        throw error;
    }
}

async function createProduct(productData) {
    try {
        const response = await fetch(API_ENDPOINTS.products, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.erro || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        showToast(error.message || 'Erro ao criar produto', 'error');
        throw error;
    }
}

async function updateProduct(id, productData) {
    try {
        const response = await fetch(`${API_ENDPOINTS.products}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.erro || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
        showToast(error.message || 'Erro ao atualizar produto', 'error');
        throw error;
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`${API_ENDPOINTS.products}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.erro || `HTTP error! status: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        showToast(error.message || 'Erro ao deletar produto', 'error');
        throw error;
    }
}

// Product Management
async function loadProducts() {
    showLoading(true);
    try {
        products = await fetchProducts();
        filteredProducts = [...products];
        renderProducts();
        updateStats();
    } catch (error) {
        showEmptyState(true);
    } finally {
        showLoading(false);
    }
}

function renderProducts() {
    if (filteredProducts.length === 0) {
        showEmptyState(true);
        return;
    }

    showEmptyState(false);
    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-header">
                <div>
                    <h3 class="product-name">${escapeHtml(product.nome)}</h3>
                    <p class="product-price">R$ ${formatPrice(product.preco)}</p>
                </div>
                <div class="product-actions">
                    <button class="action-btn edit-btn" onclick="editProduct(${product.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteProductConfirm(${product.id})" title="Deletar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Modal Functions
function openModal(product = null) {
    isEditing = !!product;
    editingProductId = product?.id || null;

    if (isEditing) {
        modalTitle.textContent = 'Editar Produto';
        document.getElementById('productName').value = product.nome;
        document.getElementById('productPrice').value = product.preco;
    } else {
        modalTitle.textContent = 'Adicionar Produto';
        productForm.reset();
    }

    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('productName').focus();
}

function closeModalHandler() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
    isEditing = false;
    editingProductId = null;
    productForm.reset();
}

// Form Handling
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(productForm);
    const productData = {
        nome: formData.get('nome').trim(),
        preco: parseFloat(formData.get('preco'))
    };

    // Validation
    if (!productData.nome || !productData.preco || productData.preco < 0) {
        showToast('Por favor, preencha todos os campos corretamente', 'warning');
        return;
    }

    const saveBtn = document.getElementById('saveBtn');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
    saveBtn.disabled = true;

    try {
        if (isEditing) {
            await updateProduct(editingProductId, productData);
            showToast('Produto atualizado com sucesso!', 'success');
        } else {
            await createProduct(productData);
            showToast('Produto criado com sucesso!', 'success');
        }
        
        closeModalHandler();
        await loadProducts();
    } catch (error) {
        // Error handling is done in the API functions
    } finally {
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
    }
}

// Product Actions
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        openModal(product);
    }
}

async function deleteProductConfirm(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (confirm(`Tem certeza que deseja deletar o produto "${product.nome}"?`)) {
        try {
            await deleteProduct(id);
            showToast('Produto deletado com sucesso!', 'success');
            await loadProducts();
        } catch (error) {
            // Error handling is done in the API functions
        }
    }
}

// Search Functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => 
            product.nome.toLowerCase().includes(searchTerm) ||
            product.preco.toString().includes(searchTerm)
        );
    }
    
    renderProducts();
}

// Stats Functions
function updateStats() {
    const total = products.length;
    const totalVal = products.reduce((sum, product) => sum + product.preco, 0);
    const average = total > 0 ? totalVal / total : 0;

    totalProducts.textContent = total;
    totalValue.textContent = `R$ ${formatPrice(totalVal)}`;
    avgPrice.textContent = `R$ ${formatPrice(average)}`;
}

// UI State Functions
function showLoading(show) {
    loadingState.style.display = show ? 'flex' : 'none';
    productsGrid.style.display = show ? 'none' : 'grid';
}

function showEmptyState(show) {
    emptyState.style.display = show ? 'flex' : 'none';
    productsGrid.style.display = show ? 'none' : 'grid';
}

// Utility Functions
function formatPrice(price) {
    return parseFloat(price).toFixed(2).replace('.', ',');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = getToastIcon(type);
    const title = getToastTitle(type);
    
    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

function getToastIcon(type) {
    const icons = {
        success: '<i class="fas fa-check-circle"></i>',
        error: '<i class="fas fa-exclamation-circle"></i>',
        warning: '<i class="fas fa-exclamation-triangle"></i>'
    };
    return icons[type] || icons.success;
}

function getToastTitle(type) {
    const titles = {
        success: 'Sucesso!',
        error: 'Erro!',
        warning: 'Atenção!'
    };
    return titles[type] || titles.success;
}

// Error Handling
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showToast('Ocorreu um erro inesperado', 'error');
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}