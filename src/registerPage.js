import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

app.post('/register', (req, res) => {
    const { username, password, phonenumber } = req.body;

    if (!username || !password || !phonenumber) {
        return res.status(400).json({ message: 'Username, password, tel-number not entered' });
    }

    let users = [];
    const usersFile = 'users.json';

    if (fs.existsSync(usersFile)) {
        const data = fs.readFileSync(usersFile, 'utf-8');
        users = JSON.parse(data);
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = { username, password, phonenumber };
    users.push(newUser);

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User registered successfully' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
