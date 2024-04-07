import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Layout from './routes/Layout';
import DetailView from './routes/DetailView';


const root = document.getElementById('root');
if (!root._reactRootContainer) {
  root._reactRootContainer = createRoot(root);
}
root._reactRootContainer.render(
  <React.StrictMode>
    <Router>
    <Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="detail/:id" element={<DetailView />} />
  </Route>
</Routes>
    </Router>
  </React.StrictMode>
);

