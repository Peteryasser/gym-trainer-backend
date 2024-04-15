import { FindOneOptions, MoreThan } from "typeorm";
import { User } from "../entity/User";
import { ConnectionManager } from "src/config/connection_manager";

export class UserDB {
    async addUser(email: string, name: string, password: string) {
        try {
            const connection = await ConnectionManager.getConnection();
            const user = new User();
            user.email = email;
            user.name = name;
            user.password = password;
            
            try {
                await connection.manager.save(user);
            } catch (e) {
                console.log(e);
            }

            return user.id;
        } catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
                return -1;
            } else {
                throw new Error("Failed to add new user: " + error.message);
            }
        }
    }

    /**
     * The function `getUserByName` retrieves a user from the database based on their username.
     * @param {string} username - The `username` parameter is a string that represents the name of the
     * user you want to retrieve from the database.
     * @returns a Promise that resolves to a User object.
     */
    async getUserByName(username: string) {
        try {
            const connection = await ConnectionManager.getConnection();
            const options: FindOneOptions<User> = {
                where: { name: username },
            };
            let user;
            try {
                user = await connection.manager.findOne(User, options);
            } catch (e) {
                console.log(e);
            }

            return user;
        } catch (error) {
            throw new Error("Failed to get user by name: " + error.message);
        }
    }

    /**
     * The function `getUserByEmail` retrieves a user from the database based on their email.
     * @param {string} email - The `email` parameter is a string that represents the email of the
     * user you want to retrieve from the database.
     * @returns a Promise that resolves to a User object.
     */
    async getUserByEmail(email: string) {
        try {
            const connection = await ConnectionManager.getConnection();
            const options: FindOneOptions<User> = {
                where: { email: email },
            };
            let user;
            try {
                user = await connection.manager.findOne(User, options);
            } catch (e) {
                console.log(e);
            }

            return user;
        } catch (error) {
            throw new Error("Failed to get user by email: " + error.message);
        }
    }

    /**
     * The function retrieves a user from the database based on their ID.
     * @param {number} id - The `id` parameter is the unique identifier of the user you want to retrieve
     * from the database. It is of type `number`.
     * @returns The `getUserById` function returns a `Promise` that resolves to a `User` object.
     */
    async getUserById(id: number) {
        try {
            const connection = await ConnectionManager.getConnection();
            const options: FindOneOptions<User> = {
                where: { id: id },
            };
            const user = await connection.manager.findOne(User, options);
            return user;
        } catch (error) {
            throw new Error("Failed to get user by ID: " + error.message);
        }
    }

    async getPasswordById(id: number) {
        try {
            const connection = await ConnectionManager.getConnection();
            const options: FindOneOptions<User> = {
                select: ['password'], // Specify only the fields you want to select, in this case, just the password
                where: { id: id },
            };
            const user = await connection.manager.findOne(User, options);
            return user ? user.password : null; // return the password if user is found, otherwise return null
        } catch (error) {
            throw new Error("Failed to get user by ID: " + error.message);
        }
    }

    async setotp(otp, otpExpire, email) {
        try {
            const connection = await ConnectionManager.getConnection();
            const userRepository = connection.getRepository(User);
            const updateFields: { otp: any; otpExpiration?: any } = { otp: otp };

            // Include otpExpiration only if it's provided
            if (otpExpire) {
                updateFields.otpExpiration = otpExpire;
            }
            await userRepository
            .createQueryBuilder()
            .update(User)
            .set(updateFields)
            .where("email = :email", { email })
            .execute();
            return "Success";
        } catch (error) {
            console.error("Error updating OTP:", error.message); // Log the actual error message
            return "Failed to update OTP"; // Return a generic error message
        }
    }
    

    async checkotp(otp){
        try {
            const connection = await ConnectionManager.getConnection();
            const userRepository = connection.getRepository(User);
    
            // Check if there's a user with the given OTP and if the OTP hasn't expired
            const user = await userRepository.findOne({
                where: {
                    otp: otp,
                    otpExpiration: MoreThan(new Date()) // MoreThan is imported from 'typeorm'
                }
            });
    
            return user;
    
        } catch (err) {
            console.error(err);
            return "Error during check otp.";
        }
    }
    async changepassword(user_id, password, confirmPassword){
        try {
            const connection = await ConnectionManager.getConnection();
            const userRepository = connection.getRepository(User);
            await userRepository.update(user_id, {
                password: password, // Consider hashing the password before saving it
                otp: null,
                otpExpiration: null
            });
            return 'Password change successful';
        } catch (err) {
            console.error(err);
            return "Error during password change.";
        }
    }
}