import mysql from "mysql"
import { MYSQL_DBNAME, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER } from "./config/config.js"
const db =mysql.createConnection({
    host:MYSQL_HOST,
    user:MYSQL_USER,
    password:MYSQL_PASSWORD
})
 

const dbName=MYSQL_DBNAME

export const connectToDb=()=>{
    try {
        db.connect((error)=>{
            if(error){
                console.log("Error in Server Connection",error)
                return;
            }
            else{
                console.log("Sever Connected")
                db.query(`SHOW DATABASES LIKE "${dbName}"`,(error,results)=>{
                    if(error){
                        console.log("Error in Searching of DataBase")
                        return;
                    }
                    if(results.length>0){
                        db.query(`USE ${dbName}`,(error)=>{
                            if(error){
                                console.log("error in Use of DataBase")
                                return;
                            }
                            else{
                                console.log("Ready To accept Connections")
                                return;
                            }

                        })
                    }
                    else{
                        db.query(`CREATE DATABASE ${dbName}`,(error)=>{
                            if(error){
                                console.log("Error in DataBase Creation")
                                return;
                            }
                            else{
                                console.log("DataBase Created")
                                db.query(`USE ${dbName}`,(error)=>{
                                    if(error){
                                        console.log("Error in Use of New DataBase")
                                        return;
                                    }
                                    else{
                                        console.log("Ready To accept new Connections")
                                        return;
                                    }
                                })
                            }
                        })
                    }

                })
            }
        })
    } catch (error) {
        console.log("Internal Server Error")
        return ;
    }
}

export default db;