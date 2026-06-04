const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign(
        {id: userId},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );
}

exports.register = async (req, res) => {
    try{
        console.log('Request body:', req.body);
        const { first_name, last_name, email, password} = req.body || {};
        
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                message: 'Missing required fields: first_name, last_name, email, password'
            });
        }
        const existingUser = await prisma.users.findUnique({
            where: { email }
        });

        if(existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.users.create({
            data: {
                first_name, last_name, email, password: hashedPassword, status: 'not_verified'
            }
        });

        const token = generateToken(user.id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                status: user.status
            
            }
        });
    }
    catch(e){
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
}

exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await prisma.users.findUnique({
            where: { email }
        });

        if(!user) {
            return res.status(400).json({
                message: 'Invalid email'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }
        const token = generateToken(user.id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                status: user.status
            }
        });
    }
    catch(e){
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
}