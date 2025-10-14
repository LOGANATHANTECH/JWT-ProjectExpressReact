
import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';


export async function getAdminUser() {
  try {
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
    });
    return adminUser;
  } catch (error) {
    console.error("Error fetching admin user:", error);
    throw new Error(`Failed to retrieve admin user.${error.message}`);
  }
}
export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to retrieve users.");
  }
}

const SALT_ROUNDS = 10;

// function to create a new user
export async function createUser(userData) {
    console.log("YOUR TRYING TO CREATE USER");
    
  try {
    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
    const newUser = await prisma.User.create({
      data: {
        name: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'USER',
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user.");
  }
}

// login user function
export async function loginUser(email, password) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });   
    console.log("=============================user========",user);

    if (!user) {
      throw new Error('No User found with the provided email.');
    }
      console.log("==============================user========",user);

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password.');
    } 
    return user;
  }
  catch (error) {
    console.error("Error during login:", error);
    throw new Error(`Login failed. ${error.message}`);
  }
}

// DELETE /api/users/:id - delete a user by ID
export async function deleteUser(userId) {

  try {
    const deletedUser = await prisma.user.delete({
    where: { id: userId }
  });
  return deletedUser;
  } catch (error) {
      if (error.message.includes('No User found')) {
        throw new Error(`User not found for the provided ID. ${error.message}`);
        
      };
  }
  
  

};




