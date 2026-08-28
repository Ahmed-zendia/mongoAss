import { db } from "../../DB/connection.db.js"
import { bookModel } from "../../DB/models/book.model.js"
import { logModel } from "../../DB/models/log.model.js"


export const addBook = async (inputs) => {
    const { title } = inputs
        const book = (await bookModel).insertOne(inputs)
    return book
}
export const addBookImplicit = async (inputs) => {
    const data = await db.collection('authors').insertOne({         
  "name": "Author1",
  "nationality": "British"
        })
    return data
}
export const bookIndexing = async (inputs) => {
    const data = await db.collection('books').createIndex('title')
    return data
}

export const addManyBook = async (inputs) => {
        const books = (await bookModel).insertMany(inputs)
    return books
}

export const updateBook = async (inputs) => {
    const updatedbook = (await bookModel).updateOne({ title: "Future" }, { $set: { year: 2022 } })
    if (!updatedbook.matchedCount) {
        throw new Error("check if updated before");
        
    }

    return updatedbook
}
export const getBook = async ( {title}) => {
  
    const getedbook = (await bookModel).find({ title }).toArray()
    return getedbook
}
export const getGeneres = async ( {genres}) => {
  
    const findproerties = (await bookModel).find({ genres }).toArray()
    return findproerties
}

export const getBooksByYear = async ({ from, to }) => {

    const findBooks = (await bookModel).find({
        year: {
            $gte: Number(from),
            $lte: Number(to)
        }
    }).toArray()

    return findBooks
}
export const getBooksAndFilters = async () => {

    const findBooks = (await bookModel).find().skip(2).limit(3).sort({"year":-1}).toArray()

    return findBooks
}

export const getBooksYearInteger = async () => {

    const findBooks = (await bookModel).find({ year: { $type: "int" } }).toArray()

    return findBooks
}

export const excludeGenres = async () => {

    const findBooks = (await bookModel).find({
            genres: {
                $nin: ["Horror", "Science Fiction"]} }).toArray()

    return findBooks
}

export const deleteBooksBeforeYear = async ({ year }) => {

    const deletedBooks = await (await bookModel).deleteMany({ year: {$lt: Number(year) }
    })

    return deletedBooks
}

export const aggregate1 = async () => {

    const books = await (await bookModel).aggregate([
        {  $match: {
                year: { $gt: 2000}   }
        },
        {
            $sort: {
                year: -1
            }
        }
    ]).toArray()

    return books
}


export const aggregate2 = async () => {

    const books = await (await bookModel).aggregate([
        {
            $match: {
                year: {
                    $gt: 2000
                }
            }
        },
        {
            $project: {
                _id: 0,
                title: 1,
                author: 1,
                year: 1
            }
        }
    ]).toArray()

    return books
}


export const aggregate3 = async () => {

    const books = await (await bookModel).aggregate([
        {
            $unwind: "$genres"
        }
    ]).toArray()

    return books
}

export const aggregate4 = async () => {

    const books = await (await logModel).aggregate([
        {
            $lookup: {
                from: "books",
                localField: "book_id",
                foreignField: "_id",
                as: "book_details"
            }
        },
        {
            $unwind: "$book_details"
        },
        {
            $project: {
                _id: 0,
                action: 1,
                book_details: {
                    title: 1,
                    author: 1,
                    year: 1
                }
            }
        }
    ]).toArray()

    return books
}