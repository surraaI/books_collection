const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const existingUser = await userModel.getByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({ email, password: hashedPassword, role: role || 'User' });
        res.status(201).json({ success: true, message: 'User registered successfully', data: newUser });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const user = await userModel.getByEmail(email);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'dfafjaiqepfjpoadjsfjap',
            { expiresIn: '1h' } 
        );

        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

const logout = (req, res) => {
    res.status(200).json({ success: true, message: 'User logged out successfully' });
};

const create_admin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const existingUser = await userModel.getByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({ email, password: hashedPassword, role: 'admin' });
        res.status(201).json({ success: true, message: 'Admin registered successfully', data: newUser });
    } catch (error) {
        console.error('Error during admin registration:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

const assign_admin = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const user = await userModel.getByEmail(email);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const updatedUser = await userModel.update(user.id, { role: 'admin' });
        res.status(200).json({ success: true, message: 'User assigned as admin successfully', data: updatedUser });
    } catch (error) {
        console.error('Error during admin assignment:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

module.exports = {
    signup,
    login,
    logout,
    create_admin,
    assign_admin,
};
