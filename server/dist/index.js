import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import helmet from 'helmet';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildFolderPath = path.join(__dirname, '..', '..', 'dist');
const app = express();
// const PORT = +(process?.env.PORT || 3000);
const PORT = 3000;
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.static(buildFolderPath));
app.get('/', (req, res) => {
    const IP = req.headers['x-real-ip'];
    console.log(`Request from ip: ${IP}`);
    res.sendFile(path.join(buildFolderPath, 'entry.html'));
});
app.use((req, res, next) => {
    // res.status(404);
    // const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    // next(error);
    res.redirect('/');
});
app.use(((err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
    });
}));
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
