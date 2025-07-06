# 🖋️ Digital Document Signature App

A full-stack MERN (MongoDB, Express, React, Node.js) web application to securely upload, preview, and digitally sign PDF documents. Built with user-role based access control for Admin and User. Inspired by DocuSign-like functionality.

---

## 🔧 Tech Stack

* **Frontend**: React, Tailwind CSS, Framer Motion, Axios, React Toastify
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (with Mongoose)
* **PDF Handling**: `pdf-lib`
* **File Upload**: `multer`
* **Authentication**: JWT

---

## 👤 Roles

### 👨‍💼 Admin:

* Upload PDFs
* View all documents
* Sign documents with signature image and timestamp
* Download signed PDFs

### 🙍‍♂️ User:

* Upload and view only their own documents
* Cannot sign documents

---

## ✨ Features

* 🔐 **Register/Login** with role-based access
* 🗃️ **Dashboard** with document filters (All, Signed, Unsigned)
* 📤 **Upload** PDF files (Multer + FormData)
* 🖊️ **Sign PDF** (Only Admin): adds signature image + text
* 📥 **Download** signed PDF
* 🎨 **Modern UI**: Animated with Framer Motion
* ✅ **Success Toasts** & Loaders
* 🔎 Inline **PDF Preview** using `<iframe>`

---

## 📁 Folder Structure

```
server/
├── models/          # Mongoose models (User, Document)
├── middlewares/     # Auth, Role Check, Upload config
├── routes/          # Auth and Docs APIs
├── uploads/         # Uploaded and signed PDF storage
├── assets/          # Signature image (signature.jpg)
└── index.js         # Entry point

client/
├── src/pages/       # React pages: Login, Register, Upload, Dashboard
├── src/services/    # API logic (axios)
└── App.jsx, index.js
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HRISHIK123958/signature-app.git
cd signature-app
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Install client dependencies

```bash
cd ../client
npm install
```

### 4. Create `.env` in `/server`

```
MONGO_URI=your_mongo_db_url
JWT_SECRET=your_secret_key
```

### 5. Start the app

```bash
# Start backend
cd server
node index.js

# Start frontend (in new terminal)
cd client
npm start
```

---

## 📸 Screenshots

* 📋 Register/Login Page
* 📄 Document Upload Form
* 📑 Admin Dashboard with PDF Preview
* ✅ Signed Status and Download Link

---

## 📌 Future Enhancements

* 🖊️ Drag-and-drop signature placement
* ☁️ Cloud storage (e.g. AWS S3, Firebase)
* 📩 Email notifications on signature
* 🧾 Version history & audit trail

---

## 📃 License

This project is licensed under the MIT License.

---

> Designed & Developed by [Hrishik Dey](https://github.com/HRISHIK123958)
