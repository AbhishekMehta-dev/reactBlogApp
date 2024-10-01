import conf from '../conf/config.js';

import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl);
        this.client.setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email, password, name);
            if (userAccount){
              //user login
            }else{
                return userAccount
            }
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create account");
        }
    }
}

const authService = new AuthService();

export default authService