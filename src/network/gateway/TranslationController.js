import ApiService from '../ApiService';

class TranslationController {
    constructor() {
        this.apiService = new ApiService();
    }

    /**
     * Create a new translation
     * @param {Object} translationData - Data for the new translation
     * @returns {Promise<Object>} Created translation object
     */
    async createTranslation(translationData) {
        return this.apiService.post('translations', translationData);
    }

    /**
     * Batch create translations
     * @param {Array<Object>} translations - Array of translation data
     * @returns {Promise<Array<Object>>} Created translations
     */
    async createTranslationsBatch(translations) {
        return this.apiService.post('translations/batch', translations);
    }

    /**
     * Get all translations
     * @returns {Promise<Array<Object>>} List of translations
     */
    async getAllTranslations() {
        return this.apiService.get('translations');
    }

    /**
     * Get all translations
     * @returns {Promise<Array<Object>>} List of translations
     */
    async verifyTranslatiod(id) {
        return this.apiService.get(`translations/${id}/verify`);
    }

    /**
     * Get a translation by ID
     * @param {string} translationId - The UUID of the translation
     * @returns {Promise<Object>} Translation object
     */
    async getTranslationById(translationId) {
        return this.apiService.get(`translations/${translationId}`);
    }

    /**
     * Get an overview of translations
     * @returns {Promise<Object>} Overview data
     */
    async getOverview() {
        return this.apiService.get('translations/overview');
    }

    /**
     * Get translations for a specific item code
     * @param {string} itemCode - The item code
     * @returns {Promise<Array<Object>>} List of translations
     */
    async getTranslationsForItemCode(itemCode) {
        return this.apiService.get(`translations/item/${itemCode}`);
    }

    /**
     * Update a translation by ID
     * @param {string} translationId - The UUID of the translation
     * @param {Object} translationData - Data to update
     * @returns {Promise<Object>} Updated translation
     */
    async updateTranslation(translationId, translationData) {
        return this.apiService.patch(`translations/${translationId}`, translationData);
    }

    /**
     * Batch update translations
     * @param {Array<Object>} translations - Array of translation data with IDs
     * @returns {Promise<Array<Object>>} Updated translations
     */
    async updateTranslationsBatch(translations) {
        return this.apiService.patch('translations/batch', translations);
    }

    /**
     * Delete a translation by ID
     * @param {string} translationId - The UUID of the translation
     * @returns {Promise<void>}
     */
    async deleteTranslation(translationId) {
        return this.apiService.delete(`translations/${translationId}`);
    }
}

export default TranslationController;
