import { Client, Databases, Account, Query } from "appwrite";

// import enviornment variables
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// setup client
const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

export const getMyProjects = async () => {
    try {
        const result = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.orderAsc("order")] // sort projects by the 'order' field
        );
        return result.documents;
    } catch (e) {
        // use console.error for better error logging
        console.error("Appwrite Error: Failed to fetch projects", e);
        // re-throw the error so the component that called this can handle it
        throw e;
    }
}

export { client, databases, account };