const { Console } = require('console')
const fs = require('fs')

class Contenedor{
  constructor(name){
    this.name = name
  }
  save(obj){
    fs.readFile(`./${this.name}`,{encoding:'utf-8'},(err,data) => {
      if(err){
        obj.id=1
        let array=[obj]
        fs.writeFile(`./${this.name}`, JSON.stringify(array), 'utf-8',(err)=>{
          if(err){
            console.error('Error en la escritura de '+ this.name)
          }
          else{
            console.log('Objeto agregado correctamente desde write')
          }
        })
      }else{
        let array = JSON.parse(data)
        obj.id=array.length + 1;
        array.push(obj)
        fs.writeFile(`./${this.name}`, JSON.stringify(array), 'utf-8', (err)=>{
          if(err){
            console.log('Ocurrio un error al escribir el archivo')
          }
          else{
            console.log('Objeto agregado correctamente')
          }
        })
      }
    })
  }
  async getById(id){
    let getId = await fs.promises.readFile(`./${this.name}`,{encoding:'utf-8'})
    // const arrayProductos = JSON.parse(getId)
    return getId
    // const bsqId = arrayProductos.find(product => product.id === id)
    // if(bsqId===undefined){
    //   return null
    // }
    // else{
    //   return bsqId
    // }
    // .then((data)=>{
    //   try{
    //     console.log(data)
    //   }catch{
    //     console.log('catch más exagerado')
    //   }
    // }).catch((err)=>{
    //   throw err
    // })
    // fs.readFile(`./${this.name}`,{encoding:'utf-8'},(err,data) => {
    //   if(err){
    //     console.error('ocurrio un error')
    //   }
    //   else{
    //     let array = JSON.parse(data)
    //     let bsqId = 

    //     if(bsqId === undefined){
    //       return null
    //     }
    //     else{
    //       return (bsqId)
    //     }
    //   }
    // })
  }
  // const funcion = async () => {
  //   let read= await fs.promises.readFile('./text3.txt','utf-8')
  //   return(read)
  // }
  // getAll(){
  //   fs.readFile(`./${this.name}`,{encoding:'utf-8'},(err,data) => {
  //     if(err){
  //       console.log('hubo un error')
  //     }
  //     else{
  //       console.log(JSON.parse(data))
  //     }
  //   })
  // }
  // deleteById(deleteId){
  //   fs.readFile(`./${this.name}`,{encoding:'utf-8'},(err,data) => {
  //     if(err){
  //       console.log('hubo un error')
  //     }
  //     else{
  //       let array = JSON.parse(data)
  //       const itemElimin = array.filter((elemento) => elemento.id !== deleteId)
  //       const resto = itemElimin.map(ele=>{
  //         if(ele.id>deleteId){
  //           ele.id = ele.id - 1
  //         }
  //         return ele
  //       })
  //       fs.writeFile(`./${this.name}`, JSON.stringify(resto), 'utf-8',(err)=>{
  //         if(err){
  //           console.error('Error en la escritura de '+ this.name)
  //         }
  //         else{
  //           console.log('Objeto borrado correctamente')
  //         }
  //       })
  //     }
  //   })
  // }
  // deleteAll(){
  //   fs.writeFile(`./${this.name}`, JSON.stringify([]), 'utf-8',(err)=>{
  //     if(err){
  //       console.error('Error en la escritura de '+ this.name)
  //     }
  //     else{
  //       console.log('Archivo con array vacio')
  //     }
  //   })
  // }
}



class Producto{
  constructor(title,price,thumbnail){
    this.title = title
    this.price = price
    this.thumbnail = thumbnail
  }
}
let file1 = new Contenedor('text.json')
// file1.save(new Producto('Taza estilo Mafalda', 450, 'https://www.quevainatazas.com/wp-content/uploads/2019/05/mafalda8.jpg'))

console.log(file1.getById(2))
// file1.getAll()
// file1.deleteById(2)
// file1.deleteAll()