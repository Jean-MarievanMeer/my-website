import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import MyWebsite from './MyWebsite';
import App from '../../ReactPractise/Nonogram/src/App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/my-website">
      <MyWebsite />
    </BrowserRouter>
  </StrictMode>
);
