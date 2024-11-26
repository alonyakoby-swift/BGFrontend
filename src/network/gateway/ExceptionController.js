import ApiService from '../ApiService';

class ExceptionController {
    constructor() {
        this.apiService = new ApiService();
    }

    /**
     * Create a new exception
     * @param {Object} data - Exception data
     * @returns {Promise<Object>} Created exception object
     */
    async createException(data) {
        return this.apiService.post('exceptions', data);
    }

    /**
     * Batch create exceptions
     * @param {Array<Object>} exceptions - Array of exceptions to create
     * @returns {Promise<Array<Object>>} Array of created exception objects
     */
    async createBatch(exceptions) {
        return this.apiService.post('exceptions/batch', exceptions);
    }

    /**
     * Get all exceptions
     * @returns {Promise<Array<Object>>} Array of exception objects
     */
    async getAllExceptions() {
        return this.apiService.get('exceptions');
    }

    /**
     * Get an exception by ID
     * @param {string} exceptionId - The UUID of the exception
     * @returns {Promise<Object>} Exception object
     */
    async getExceptionById(exceptionId) {
        return this.apiService.get(`exceptions/${exceptionId}`);
    }

    /**
     * Update an exception by ID
     * @param {string} exceptionId - The UUID of the exception
     * @param {Object} exceptionData - Data to update
     * @returns {Promise<Object>} Updated exception object
     */
    async updateException(exceptionId, exceptionData) {
        return this.apiService.patch(`exceptions/${exceptionId}`, exceptionData);
    }

    /**
     * Batch update exceptions
     * @param {Array<Object>} exceptions - Array of exception data with IDs
     * @returns {Promise<Array<Object>>} Updated exceptions
     */
    async updateBatch(exceptions) {
        return this.apiService.patch('exceptions/batch', exceptions);
    }

    /**
     * Delete an exception by ID
     * @param {string} exceptionId - The UUID of the exception
     * @returns {Promise<void>}
     */
    async deleteException(exceptionId) {
        return this.apiService.delete(`exceptions/${exceptionId}`);
    }
}

export default ExceptionController;

// Copyright © 2023.
// Alon Yakobichvili
// All rights reserved.
