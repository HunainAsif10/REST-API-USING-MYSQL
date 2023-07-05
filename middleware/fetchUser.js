import { JWT_SEC } from "../config/config.js"
import jwt from "jsonwebtoken"
export const fetchUser=(req,res,next)=>{
    try {
        let token=req.header("auth-token")
      
        if(!token){
            return res.status(401).json("Please authenticate using valid Token")
        }
        const data=jwt.verify(token,JWT_SEC)
        req.user=data.user;
        next()

    } catch (error) {
        return res.status(500).json("Internal Server Error")
        
    }
}

export const fetchAndAuthenticate=(req,res,next)=>{
    try {
        fetchUser(req,res,()=>{
           
             if(req.params.id==req.user.id){
                next()
             }
             else{
                return res.status(401).json("Please Validate Using Valid Token")
             }
         
        })
    } catch (error) {
        return res.status(500).json("Internal Server Error")
        
    }
}