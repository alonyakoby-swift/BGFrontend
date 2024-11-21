import ApiService from '../ApiService';

class ProductController {
    constructor() {
        this.apiService = new ApiService();
    }

    /**
     * Create a new product
     * @param {Object} productData - Data for the new product
     * @returns {Promise<Object>} Created product object
     */
    async createProduct(productData) {
        return this.apiService.post('products', productData);
    }

    /**
     * Batch create products
     * @param {Array<Object>} products - Array of product data
     * @returns {Promise<Array<Object>>} Created products
     */
    async createProductsBatch(products) {
        return this.apiService.post('products/batch', products);
    }

    /**
     * Get all products with pagination
     * @param {number} page - Page number
     * @param {number} per - Items per page
     * @returns {Promise<Object>} Paginated products
     */
    async getAllProducts(page = 1, per = 10) {
        const url = `products?page=${page}&per=${per}`;
        return this.apiService.get(url);
    }


    /**
     * Get product by ID with translations
     * @param {string} productId - The UUID of the product
     * @returns {Promise<Object>} Product with translations
     */
    async getProductById(productId) {
        return this.apiService.get(`products/${productId}`);
    }

    /**
     * Update a product by ID
     * @param {string} productId - The UUID of the product
     * @param {Object} productData - Data to update
     * @returns {Promise<Object>} Updated product
     */
    async updateProduct(productId, productData) {
        return this.apiService.patch(`products/${productId}`, productData);
    }

    /**
     * Batch update products
     * @param {Array<Object>} products - Array of product data with IDs
     * @returns {Promise<Array<Object>>} Updated products
     */
    async updateProductsBatch(products) {
        return this.apiService.patch('products/batch', products);
    }

    /**
     * Delete a product by ID
     * @param {string} productId - The UUID of the product
     * @returns {Promise<void>}
     */
    async deleteProduct(productId) {
        return this.apiService.delete(`products/${productId}`);
    }

    /**
     * Fetch products from data source gateway
     * @returns {Promise<Array<Object>>} List of products
     */
    async fetchProductsFromGateway() {
        return this.apiService.get('products/gateway/fetchProducts');
    }

    /**
     * Fetch product by item code from gateway
     * @param {string} itemCode - The item code of the product
     * @returns {Promise<Object>} Product object
     */
    async fetchProductByItemCode(itemCode) {
        return this.apiService.get(`products/gateway/fetch/${itemCode}`);
    }

    /**
     * Synchronize database in batches
     * @returns {Promise<Object>} Synchronization status
     */
    async syncDatabaseBatch() {
        return this.apiService.get('products/gateway/syncDatabase/batch');
    }

    /**
     * Synchronize entire database
     * @returns {Promise<Object>} Synchronization status
     */
    async syncDatabase() {
        return this.apiService.get('products/gateway/syncDatabase');
    }

    /**
     * List all brands
     * @returns {Promise<Array<String>>} List of brand names
     */
    async listBrands() {
        return this.apiService.get('products/gateway/listBrands');
    }

    /**
     * Search products by item code
     * @param {string} itemCode - The item code to search for
     * @returns {Promise<Array<Object>>} List of matching products
     */
    async searchByItemCode(itemCode) {
        return this.apiService.get(`products/searchbyItemCode/${itemCode}`);
    }

    /**
     * Format product description
     * @param {string} productId - The UUID of the product
     * @returns {Promise<Object>} Formatting status
     */
    async formatProductDescription(productId) {
        return this.apiService.get(`products/${productId}/format`);
    }

    /**
     * Translate product description
     * @param {string} productId - The UUID of the product
     * @param {string} language - Language code for translation
     * @returns {Promise<Object>} Translation status
     */
    async translateProductDescription(translationId, productID, language) {
        return this.apiService.get(`translations/${translationId}/translate/${language}/${productID}`);
    }

    /**
     * Search products with filters
     * @param {Object} params - Search parameters (query, brand, category, subcategory)
     * @returns {Promise<Array<Object>>} List of matching products
     */
    async searchProducts(params = {}) {
        const queryParams = new URLSearchParams(params).toString();
        return this.apiService.get(`products/search?${queryParams}`);
    }
}

export default ProductController;
