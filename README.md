# 🛍️ FashionVibe - E-commerce Web Application

**FashionVibe** is a fully responsive monolithic e-commerce web application built using modern technologies. It supports two roles: **User** and **Admin**, each with distinct functionalities. The application is secured using **JWT** and **Spring Security**, and features a dynamic frontend using **Angular**, **Angular Material**, and **Bootstrap**.


---


## 🔧 Features

- ✅ User Registration & Login (JWT-based)
- ✅ Admin Panel
- ✅ Forgot Password & Reset Password via Email
- ✅ Responsive UI with Angular Material
- ✅ Secure APIs with Spring Security
- ✅ MySQL Database Integration


### 🛠️ Admin
- Log in with pre-saved credentials (stored in DB)
- Add, update, and delete products
- Update user order statuses
- Logout

---


## 🚀 Tech Stack

- **Frontend**: Angular, Angular Material, Bootstrap
- **Backend**: Java Spring Boot, Spring Security, JWT
- **Database**: MySQL
- **Tools**: Git, Postman, GitHub


## 🔐 Admin Credentials

> These credentials are encrypted in the database and used only for demo/testing purposes.

- **Email**: `Admin@FashionVibe.com`
- **Password**: `FashionVibeAdmin`



---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js and Angular CLI
- Java JDK 17+
- MySQL Server
- Maven


### 🗃️ Database Setup

1. Make sure MySQL is running.
2. Create a database named `FashionVibe`:
   ```sql
   CREATE DATABASE FashionVibe;
3. Update your DB credentials in application.properties.
4. Run the Spring Boot app — tables will be auto-generated.

### Backend Setup (Spring Boot)
1. Clone the repository and navigate to the backend folder:
   ```bash
   cd Backend/fashionvibe
   ```

2. Run the main class to generate the JWT Secret Key (code is written in the main class).
3. Copy the generated secret key and paste it into application.properties:
    jwt.secret=PASTE_YOUR_SECRET_KEY_HERE


4. After saving the key, comment out the secret key generation code in the main class to avoid regenerating it  every time.

5. Run the Spring Boot application:
    mvn spring-boot:run



Frontend Setup (Angular)
1. Navigate to the frontend folder: cd Frontend/fashion-vibe


2. Install dependencies: npm install

3. Run the Angular app: ng serve --o

## 📌 Notes
- Make sure MySQL is running and the database is created.
- Update DB credentials in `application.properties`.
- Use Postman or frontend UI to test login/signup APIs.
- The app is fully responsive and works across devices.

👩‍💻 Author
**Zainab Ansari**  
Full Stack Developer

