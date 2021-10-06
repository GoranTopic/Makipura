import server from './server.js';
import dotenv from 'dotenv';

// run dot env to get enviroment variables
dotenv.config();
const PORT = process.env.PORT;

server.listen(PORT, console.log('server is running on port: ' + PORT));
