const conf = {
  appwritUrl: String(import.meta.env.VITE_APPPWRITE_URL),
  appwritProjectId: String(import.meta.env.VITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
  appwriteCollecionId: String(import.meta.env.VITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID),
};
export default conf;
