import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  //cosntructor colling
  constructor() {
    this.client.setEndpoint(conf.appwritUrl).setProject(conf.appwritProjectId);
    this.databses = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //method for create post
  //lwe make slug the unique id which is passsed (slug  == unique document id)
  async createPost({ title, slug, content, featureedImage, status, userId }) {
    try {
      return await this.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollecionId,
        slug,
        //other details that needs to be sent to create the document

        {
          title,
          content,
          featureedImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error ", error);
    }
  }

  //methodd to update
  async updatePost(slug, { title, content, featureedImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollecionId,
        slug,
        {
          title,
          content,
          featureedImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  //since we just neeed to pass the document id to delete the post, so passing the slug value
  async deletePost({ slug }) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollecionId,
        slug
      );
      return true; // since the post we have deleted so we are returning true, that yes it has been deleted
      //now we will handle this on frontend that if we will get true thn , what to post or render.
    } catch (error) {
      console.log("appwrite service:: deletePost  :: error", error);
      return false;
    }
  }

  //to get the document which are active

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("appwrite service:: getPost  :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollecionId,
        queries
      );
    } catch (error) {
      console.log("appwrite service:: getPosts :: error", error);
      return false;
    }
  }

  //file upload
  async uploadFile(file) {
    try {
      //this will return some id which is the file id
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite  service :: deleteFile :: error ", error);
      return false;
    }
  }

  //here since it does not return any kiind of promise hence there is no need toput async await here
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
