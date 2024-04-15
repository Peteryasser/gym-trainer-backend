import {UserDB} from "../DAO/userDB";
import nodemailer = require('nodemailer');
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });



exports.user_add = async (email, name, password) => {
    const userDB = new UserDB();
    const user = await userDB.addUser(email, name, password);
    return user;
};

    

exports.user_forgotPassword = async (email) => {
    try {
        const userDB = new UserDB();
        const otp = Math.floor(1000000 + Math.random() * 9000000);

        const otpExpire = new Date();
        otpExpire.setMinutes(otpExpire.getMinutes() + 5);

        await userDB.setotp(otp, otpExpire, email);

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_KEY}`,
            },
        });

        const mailOptions = {
            from: `${process.env.EMAIL}`,
            to: email,
            subject: 'Password reset OTP',
            text: `Your OTP (It is expired after 5 min) : ${otp}`,
        };

        // Await sendMail operation to ensure proper execution and error handling
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);

        return "Your OTP has been sent to your email.";
    } catch (error) {
        console.error("Error sending email:", error.message);
        return "Error sending OTP"; // Return an error message
    }
}

exports.user_resetPassword = async (otp, password, confirmPassword) => {

    try {
        if (password.localeCompare(confirmPassword) != 0) return "Passwords do not match.";
        const userDB = new UserDB();
        const user = await userDB.checkotp(otp);
        if (!user) return "OTP is invalid or has expired.";
        return await userDB.changepassword(user.id, password, confirmPassword);
        
    }
    catch (err) {
        return "Error";
    }
}

exports.user_changePassword = async (id, oldPassword, password, confirmPassword) => {

    try {
        const userDB = new UserDB();
        const hispassword = await userDB.getPasswordById(id);
        if (hispassword.localeCompare(oldPassword) != 0) return "Password not correct.";
        if (password.localeCompare(confirmPassword) != 0) return "Passwords do not match.";
        return await userDB.changepassword(id, password, confirmPassword);
    }
    catch (err) {
        return "Error";
    }
}
