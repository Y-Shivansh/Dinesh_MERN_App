import bcrypt from 'bcrypt';
import Admin from './models/Admin.js';

const seedAdmin = async () => {
    try {
        const password = "admin123";
        const hashedPassword = await bcrypt.hash(password, 10);
        const adminCredentials = {
            name: "admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: 'admin'
        }
        const existingAdmin = await Admin.findOne({ email: adminCredentials.email });
        if (existingAdmin) {
            
            return;
        }
    
        // Creating Admin
        const admin = new Admin(adminCredentials);

        // Save to the database
        await admin.save();
        
    } catch (err) {
        console.error('Error seeding admin:', err.message);
    }
};

export default seedAdmin;
