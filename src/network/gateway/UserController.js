import ApiService from '../ApiService';

class UserController {
    constructor() {
        this.apiService = new ApiService();
    }

    /**
     * Sign up a new user
     * @param {string} firstName - User's first name
     * @param {string} lastName - User's last name
     * @param {string} email - User's email address
     * @param {string} password - User's password
     * @returns {Promise<Object>} New session with token and public user data
     */
    async signup(firstName, lastName, email, password) {
        const userSignup = {
            firstName,
            lastName,
            email,
            password
        };
        return this.apiService.post('users', userSignup);
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
}

export default UserController;
