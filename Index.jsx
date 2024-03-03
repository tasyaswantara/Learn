const express = require('express')
const app = express()
const port = 3000
const bodyParser=require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())
app.get('/',(req,res) => {
  response(200, "API v1 ready to go","SUCCESS",res)
})

app.get('/mahasiswa',(req,res) => {
  const sql = "select * from mahasiswa"
  db.query(sql,(error,result)=>{
    if (error) throw error
    response(200,result,"SUCCESS",res)
  })
  
})

app.get('/mahasiswa/:id',(req,res) => {
  const id = req.params.id
  const sql= `select * from mahasiswa where nim=${id}`
  db.query(sql,(error,result)=>{
    if (error) throw error
    response(200,result,"get detail mahasiswa",res)
  })
  
})

app.post('/mahasiswa',(req,res) => {
  const {nim, nama_lengkap, kelas, alamat} = req.body
  const sql = `insert into mahasiswa (nim,nama_lengkap,kelas,alamat) values(${nim},'${nama_lengkap}','${kelas}','${alamat}')`
  db.query(sql,(error,result)=>{
    if(error) response(500,"invalid","error",res)
    if (result?.affectedRows) {
      const data ={
        isSuccess: result.affectedRows,
        id: result.insertId
      }
      response(200,data,"Data added successfuly",res)
    }
  
  })
  
})
app.put('/mahasiswa',(req,res) => {
  const {nim,nama_lengkap,kelas,alamat} =req.body
  const sql =`update mahasiswa set nama_lengkap = '${nama_lengkap}', kelas='${kelas}',alamat='${alamat}' where nim = ${nim}`
  db.query(sql,(error,result)=>{
    if(error) response(500,"invalid","error",res)
    if (result?.affectedRows) {
      const data ={
        isSuccess: result.affectedRows,
        message: result.message
      }
      response(200,data,"UPDATE SUCCESSFULY",res)
    }else{
      response(404,"mohon maaf takde","error",res)
    }
   

  })
 
})
app.delete('/mahasiswa',(req,res) => {
  const {nim}=req.body
  const sql =`delete from mahasiswa where nim = ${nim}`
  db.query(sql,(error,result)=>{
    if(error) response(500,"invalid","error",res)
    if(result?.affectedRows){
      const data ={
        isDeleted: result.affectedRows,
      }
      response(200,data,"DELETED SUCCESSFULY",res)
    }else{
      response(404,"NIM NOT FOUND!","NOTFOUND",res)
    }
   
  })
  
})

app.get('/hello', (req, res) => {
  console.log({urlParam: req.query})
  db.query("select * from mahasiswa",(error,result)=>{
    response(200,result,"get all data from mahasiswa",res)
  })

})


app.get('/find',(req,res)=>{
  console.log('Find:', req.query)
  const sql= `select * from mahasiswa where nim = ${req.query.nim}`
  db.query(sql,(error,result)=>{
    response(200,result,"Berhasil ditemukan",res)
  })
})

app.post('/login', (req, res) => {
  console.log({requestFromOutside: req.body})
    res.send('login berhasil')
})
app.put('/username',(req,res)=>{
  console.log({updsteData: req.body})
res.send('update berhasil')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})