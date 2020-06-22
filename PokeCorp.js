const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:root@localhost/sql_intro')
let json = require('./raw-pokemon-trainer-json/poke_data.json'); //(with path)
//console.log(json)
let check=''
let checkT=[]
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

const addpokemon = async function (name,type,height,weight) {
    let typeId= await sequelize.query(`SELECT type_id FROM pokemon_type WHERE type_name='${type}'`)
    let query =`INSERT INTO pokemon VALUES ( null,'${name}',${typeId[0][0].type_id},${height},${weight})`
     await sequelize.query(query)  
}
// const addType = async function (type) {
//     let findT= checkT.find(f=>f==type)
//     if(type!==findT){
//         checkT.push(type)
//         let query =`INSERT INTO pokemon_type VALUES ( null,'${type}')`
//          await sequelize.query(query)
//     }
      
//}
const addtrainer = async function (name,cityName) {
    let findT= checkT.find(f=>f==name)
    if(name!==findT){
        checkT.push(name)
    let townId= await sequelize.query(`SELECT id FROM town WHERE name='${cityName}'`)
    let query =`INSERT INTO trainer VALUES ( null,'${name}',${townId[0][0].id})`
    //console.log( query)
   await sequelize.query(query)  
    }
}
const addTown = async function (name) {
    let findT= checkT.find(f=>f==name)
    console.log(findT)
    if(name!==findT){
        checkT.push(name)
    let query =`INSERT INTO town VALUES ( null,'${name}')`
    await sequelize.query(query)  
}}

const pokemonTrainer= async function (p,t){  
    let query=  `INSERT INTO pokemon_trainer VALUES (${p},${t})`
     await sequelize.query(query)    
}







for(let m of json){
    // addpokemon( m.name,m.type,m.height,m.weight)
     //addType(m.type)
    }
 for(let m of json){
     for (let i of m.ownedBy){
       
    // addtrainer(i.name,i.town)
      //   addTown(i.town)
       // console.log(i.name)
    }
 }


const addPt = async function () {
    for(let m of json){
      for (let i of m.ownedBy){
        let arryPokemonId= await sequelize.query(`SELECT p_id FROM pokemon WHERE p_name='${m.name}'`)
        let arryTrainerId= await sequelize.query(`SELECT id FROM trainer WHERE name='${i.name}'`)
        
        pokemonTrainer(arryPokemonId[0][0].p_id,arryTrainerId[0][0].id)
   
      }}
     
    }

// addPt()
const getHeaviestPokemon = async function () {
    let results = await sequelize.query("SELECT p_name,p_weight FROM pokemon WHERE p_weight=(SELECT MAX(p_weight) FROM pokemon)")
    console.log(results[0][0]) 
    return results[0][0]
}
const getPokemonByType = async function(type) {
    let results = await sequelize
                            .query(`SELECT p_name FROM pokemon 
                                    WHERE type_p=(SELECT type_id FROM pokemon_type WHERE type_name = "${type}") `)

                                    console.log(results[0]) 
    return results[0]                                
}
const findOwners = async function(pokemonName) {
    let results = await sequelize
                            .query(`SELECT t.name 
                                    FROM trainer AS t, pokemon AS p, pokemon_trainer as pt
                                    WHERE p.p_name = "${pokemonName}"
                                    AND p.p_id = pt.pokemon_id 
                                    AND t.id = pt.trainer_id`)

                                    console.log(results[0])
    return results[0]
}
findOwners("gengar")
//getPokemonByType("grass")
//getHeaviestPokemon()