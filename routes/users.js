import express from "express";
import { v4 as uuid } from 'uuid';
import fs from 'fs';  
import path from 'path'; 
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();
const usersFilePath = path.join(__dirname, '../data/users.json'); 

// Function to read users from the JSON file
const readUsersFromFile = () => {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
};

// Function to write users to the JSON file
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

let users = readUsersFromFile();


router.post('/', (req, res) => {
    const user = req.body;
    const newUser = { ...user, id: uuid() };
    users.push(newUser);
    writeUsersToFile(users);  
    res.send(`${user.firstName} has been added!`);
});


router.get('/', (req, res) => {
    res.send(users);
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);
    res.send(foundUser);
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) {
        return res.status(404).send('User not found');
    }
    users = users.filter((user) => user.id !== id);
    writeUsersToFile(users); 
    res.send(`${foundUser.firstName} has been removed!`);
});


router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) {
        return res.status(404).send('User not found');
    }
    if (firstName) {
        foundUser.firstName = firstName;
    }
    if (lastName) {
        foundUser.lastName = lastName;
    }
    if (email) {
        foundUser.email = email;
    }
    writeUsersToFile(users);  
    res.send(`User ${id} has been updated!`);
});

export default router;
