import { PrismaClient } from "@prisma/client";


const prismaClient = new PrismaClient()


async function createUser({name , email , password} : any ){
        const response = await prismaClient.user.create({
                data : {
                        name  , 
                        email , 
                        password , 
                        role : "Admin"
                }
        })
        console.log(response)
}

// createUser({ name : "Sachin" , email : "sachinxmpl6@gmail.com" , password : "password"})

