import { db } from "../../DB/connection.db.js"
import { logModel } from "../../DB/models/log.model.js"


export const cappedLogs = async (inputs) => {
    const data = await db.createCollection( "logs", { capped: true, size: 100000 } )
    return {mesage:"log is capped successfuly"}
}

export const addLog = async (inputs) => {
    const data = await logModel.insertOne(inputs)
    return data
}

