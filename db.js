import mongoose from 'mongoose';
import 'dotenv/config';
const Database = () => {
  try {

    console.log("DB_URI", process.env.DB_URI)

   return mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    
  } catch (error) {
    console.log('There is some error connecting to database', error);
  }
};

export default Database;
