import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// react-router-dom: một thư viện phổ biến được sử 
// dụng trong các ứng dụng React để quản lý điều 
// hướng (routing) và chuyển trang.
import { BrowserRouter } from 'react-router-dom'
// BrowserRouter là một trong những thành phần cốt 
// lõi của react-router-dom. Nó sử dụng lịch sử HTML5 
// để điều khiển điều hướng của ứng dụng, làm cho URL 
// của ứng dụng có thể quản lý và tương thích với các 
// hành động của trình duyệt như nút "quay lại" và "tiến tới"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
