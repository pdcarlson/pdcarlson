// src/lib/appwrite.js
import { Client, Databases, Account, Query } from "appwrite";

// import enviornment variables
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const CONTENT_COLLECTION_ID = import.meta.env.VITE_APPWRITE_CONTENT_COLLECTION_ID;
const CONTENT_DOCUMENT_ID = import.meta.env.VITE_APPWRITE_CONTENT_DOCUMENT_ID;

// setup client
const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

// --- project functions ---
export const getMyProjects = async () => {
    try {
        const result = await databases.listDocuments(
            DATABASE_ID,
            PROJECTS_COLLECTION_ID,
            [Query.orderAsc("order")] // sort projects by the 'order' field
        );
        return result.documents;
    } catch (e) {
        console.error("appwrite error: failed to fetch projects", e);
        throw e;
    }
}

// --- site content functions ---
export const getSiteContent = async () => {
    try {
        const result = await databases.getDocument(
            DATABASE_ID,
            CONTENT_COLLECTION_ID,
            CONTENT_DOCUMENT_ID
        );
        return result;
    } catch (e) {
        console.error("appwrite error: failed to fetch site content", e);
        throw e;
    }
};

export const updateSiteContent = async (data) => {
    try {
        const result = await databases.updateDocument(
            DATABASE_ID,
            CONTENT_COLLECTION_ID,
            CONTENT_DOCUMENT_ID,
            data
        );
        return result;
    } catch (e) {
        console.error("appwrite error: failed to update site content", e);
        throw e;
    }
};


export { client, databases, account };