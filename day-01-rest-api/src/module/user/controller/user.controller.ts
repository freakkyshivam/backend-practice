
import type { Request, Response } from "express";
import type { UserService } from "../services/user.service.js";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      

      if (!name || !email || !password) {
         return res.status(400).json({
          status : false,
          msg : "All fields are required"
         })
      }

      const user = await this.userService.create(name, email, password);

      if (!user) {
         return res.status(400).json({
          status : false,
          msg : "User creation failed"
         })
      }

      return res.status(201).json({
        status : true,
        msg: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status : false,
        msg: error instanceof Error ? error.message : "User creation failed",
      });
    }
  }

  async login(req : Request, res : Response){

    try {
      const {email , password} = req.body;

    if(!email || ! password){
       return res.status(400).json({
        status :false,
        msg : "All fields are required"
       })
    }

    const result = await this.userService.login(email, password);


    return res.cookie("user_id", result,{
      maxAge : 24 * 60 * 60 * 7 * 1000,
      httpOnly : true,
      expires : new Date(Date.now() + 24 * 60 * 60 * 7 * 1000),
      secure : process.env.NODE_ENV === "production"
    }).json({
      status : true,
      msg : "Login successfully"
    })
    } catch (error) {
      return res.status(401).json({
        msg: error instanceof Error ? error.message : "Login failed",
      });
    }
  }

   getCurrUser = async (req : Request, res : Response)=>{

    try {
      const user_id = req.user_id;

    if(!user_id){
      return res.status(401).json({
        status : false,
        msg : "User is not authenticated"
      })
    }

    const user = await this.userService.getCurrUser(user_id);

    if(!user){
       return res.status(401).json({
        status : false,
        msg : "Wrong user id"
       })
    }
    return res.status(200).json({
      status : true,
      user : {
        id : user?.id,
        email : user?.email,
        name : user?.name
      }
    })
    } catch (error) {
      return res.status(400).json({
        status : false,
        msg: error instanceof Error ? error.message : "User not found",
      });
    }
    
  }
}
