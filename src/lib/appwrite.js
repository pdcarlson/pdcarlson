import { Client, Databases, Account } from "appwrite";

// import enviornment variables
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// setup client
const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID);

const database = new Databases(client);
const account = new Account(client);

export const getMyProjects = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [])
        return result.documents;
    } catch (e) {
        console.log(e);
    }
}

export { client, database, account };
