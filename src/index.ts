// index is the entry point of your application. 
//it connects to the database, it starts the HTTP server  

import "dotenv/config";


import { connectDB } from "./configuration/database.js"
import app from "./app.js"

connectDB()

const PORT = 5000
 app.listen (PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
 });