import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

//better code practice
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwritUrl).setProject(conf.appwritProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      //since we have to return something for sure coz we have this as a fucntuion and it has scope hence ,
      if (userAccount) {
        //call other funtion to force login here
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //making login method
  async login({ email, password }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // to see if the user is login or not
  async getCurrentUser() {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error ", error);
    }
    return null;
  }

  //to make the functionality for logout (delete session bolte isko  )
  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log("Appwrite service :: logout :: error ", error);
    }
  }
}

//making a oobject of this auth class so that user will just make a new object of this auth
//class and hence can use it

const authService = new AuthService();

export default authService; //exporting the object directly to help it there only
