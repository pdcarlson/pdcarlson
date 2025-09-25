// src/components/admin/DocumentHub.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { getDocuments, createHubDocument, updateHubDocument, deleteHubDocument } from '../../lib/appwrite';
import Spinner from '../Spinner';

const DocumentHub = () => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchDocs = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedDocs = await getDocuments();
      setDocs(fetchedDocs);
    } catch (error) {
      console.error("failed to fetch documents", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const handleSelectDoc = (doc) => {
    setSelectedDoc(doc);
    setIsCreating(false);
  };
  
  const handleNewDoc = () => {
    setSelectedDoc({ title: '', category: '', content: '' });
    setIsCreating(true);
  };
  
  const handleSave = async (formData) => {
    try {
      if (isCreating) {
        await createHubDocument(formData);
      } else {
        await updateHubDocument(selectedDoc.$id, formData);
      }
      fetchDocs(); // refetch all docs
      setSelectedDoc(null);
      setIsCreating(false);
    } catch (error) {
      alert("error: could not save document.");
    }
  };
  
  const handleDelete = async (docId) => {
    if (window.confirm("are you sure you want to delete this document?")) {
      try {
        await deleteHubDocument(docId);
        fetchDocs(); // refetch
        setSelectedDoc(null);
        setIsCreating(false);
      } catch (error) {
        alert("error: could not delete document.");
      }
    }
  };

  if (isLoading) {
    return <div className="flex-center" style={{ minHeight: '50vh' }}><Spinner /></div>;
  }
  
  return (
    <div className="document-hub-layout">
      <div className="doc-list-sidebar">
        <button className="btn btn-primary" onClick={handleNewDoc} style={{ width: '100%', marginBottom: '1rem' }}>
          + New Document
        </button>
        {docs.map(doc => (
          <div 
            key={doc.$id} 
            className={`doc-list-item ${selectedDoc?.$id === doc.$id ? 'active' : ''}`}
            onClick={() => handleSelectDoc(doc)}
          >
            <span className="doc-list-title">{doc.title}</span>
            <span className="doc-list-category">{doc.category}</span>
          </div>
        ))}
      </div>
      <div className="doc-editor-main">
        {selectedDoc ? (
          <DocumentEditor 
            key={selectedDoc.$id} 
            doc={selectedDoc}
            onSave={handleSave}
            onDelete={handleDelete}
            onCancel={() => setSelectedDoc(null)}
            isCreating={isCreating}
          />
        ) : (
          <div className="flex-center" style={{height: '100%'}}>
            <p>Select a document to edit or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// editor form as a sub-component
const DocumentEditor = ({ doc, onSave, onDelete, onCancel, isCreating }) => {
  const [formData, setFormData] = useState(doc);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="doc-editor-form">
      <input 
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Document Title"
        required
      />
      <input 
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        placeholder="Category (e.g., LinkedIn, Resume)"
        required
      />
      <textarea 
        name="content"
        value={formData.content}
        onChange={handleInputChange}
        placeholder="Start writing your content here..."
        required
      />
      <div className="doc-editor-actions">
        <div>
          {!isCreating && (
            <button type="button" className="btn btn-secondary" style={{borderColor: '#aa8db9', color: '#aa8db9'}} onClick={() => onDelete(doc.$id)}>
              Delete
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isCreating ? 'Create Document' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default DocumentHub;