const express = require ('express')
const cors = require('cors')
const routes = require ('./routes/public')

require('dotenv').config()
const app = express ()
app.use(cors())
//const port = 3000
app.use (express.urlencoded({extended:true}))
app.use (express.json())
app.use ('/', routes)

app.listen (process.env.PORT, ()=>{
    console.log (`Servidor Rodando na porta ${process.env.PORT}`)
})
