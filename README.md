# 🚀 Odd/Even Game (Frontend)

Đây là code frontend cho dự án game Odd/Even (Chẵn/Lẻ) 5x5, được xây dựng bằng React, Vite và Tailwind CSS.

Trò chơi này là một game multiplayer (2 người) real-time. Người chơi có thể tạo phòng hoặc tham gia phòng bằng ID. Cả hai người chơi cùng bấm vào các ô trên bàn cờ 5x5 để tăng giá trị của ô. Người đầu tiên tạo được một hàng (ngang, dọc, hoặc chéo) gồm 5 ô có giá trị đều là số lẻ (ODD) hoặc 5 ô đều là số chẵn (EVEN và khác 0) sẽ chiến thắng.

## 🔗 Link Demo Trực Tiếp

* **Frontend (Game):** `https://odd-even-frontend.vercel.app/`
* **Backend (Server):** `https://odd-even-server.onrender.com`

---

## 📦 Backend Repository (Quan trọng)

Phần backend của dự án này (dùng để xử lý WebSocket, quản lý phòng và logic game) nằm trong một kho lưu trữ riêng.

* **Link tới GitHub Backend:** [https://github.com/thang7112001/odd-even-server]
---

## 🛠️ Công Nghệ Sử Dụng

* **Frontend:** React (Vite), Tailwind CSS
* **Backend:** Node.js, WebSocket (`ws`)
* **Deployment:** Vercel (Frontend), Render (Backend)

---

## 🏃 Hướng Dẫn Chạy Local

Để chạy dự án này local, bạn cần khởi động **cả hai** server (backend và frontend).

### 1. Chạy Backend (Server) 


# 1. Clone kho lưu trữ backend
git clone [https://github.com/thang7112001/odd-even-server.git]
cd odd-even-server

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Khởi động server
node server.js

# Server sẽ chạy tại: ws://localhost:8084 

Trong file Game.jsx line 26 đổi địa chỉ thành ' ws://localhost:8084 ' để chạy local 

### 2. Chạy front-end 

# 1. Clone kho lưu trữ frontend này
git clone [https://github.com/thang7112001/odd-even-frontend.git](https://github.com/thang7112001/odd-even-frontend.git)
cd odd-even-frontend

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Khởi động app
npm run dev

# App sẽ chạy tại: http://localhost:5173