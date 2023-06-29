import { config } from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';

var auth = express.Router();

function generateAccessToken(user) {
    return jwt.sign(user, 'privateKeyAlex', { expiresIn: '1800s' });
}

auth.post('/login', (req, res) => {
    if (req.body.email !== 'admin@gmail.com') {
        res.status(401).json({error: 'invalid credentials'});
        return ;
    }

    if (req.body.password !== 'password') {
        res.status(401).json({error: 'invalid credentials'});
        return ;
    }

    const accessToken = generateAccessToken(req.body);
    res.status(200).json({token: accessToken})

});

export {auth};