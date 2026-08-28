import { Int32 } from "mongodb"
import { db } from "../connection.db.js"

export const logModel = db.collection('logs', {
    validator: [{ $and: { email: { $type: Int32 } , password :{$type:Boolean} } }]
})