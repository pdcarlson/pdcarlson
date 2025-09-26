// src/lib/appwrite.js
import { Client, Databases, Account, Query, ID } from "appwrite";

// import enviornment variables
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const CONTENT_COLLECTION_ID = import.meta.env.VITE_APPWRITE_CONTENT_COLLECTION_ID;
const CONTENT_DOCUMENT_ID = import.meta.env.VITE_APPWRITE_CONTENT_DOCUMENT_ID;
const DOCUMENTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_DOCUMENTS_COLLECTION_ID;

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
            [Query.orderAsc("order")]
        );
        return result.documents;
    } catch (e) {
        console.error("appwrite error: failed to fetch projects", e);
        throw e;
    }
}

export const updateProjectsOrder = async (projects) => {
    try {
        const updatePromises = projects.map((project, index) => {
            return databases.updateDocument(
                DATABASE_ID,
                PROJECTS_COLLECTION_ID,
                project.$id,
                { order: index }
            );
        });
        await Promise.all(updatePromises);
    } catch (e) {
        console.error("appwrite error: failed to update projects order", e);
        throw e;
    }
};

export const updateProject = async (projectId, data) => {
    try {
        const result = await databases.updateDocument(
            DATABASE_ID,
            PROJECTS_COLLECTION_ID,
            projectId,
            data
        );
        return result;
    } catch (e) {
        console.error("appwrite error: failed to update project", e);
        throw e;
    }
};

export const createProject = async (data) => {
    try {
        // find the highest current order number to place the new project at the end
        const projectList = await getMyProjects();
        const maxOrder = projectList.reduce((max, p) => p.order > max ? p.order : max, -1);
        const newOrder = maxOrder + 1;

        const result = await databases.createDocument(
            DATABASE_ID,
            PROJECTS_COLLECTION_ID,
            ID.unique(),
            { ...data, order: newOrder } // add the new order number
        );
        return result;
    } catch (e) {
        console.error("appwrite error: failed to create project", e);
        throw e;
    }
};

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

// --- document hub functions ---
export const getDocuments = async () => {
    try {
        const result = await databases.listDocuments(
            DATABASE_ID,
            DOCUMENTS_COLLECTION_ID,
            [Query.orderDesc("$updatedAt")] // show most recently updated first
        );
        return result.documents;
    } catch (e) {
        console.error("appwrite error: failed to fetch documents", e);
        throw e;
    }
};

export const createHubDocument = async (data) => {
    try {
        const result = await databases.createDocument(
            DATABASE_ID,
            DOCUMENTS_COLLECTION_ID,
            ID.unique(),
            data
        );
        return result;
    } catch (e) {
        console.error("appwrite error: failed to create document", e);
        throw e;
    }
};

export const updateHubDocument = async (documentId, data) => {
    try {
        const result = await databases.updateDocument(
            DATABASE_ID,
            DOCUMENTS_COLLECTION_ID,
            documentId,
            data
        );
        return result;
    } catch (e) {
        console.error("appwrite error: failed to update document", e);
        throw e;
    }
};

export const deleteHubDocument = async (documentId) => {
    try {
        await databases.deleteDocument(
            DATABASE_ID,
            DOCUMENTS_COLLECTION_ID,
            documentId,
        );
    } catch (e) {
        console.error("appwrite error: failed to delete document", e);
        throw e;
    }
};


export { client, databases, account };