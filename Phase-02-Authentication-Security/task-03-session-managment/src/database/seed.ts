import { log } from "console"
import db from "./connection/db.js"
import userSchema from "./schema/user.schema.js"
import argon2 from 'argon2'
const users = [
    {
        "name" : "Rishu",
        "email" : "rishu@gmail.com",
        "password" : "11223344"
    },
    {
        "name" : "Sanjay",
        "email" : "sanjay@gmail.com",
        "password" : "112233445"
    }
]


export const seedData = ()=>{
users.forEach(async (user)=>{

    const hash_password = await argon2.hash(user.password)

    await db.insert(userSchema)
    .values({
        name : user.name,
        email : user.email,
        hashPassword : hash_password
    })
    console.log("User seeded");
    
})
}

