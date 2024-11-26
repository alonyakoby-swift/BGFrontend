import ApiService from '../ApiService';

class UserController {
    constructor() {
        this.apiService = new ApiService();
    }

    /**
     * Sign up a new user
     * @param {json} data- A Json body of the user
     * @returns {Promise<Object>} New session with token and public user data
     */
    async createUser(data) {
        return this.apiService.post('users', data);
    }

    /**
     * Batch sign up users
     * @param {Array<Object>} users - Array of user signup data
     * @returns {Promise<Array<Object>>} Array of new sessions
     */
    async signupBatch(users) {
        return this.apiService.post('users/batch', users);
    }

    /**
     * Log in a user
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {Promise<Object>} New session with token and public user data
     */
    async login(email, password) {
        const loginData = {
            email,
            password
        };
        return this.apiService.post('users/login', loginData);
    }

    /**
     * Get all users
     * @returns {Promise<Array<Object>>} Array of user objects
     */
    async getAllUsers() {
        return this.apiService.get('users');
    }

    /**
     * Get a user by ID
     * @param {string} userId - The UUID of the user
     * @returns {Promise<Object>} User object
     */
    async getUserById(userId) {
        return this.apiService.get(`users/${userId}`);
    }

    /**
     * Update a user by ID
     * @param {string} userId - The UUID of the user
     * @param {Object} userData - Data to update
     * @returns {Promise<Object>} Updated user object
     */
    async updateUser(userId, userData) {
        return this.apiService.patch(`users/${userId}`, userData);
    }

    /**
     * Batch update users
     * @param {Array<Object>} users - Array of user data with IDs
     * @returns {Promise<Array<Object>>} Updated users
     */
    async updateUsersBatch(users) {
        return this.apiService.patch('users/batch', users);
    }

    /**
     * Delete a user by ID
     * @param {string} userId - The UUID of the user
     * @returns {Promise<void>}
     */
    async deleteUser(userId) {
        return this.apiService.delete(`users/${userId}`);
    }

    /**
     * Search users by query
     * @param {Object} queryParams - The query parameters for the search
     * @returns {Promise<Array<Object>>} Array of user objects
     */
    async searchUsers(queryParams) {
        const queryString = new URLSearchParams(queryParams).toString();
        return this.apiService.get(`users/search?${queryString}`);
    }

    /**
     * Override password for a user by ID
     * @param {string} userId - The UUID of the user
     * @param {string} newPassword - The new password to set
     * @returns {Promise<HTTPStatus>} Status of the operation
     */
    async overridePassword(userId, newPassword) {
        const passwordData = {
            newPassword
        };
        return this.apiService.post(`users/${userId}/override`, passwordData);
    }
}

export default UserController;
