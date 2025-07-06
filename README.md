📄 DocuSign Clone – Digital Document Signing App (MERN Stack)
This project is a lightweight DocuSign clone built using the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to upload PDF documents, preview them, and digitally sign using a role-based permission system.

✅ Features
User Authentication (Register/Login with JWT)

Role-Based Access Control

Admin: Can upload, view, and sign documents

User: Can upload and view their own documents

Upload PDF Documents

Live PDF Preview using <iframe>

Sign PDFs using PDF-lib

Adds text and image-based digital signature

Signature Metadata

Stores signer name, timestamp, and file

Download Signed PDFs

Filter Options: View All / Signed / Unsigned

Modern UI with TailwindCSS + Framer Motion

🛠️ Tech Stack
Frontend: React, Tailwind CSS, Framer Motion, Axios

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

PDF Processing: pdf-lib (Draw signature image/text)

Authentication: JWT

File Upload: Multer

Role Check: Custom middleware

📁 Folder Structure
bash
Copy
Edit
signature-app/
├── client/             # React frontend
├── server/             # Node.js + Express backend
│   ├── routes/         # API endpoints
│   ├── models/         # Mongoose models
│   ├── middlewares/    # Auth and role middleware
│   ├── uploads/        # Signed + uploaded PDFs
│   └── assets/         # Signature images
🚀 Getting Started
bash
Copy
Edit
# Clone the repo
git clone https://github.com/yourusername/signature-app

# Backend setup
cd signature-app/server
npm install
touch .env
# Add your MongoDB URI and JWT secret in .env
node index.js

# Frontend setup
cd ../client
npm install
npm start
🌐 Demo Credentials (for testing)
pgsql
Copy
Edit
Admin Email: admin@example.com
Password:    admin123

User Email:  user@example.com
Password:    user123
📸 Screenshots
✅ Login & Register

📁 Dashboard with preview + filters

🖊️ Admin signing interface

📥 Download signed PDFs

📌 Future Enhancements
Drag & drop signature placement

Email notifications

Multi-signer support

Cloud storage (e.g., AWS S3)
