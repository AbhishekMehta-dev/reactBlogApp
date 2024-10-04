import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Automatically log in the user after account creation
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("User successfully logged in:", session);
            return session;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("Current user details:", user);
            return user;
        } catch (error) {
            // Check if the error is due to a missing session
            if (error.code === 401) {
                console.log("User is not logged in or session has expired.");
            } else {
                console.error("Appwrite Service :: getCurrentUser :: error", error);
            }
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            console.log("User logged out successfully.");
        } catch (error) {
            console.error("Appwrite Service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
