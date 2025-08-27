# **Food Waste Reduction App**

## **Overview**

The **Food Waste Reduction App** is designed to reduce food wastage by connecting people, businesses, and charities with food donations. This app allows users to post available food items and manage food requests. It aims to streamline the process of donating excess food to those in need, minimizing food waste and maximizing the utility of surplus resources.

### **Features**
- **User Authentication**: Register, log in, and reset passwords with role-based access (individual, business, charity).
- **Profile Management**: Edit user profiles and upload profile pictures.
- **Food Listings**: Create, edit, and delete food listings with descriptions, categories, and expiration dates.
- **Donation Requests**: Request food items through the app.
- **Search Functionality**: Search available food listings by category, location, or keyword.
- **Admin Panel**: Admins can moderate listings, manage users, and view app statistics.
- **Mobile Responsiveness**: Fully responsive design for a seamless experience on any device.

---

## **Tech Stack**

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Cloud Storage**: Cloudinary (for profile pictures and food listing images)
- **APIs**: Custom API endpoints for managing users, food listings, and donations.

---

## **Getting Started**

### **Prerequisites**

To run the project locally, you'll need:

- Node.js
- MongoDB
- Cloudinary API keys (for image uploading)

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-link.git
2. Navigate to the project directory:
   ```bash
   cd food-waste-reduction-app
3. Install Dependencies:
   ```bash
   npm install
4. Create a .env file in the root directory and add the necessary environment variables for your app. Example:
   ```bash
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   MONGO_URI=your-mongo-uri
   JWT_SECRET=your-jwt-secret
5. Start the development server:
   ```bash
   npm run dev
 - Your app should now be running on http://localhost:3000.

## Usage

1. **Create a new user**:  
   Sign up as an individual, business, or charity.

2. **Create a food listing**:  
   Post a food listing with details such as title, description, category, expiration date, and photos.

3. **Search for food**:  
   Browse available food listings based on categories and location.

4. **Admin Panel**:  
   Access the admin panel to moderate listings and manage users.

## License
This project is licensed under the **Proprietary License**, which means all rights to the project are reserved by the authors.  
You may not use, modify, or distribute this project without explicit permission from the authors.

Copyright © 2024 by Team SARD:
- Shivansh Sharma
- Rajat Kumar
- Aryan Singh
- Dhruv Baliyan

See the [LICENSE](LICENSE) file for more details.



## Acknowledgments:
Special thanks to my team for their collaboration:
- Rajat Kumar
- Aryan Singh
- Dhruv Baliyan
- Shivansh Sharma

