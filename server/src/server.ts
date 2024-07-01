import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();

app.listen(process.env.port, () => {
    console.log('Server ON');
})