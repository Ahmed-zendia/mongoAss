import { MongoClient } from "mongodb";
import { DB_NAME, DB_URI } from "../config.js";
const client = new MongoClient(DB_URI, {
    serverSelectionTimeoutMS:5000
})


// to test connection 
export const bootsrapDB = async (app,port) => {
    try {
        await client.connect()
        console.log(`db connected succesfully ✅`);
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    } catch (error) {
        console.log('fail to connect on db ✖️');
        console.log(error);
        
    }
}

export const db = client.db(DB_NAME)