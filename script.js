// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Global State
let products = [];
let currentProductId = null;
let isEditMode = false;

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const productModal = document.getElementById('productModal');
const productForm = document.getElementById('productForm');
const modalTitle = document.getElementById('modalTitle');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const addProductBtn = document.getElementById('addProductBtn');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const toastContainer = document.getElementById('toastContainer');

// Analytics elements
const totalProducts = document.getElementById('totalProducts');
const avgPrice = document.getElementById('avgPrice');
const maxPrice = document.getElementById('maxPrice');
const minPrice = document.getElementById('minPrice');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadProducts();
});

// Initialize App
function initializeApp() {
    setupTabNavigation();
    setupSearchAndFilter();
    setupModal();
}

// Setup Tab Navigation
function setupTabNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Update active nav button
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                    
                    // Load analytics when switching to analytics tab
                    if (targetTab === 'analytics') {
                        updateAnalytics();
                    }
                }
            });
        });
    });
}

// Setup Search and Filter
function setupSearchAndFilter() {
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    sortSelect.addEventListener('change', handleSort);
}

// Setup Modal
function setupModal() {
    addProductBtn.addEventListener('click', () => openModal());
    closeModal.addEventListener('click', () => closeModalHandler());
    cancelBtn.addEventListener('click', () => closeModalHandler());
    productForm.addEventListener('submit', handleFormSubmit);
    
    // Close modal on outside click
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeModalHandler();
        }
    });
}

// API Functions
async function fetchProducts() {
    try {
        showLoading();
        const response = await fetch(`${API_BASE_URL}/produtos`);
        if (!response.ok) {
            throw new Error('Erro ao carregar produtos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        showToast('Erro ao carregar produtos: ' + error.message, 'error');
        return [];
    } finally {
        hideLoading();
    }
}

async function createProduct(productData) {
    try {
        showLoading();
        const response = await fetch(`${API_BASE_URL}/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.erro || 'Erro ao criar produto');
        }
        
        const newProduct = await response.json();
        return newProduct;
    } catch (error) {
        showToast('Erro ao criar produto: ' + error.message, 'error');
        throw error;
    } finally {
        hideLoading();
    }
}

async function updateProduct(id, productData) {
    try {
        showLoading();
        const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.erro || 'Erro ao atualizar produto');
        }
        
        const updatedProduct = await response.json();
        return updatedProduct;
    } catch (error) {
        showToast('Erro ao atualizar produto: ' + error.message, 'error');
        throw error;
    } finally {
        hideLoading();
    }
}

async function deleteProduct(id) {
    try {
        showLoading();
        const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.erro || 'Erro ao deletar produto');
        }
        
        return true;
    } catch (error) {
        showToast('Erro ao deletar produto: ' + error.message, 'error');
        throw error;
    } finally {
        hideLoading();
    }
}

// Load and Display Products
async function loadProducts() {
    products = await fetchProducts();
    displayProducts(products);
}

function displayProducts(productsToShow) {
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box"></i>
                <h3>Nenhum produto encontrado</h3>
                <p>Adicione produtos para começar a gerenciar seu estoque.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-header">
                <div>
                    <h3 class="product-name">${escapeHtml(product.nome)}</h3>
                </div>
                <div class="product-price">R$ ${formatPrice(product.preco)}</div>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary btn-sm" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i>
                    Editar
                </button>
                <button class="btn btn-danger btn-sm" onclick="confirmDeleteProduct(${product.id})">
                    <i class="fas fa-trash"></i>
                    Excluir
                </button>
            </div>
        </div>
    `).join('');
}

// Search and Filter Functions
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.nome.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

function handleSort() {
    const sortBy = sortSelect.value;
    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.nome.localeCompare(b.nome);
            case 'price':
                return a.preco - b.preco;
            case 'id':
                return a.id - b.id;
            default:
                return 0;
        }
    });
    displayProducts(sortedProducts);
}

// Modal Functions
function openModal(product = null) {
    isEditMode = !!product;
    currentProductId = product ? product.id : null;
    
    modalTitle.textContent = isEditMode ? 'Editar Produto' : 'Adicionar Produto';
    productNameInput.value = product ? product.nome : '';
    productPriceInput.value = product ? product.preco : '';
    
    productModal.classList.add('active');
    productNameInput.focus();
}

function closeModalHandler() {
    productModal.classList.remove('active');
    productForm.reset();
    isEditMode = false;
    currentProductId = null;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const productData = {
        nome: productNameInput.value.trim(),
        preco: parseFloat(productPriceInput.value)
    };
    
    if (!productData.nome || isNaN(productData.preco) || productData.preco < 0) {
        showToast('Por favor, preencha todos os campos corretamente', 'error');
        return;
    }
    
    try {
        if (isEditMode) {
            await updateProduct(currentProductId, productData);
            showToast('Produto atualizado com sucesso!', 'success');
        } else {
            await createProduct(productData);
            showToast('Produto criado com sucesso!', 'success');
        }
        
        closeModalHandler();
        loadProducts();
    } catch (error) {
        // Error is already handled in the API functions
    }
}

// Product Actions
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        openModal(product);
    }
}

function confirmDeleteProduct(id) {
    const product = products.find(p => p.id === id);
    if (product && confirm(`Tem certeza que deseja excluir o produto "${product.nome}"?`)) {
        deleteProductHandler(id);
    }
}

async function deleteProductHandler(id) {
    try {
        await deleteProduct(id);
        showToast('Produto excluído com sucesso!', 'success');
        loadProducts();
    } catch (error) {
        // Error is already handled in the API functions
    }
}

// Analytics Functions
function updateAnalytics() {
    if (products.length === 0) {
        totalProducts.textContent = '0';
        avgPrice.textContent = 'R$ 0,00';
        maxPrice.textContent = 'R$ 0,00';
        minPrice.textContent = 'R$ 0,00';
        return;
    }
    
    const prices = products.map(p => p.preco);
    const total = products.length;
    const average = prices.reduce((sum, price) => sum + price, 0) / total;
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    
    totalProducts.textContent = total.toString();
    avgPrice.textContent = `R$ ${formatPrice(average)}`;
    maxPrice.textContent = `R$ ${formatPrice(max)}`;
    minPrice.textContent = `R$ ${formatPrice(min)}`;
}

// Utility Functions
function formatPrice(price) {
    return price.toFixed(2).replace('.', ',');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 
                 'info-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 5000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event Listeners
function setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && productModal.classList.contains('active')) {
            closeModalHandler();
        }
    });
    
    // Prevent form submission on Enter in search
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
}