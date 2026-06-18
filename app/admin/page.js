'use client';

import { useState, useEffect } from 'react';
import './admin.css';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);

  const [activeTab, setActiveTab] = useState('artworks'); // 'artworks' | 'articles'
  const [editingId, setEditingId] = useState(null);

  const [artworks, setArtworks] = useState([]);
  const [articles, setArticles] = useState([]);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (auth) {
      fetchData();
    }
  }, [auth]);

  const fetchData = async () => {
    const artRes = await fetch('/api/artworks');
    const artData = await artRes.json();
    setArtworks(artData);

    const articleRes = await fetch('/api/articles');
    const articleData = await articleRes.json();
    setArticles(articleData);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setAuth(true);
    } else {
      alert('Incorrect password');
    }
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setFile(null);
    const fileInput = document.getElementById('fileUpload');
    if (fileInput) fileInput.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setFormData({});
    setEditingId(null);
    setFile(null);
    const fileInput = document.getElementById('fileUpload');
    if (fileInput) fileInput.value = '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = activeTab === 'artworks' ? '/api/artworks' : '/api/articles';

    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });

    if (file) {
      submitData.append('imageFile', file);
    }

    const res = await fetch(endpoint, {
      method: editingId ? 'PUT' : 'POST',
      body: submitData
    });

    if (res.ok) {
      handleCancelEdit();
      fetchData();
      alert(editingId ? 'Updated successfully!' : 'Added successfully!');
    } else {
      alert('Failed to save item');
    }
  };

  const handleDelete = async (id, type) => {
    if (!confirm('Are you sure you want to delete this?')) return;

    const endpoint = type === 'artworks' ? '/api/artworks' : '/api/articles';
    const res = await fetch(`${endpoint}?id=${id}`, { method: 'DELETE' });

    if (res.ok) {
      fetchData();
    }
  };

  if (!auth) {
    return (
      <div className="admin-login">
        <form onSubmit={handleLogin} className="admin-card">
          <h2>Admin Login</h2>
          <p>Please enter the admin password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="admin-input"
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Kasyif Gallery Admin</h1>
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'artworks' ? 'active' : ''}`}
            onClick={() => { setActiveTab('artworks'); handleCancelEdit(); }}
          >
            Manage Artworks
          </button>
          <button
            className={`admin-tab ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => { setActiveTab('articles'); handleCancelEdit(); }}
          >
            Manage Articles
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-form-col admin-card">
          <h2>{editingId ? 'Edit' : 'Add New'} {activeTab === 'artworks' ? 'Artwork' : 'Article'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            {activeTab === 'artworks' ? (
              <>
                <input name="title" placeholder="Title" value={formData.title || ''} onChange={handleInputChange} required className="admin-input" />
                <input name="artist" placeholder="Artist Name" value={formData.artist || ''} onChange={handleInputChange} required className="admin-input" />
                <input name="class" placeholder="Class Name" value={formData.class || ''} onChange={handleInputChange} required className="admin-input" />
                <select name="category" value={formData.category || ''} onChange={handleInputChange} required className="admin-input">
                  <option value="">Select Category</option>
                  <option value="batik art">Batik Art</option>
                  <option value="Pencil art">Pencil Art</option>
                  <option value="design art">Design Art</option>
                  <option value="abstract art">Abstract Art</option>
                </select>
                <input name="tags" placeholder="Tags (comma separated)" value={formData.tags || ''} onChange={handleInputChange} className="admin-input" />
                <textarea name="desc" placeholder="Description" value={formData.desc || ''} onChange={handleInputChange} required className="admin-input"></textarea>
                <input name="bg" placeholder="Background Color (e.g. #c9b99a)" value={formData.bg || ''} onChange={handleInputChange} className="admin-input" />
                <input name="img" placeholder="Or Image URL (if not uploading)" value={formData.img || ''} onChange={handleInputChange} className="admin-input" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Upload Image:</label>
                  <input id="fileUpload" type="file" accept="image/*" onChange={handleFileChange} className="admin-input" style={{ padding: '0.5rem' }} />
                </div>
              </>
            ) : (
              <>
                <input name="title" placeholder="Title" value={formData.title || ''} onChange={handleInputChange} required className="admin-input" />
                <input name="author" placeholder="Author Name" value={formData.author || ''} onChange={handleInputChange} required className="admin-input" />
                <input name="readTime" placeholder="Read Time (e.g. 5 menit baca)" value={formData.readTime || ''} onChange={handleInputChange} required className="admin-input" />
                <input name="category" placeholder="Category" value={formData.category || ''} onChange={handleInputChange} required className="admin-input" />
                <input name="tags" placeholder="Tags (comma separated)" value={formData.tags || ''} onChange={handleInputChange} className="admin-input" />
                <textarea name="content" placeholder="Content" value={formData.content || ''} onChange={handleInputChange} required className="admin-input"></textarea>
                <input name="bg" placeholder="Background Color/Gradient" value={formData.bg || ''} onChange={handleInputChange} className="admin-input" />
                <input name="img" placeholder="Or Image URL (if not uploading)" value={formData.img || ''} onChange={handleInputChange} className="admin-input" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Upload Image:</label>
                  <input id="fileUpload" type="file" accept="image/*" onChange={handleFileChange} className="admin-input" style={{ padding: '0.5rem' }} />
                </div>
              </>
            )}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                {editingId ? 'Update' : 'Add'} {activeTab === 'artworks' ? 'Artwork' : 'Article'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancelEdit} className="btn btn-ghost">Cancel</button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-list-col admin-card">
          <h2>Existing {activeTab === 'artworks' ? 'Artworks' : 'Articles'}</h2>
          <div className="admin-list">
            {(activeTab === 'artworks' ? artworks : articles).map(item => (
              <div key={item.id} className="admin-list-item">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.artist || item.author}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn btn-ghost"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, activeTab)}
                    className="btn btn-ghost"
                    style={{ color: 'red', borderColor: 'red' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
