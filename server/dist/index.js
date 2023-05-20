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
app.get('/', (req, res) => {
    // const IP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // console.log(`Request from ip: ${IP}`);
    const headers = [
        'x-client-ip',
        'x-forwarded-for',
        'cf-connecting-ip',
        'fastly-client-ip',
        'true-client-ip',
        'x-real-ip',
        'x-cluster-client-ip',
        'x-forwarded',
        'forwarded-for',
        'forwarded',
    ];
    for (const header of headers) {
        console.log(`${header} ${req.headers[header]}`);
    }
    console.log(req.connection.remoteAddress);
    console.log(req.socket.remoteAddress);
    console.log("\n------------\n");
    res.sendFile(path.join(buildFolderPath, 'index.html'));
});
app.use(express.static(buildFolderPath));
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
