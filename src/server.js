require('dotenv').config();

const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try{
    const connection = await db.getConnection();

    console.log('DateDash mysql db connected');

    connection.release();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
  }
  catch(e){
    console.log('Database connection error', e);
  }
}

startServer();