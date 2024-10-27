import 'dotenv/config'
import { log } from 'console'
import {Router} from 'express'
import client from '../datebase.js'

const table = process.env.TABLE_NAME

const router = Router()

router.use((req,res,next) => {
  log(client.database)
  client.query(`CREATE TABLE IF NOT EXISTS ${table} (id SERIAL PRIMARY KEY, array_row INTEGER[], array_sort INTEGER[]);`, (err, result) => {
      err && log(err)
      log('table created or update')
      next()
  })
})

router.get('/Array', (req, res) => {
  client.query(`SELECT * FROM ${table}`, (err, result) => {
    err && log(err)
    log(result.rows)
    res.send(result.rows)
  })
})
router.post('/Array/Delete/:id', (req, res) => {
    const {id} = req.params
    client.query(`DELETE FROM ${table} WHERE id = ${id}`, (err, result) => {
      err && log(err)
        log(result)
          res.send('Отправлено')
    })
})
router.get('/Array/:id', (req, res) => {
  const {id} = req.params
  client.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, result) => {
    err && log(err)
    log(result.rows[0])
    res.send(result.rows[0])
  })
})
router.post('/Array', (req, res) => {
  log(req.body)
    const {array, arraySort} = req.body
    log(array, arraySort)
    client.query(`INSERT INTO ${table} (array_row, array_sort) VALUES ($1, $2)`, [array, arraySort], (err, result) => {
        err && log(err)
        log(result)
        res.send('Отправлено')
    })
})

export default router