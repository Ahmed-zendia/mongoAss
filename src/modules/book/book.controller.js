import { Router } from 'express'
import { successResponse } from '../../common/utils/index.js'
import { addBook, addBookImplicit, addManyBook, aggregate1, aggregate2, aggregate3, aggregate4, bookIndexing, deleteBooksBeforeYear, excludeGenres, getBook, getBooksAndFilters, getBooksByYear, getBooksYearInteger, getGeneres, updateBook } from './book.service.js'
const router = Router()

router.post('/books',async (req, res, next) => {
    const data = await addBook(req.body)
    return successResponse({res , message:"BOOk added succes",data , status:201})
})

router.post('/authors',async (req, res, next) => {
    const data = await addBookImplicit(req.body)
    return successResponse({res , message:"author added succes",data , status:201})
})
router.post('/index',async (req, res, next) => {
    const data = await bookIndexing(req.body)
    return successResponse({res , message:"title index succes",data , status:201})
})

router.post('/',async (req, res, next) => {
    const data = await addBook(req.body)
    return successResponse({res , message:"BOOk added succes",data , status:201})
})
router.post('/batch',async (req, res, next) => {
    const data = await addManyBook(req.body)
    return successResponse({res , message:"BOOks added succes",data , status:201})
})
router.patch('/Future',async (req, res, next) => {
    const data = await updateBook(req.body)
    return successResponse({res , message:"BOOks updated succes",data , status:201})
})

router.get('/title',async (req, res, next) => {
    const data = await getBook( req.query)
    return successResponse({res , message:"BOOks geted succes",data , status:200})
})
router.get('/genres',async (req, res, next) => {
    const data = await getGeneres( req.query)
    return successResponse({res , message:"genres geted succes",data , status:200})
})

router.get('/year', async (req, res, next) => {

    const data = await getBooksByYear(req.query)

    return successResponse({
        res, message: "Books geted success", data, status: 200
    })
})

router.get('/skip-limit', async (req, res, next) => {

    const data = await getBooksAndFilters(req.query)

    return successResponse({
        res, message: "Books geted success", data, status: 200
    })
})

router.get('/year-integer', async (req, res, next) => {

    const data = await getBooksYearInteger()

    return successResponse({ res,
        message: "Books with integer year geted success", data,
        status: 200
    })
})


router.get('/exclude-genres', async (req, res, next) => {

    const data = await excludeGenres()

    return successResponse({
        res,
        message: "Books excluded genres geted success",
        data,
        status: 200
    })
})


router.delete('/before-year', async (req, res, next) => {

    const data = await deleteBooksBeforeYear(req.query)

    return successResponse({
        res,
        message: "Books deleted successfully",
        data,
        status: 200
    })
})


router.get('/aggregate1', async (req, res, next) => {

    const data = await aggregate1()

    return successResponse({
        res,
        message: "Books aggregated successfully",
        data,
        status: 200
    })
})

router.get('/aggregate2', async (req, res, next) => {

    const data = await aggregate2()

    return successResponse({
        res,
        message: "Books aggregated successfully",
        data,
        status: 200
    })
})

router.get('/aggregate3', async (req, res, next) => {

    const data = await aggregate3()

    return successResponse({
        res,
        message: "Genres unwind successfully",
        data,
        status: 200
    })
})

router.get('/aggregate4', async (req, res, next) => {

    const data = await aggregate4()

    return successResponse({
        res,
        message: "Books and logs joined successfully",
        data,
        status: 200
    })
})


export default router 