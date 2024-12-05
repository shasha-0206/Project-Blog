//Logic for database initialisation
import mongoose from 'mongoose';
import initData from './data.js';
import Post from '../Models/Post.js';
import dotenv from 'dotenv';
dotenv.config();
const db_url= process.env.DB_URL ;

if (!db_url) {
  console.error('DB_URL is not defined. Please check your .env file.');
  process.exit(1); // Exit the process if DB_URL is undefined
}
main()
.then(()=>{
    console.log("connected to DB.");
})
.catch(err => console.log(err));



async function main() {
  await mongoose.connect(db_url);
}

const initDB=async ()=>{
   await  Post.deleteMany({});
   initData.data=initData.data.map((obj)=>({...obj,user:'6740cc4cee813463eadb5a13'}));//,owner: "67065d02176bb304f79adba5"
   await Post.insertMany(initData.data);
   console.log("data was initialised.");
};
initDB();