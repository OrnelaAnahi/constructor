const { Console } = require('console')

const fs = require('fs')

const express = require('express')

const app = express()

const PORT = process.env.PORT || 8080


function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

class Contenedor{
  constructor(name){
    this.name = name
  }

  async getData(){
    const data = await fs.promises.readFile(`./${this.name}`,'utf-8',function (err,data){
      if(err)throw err
      const json = JSON.parse(data)
      return json
    })
    return JSON.parse(data)
  }
  async save(obj){
    const file = await this.getData()
    const id = file.length + 1
    obj.id = id
    file.push(obj)
    fs.writeFile(`./${this.name}`, JSON.stringify(file), function(err){
      if (err)throw err
    })
    console.log(id)
  }
  
  async getAll(){
    const products = await this.getData()
    return (products)
  }
  async deleteById(deleteId){
    const file = await this.getData()
    const itemElim = file.filter((elemento) => elemento.id !== deleteId)
    const resto = itemElim.map(ele=>{
      if(ele.id>deleteId){
        ele.id = ele.id - 1
      }
      return ele
    })
      fs.writeFile(`./${this.name}`, JSON.stringify(resto), 'utf-8',(err)=>{
          if(err) throw err
          console.log('element '+ deleteId + ' delete')
        })
  }
    
  deleteAll(){
    fs.writeFile(`./${this.name}`, JSON.stringify([]), 'utf-8',(err)=>{
      if(err){
        console.error('Error en la escritura de '+ this.name)
      }
      else{
        console.log('Archivo con array vacio')
      }
    })
  }
}


let file1 = new Contenedor('text.json')
// file1.getAll()
// file1.deleteById(2)
// file1.deleteAll()

app.listen(PORT, ()=>{
  console.log('server run on port 8080')
})
app.get('/', (req,res)=>{
  res.send('Pagina de inicio')
})

const productos = async()=>{
  const TLProd = await file1.getAll()
  app.get('/productos', (req,res)=>{
    res.send(TLProd)
  })
}
productos()
const productosRandom = async ()=>{
  const TLProd = await file1.getAll()
  const mayor = TLProd.length
  app.get('/productosRandom', (req, res)=>{
    numeroRandom = getRandomInt(1, mayor)
    let bsqDeNR = TLProd.find(product => product.id == numeroRandom)
    res.send(bsqDeNR)
  })
}
productosRandom()
