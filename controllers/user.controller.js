import db from "../db.js"
import bcrypt  from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SEC } from "../config/config.js";


// createUser
export const createUser=async(req,res,next)=>{
    try {
        const {name,email,password}=req.body;

        let salt =await bcrypt.genSalt(10)
       let hash=await bcrypt.hash(password,salt)
       db.query(`SELECT *
       FROM USERS
       WHERE email=?`,[email],(error,results)=>{
        if(error){
            console.log("Error in Searching Users")
            return ;
        }
        if(results.length>0){
            return res.status(401).json("User With this email Already exists")
        }
        else{
            db.query(`INSERT INTO USERS(name,email,password)
            VALUES(?,?,?)`,[name,email,hash],async(error,results)=>{
                if(error){
                    console.log("Error in Insertion in users")
                    return;
                }
                else{
                    
                     const data={
                        user:{
                            id:results.insertId
                        }
                     }
                     const token=jwt.sign(data,JWT_SEC)
                     return res.status(200).json({token})
                }
            })
        }
       })
      
        
    } catch (error) {
        return res.status(500).json("Internal Server Error")
        
    }
}


// loginUser

export const loginUser=(req,res,next)=>{
    try {
        const {email,password}=req.body
        db.query(`SELECT *
        FROM USERS
        WHERE email=?`,[email],async(error,results)=>{
            if(error){
                return res.status(400).json("Error in login")
            }
            if(results.length<=0){
                return res.status(401).json("Please login Using correct credentials")
            }
            else{
                let passwordCompare=await bcrypt.compare(password,results[0].password)
                if(!passwordCompare){
                    return res.status(400).json("Please login using correct credentials")
                }
                const data={
                    user:{
                        id:results[0].id
                    }
                }
                const token =jwt.sign(data,JWT_SEC)

                 return res.status(200).json({token})
            }
        })

    } catch (error) {
        return res.status(500).json("Internal Server Error")
        
    }
}

// updateUser

export const updateUser=async(req,res,next)=>{
    try {
        const  id =req.params.id
        const {name,email,password}=req.body
        let hash=null;
        if(password){
            const salt=await bcrypt.genSalt(10)
             hash =await bcrypt.hash(password,salt)
        }

        db.query(`UPDATE USERS
        SET name=?, email =?, password =?
        WHERE id =?`,[name,email,hash,id],(error,results)=>{
            if(error){
                return res.status(400).json("Error in Updating")
            }
            else{
                console.log(results)
                return res.status(200).json("User Successfully updated")
            }
        })
        
    } catch (error) {
        return res.status(500).json("Internal Server Error")
        
    }
}

// deleteUser

export const deleteUser=(req,res,next)=>{
    try {
        const id=req.params.id;
        
        db.query(`DELETE
        FROM USERS
        WHERE id=?`,[id],(error)=>{
            if(error){
                return res.status(400).json("Error in Deletion")
            }
            else{
                return res.status(200).json("User Deleted")
            }
        })

    } catch (error) {
        return res.status(500).json("Internal Server Error")
        
    }
}