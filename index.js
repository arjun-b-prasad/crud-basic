import express from "express";
import userRoutes from './routes/users.js'

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/users', userRoutes);
app.get('/', (req, res) => {
    console.log("[GET ADDR]");
    res.send("<h1>Hello from Home Page</h1>");
})

app.listen(PORT, () => {
    console.log(`The server is running on port:${PORT}`);
})