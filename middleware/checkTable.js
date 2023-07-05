import db from "../db.js"

export const userTableCheck=async(req,res,next)=>{
    try {
        let createTableQuery=`
        CREATE TABLE USERS(
            id INT NOT NULL UNIQUE AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            PRIMARY KEY (id)
        );`

       await db.query(`SHOW TABLES LIKE "USERS"`,(error,results)=>{
            if(error){
                console.log("Error in Searching of Table")
                return;
            }
            if(results.length>0){
                console.log("Table Already Found")
                next()
            }
            else{
                db.query(createTableQuery,(error)=>{
                    if(error){
                        console.log("Error in Table Creation")
                        return ;
                    }
                    else{
                        console.log("Table User created")
                        next()
                    }
                })
            }
        })
    } catch (error) {
        return res.status(500).json("Internal Server Error")
        
    }
}