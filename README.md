# 🚜 Kheti-Gadi

## 📄 KhetiGadi - Modern Equipment Rental for Farmers

KhetiGadi is a **MERN stack marketplace** designed to bridge the gap between tractor owners and farmers.  
It allows owners to list their machinery with real-time availability, while farmers can book equipment based on their specific agricultural needs.

---

## 🚀 Key Features

- 🔐 **Role-Based Authentication**  
  Distinct workflows for Farmers (Renters) and Owners (Providers) using JWT.

- 📅 **Smart Booking Engine**  
  Automated price calculation based on rental duration with a conflict-shield to prevent double bookings.

- 🖼️ **Image Management**  
  Cloudinary integration for high-quality equipment photo uploads via Multer.

- 📦 **Dynamic Inventory**  
  Real-time availability status for tractors, harvesters, and ploughs.

- 🛡️ **Secure API**  
  Protected routes and global error handling for a production-ready experience.

---

## 🛠️ Tech Stack

### 🎨 Frontend
- Yet to develop but will be using ( React.js , Tailwind css )


### ⚙️ Backend
- Node.js
- Express.js

### 🗄️ Database
- MongoDB (Mongoose ODM)

### ☁️ Cloud Storage
- Cloudinary (Image Storage)

### 🔐 Security
- JSON Web Tokens (JWT)
- Bcrypt.js

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/VIVEKAROTE/khetigadi.git
cd khetigadi
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Start the backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Frontend will  run on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

## 🛣️ API Endpoints (Sample)

| Method | Endpoint              | Description              | Access              |
|--------|----------------------|--------------------------|--------------------|
| POST   | /api/auth/register   | Register a new user      | Public             |
| POST   | /api/auth/login      | Login & get JWT Token    | Public             |
| GET    | /api/equipment       | Browse all equipment     | Public             |
| POST   | /api/equipment       | List new machinery       | Private (Owner)    |
| POST   | /api/bookings        | Book a machine           | Private (Farmer)   |

---

## 💡 Future Enhancements

- [ ] Integration of Payment Gateway (Stripe / Razorpay)
- [ ] Real-time Chat between Farmer and Owner
- [ ] Geolocation-based search for nearest equipment
- [ ] Ratings & Review system
- [ ] Owner analytics dashboard

---

## 👨‍💻 Author

**Vivek Arote**  
MERN Stack Developer | Agri-Tech Enthusiast 🚀