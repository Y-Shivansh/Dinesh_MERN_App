import app from './app.js';
import dotenv from 'dotenv';
// dotenv.config({path:})
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`);
    
});