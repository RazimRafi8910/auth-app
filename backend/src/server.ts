import app from "./app.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 3001;

const startServer = async()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        // connect mongodb database
        connectDB();
    });
}

startServer()