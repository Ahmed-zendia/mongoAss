import { Int32 } from "mongodb"
import { db } from "../connection.db.js"

export const bookModel = db.createCollection('books', {
     validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["title"],
                properties: {
                    title: { 
                        bsonType: "string",
                        minLength: 1
                    }
                }
            } 
    }
})