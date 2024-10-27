import { log } from 'console'
import express from 'express'
import router from './routes/sort.routes.js'
import {} from 'pg'

const app = express()
const port = 3000

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use('/api', router)

app.listen(port, () => log(`Example app listening on port ${port}!`))
