import { PrismaClient } from "@prisma/client";
import { create } from "domain";

const prisma = new PrismaClient();

async function createUser(
  name: string,
  password: string,
  email: string,
  age: number
) {
  const res = await prisma.user.create({
    data: {
      name,
      email,
      password,
      age,
    }, 
    select : {
        name  : true , 
        email : true, 
        age : true ,
        password : false 
    }
  });

  console.log(res)
}


// createUser("shasmher" , "passwword232" , "sachinxmpl6@gmailc.on" , 23)

// createUser("sachin" , "sachinxmpl6" , "kck588385@gmail.com" , 40 )



async function update(name : string , email : string ){
    const res = await prisma.user.update({
        where : {email : email } , 
        data : {
                name : name 
        } , 
        select : {
            password : false  , 
            name : true , 
            email : true , 
            id : true , 
            age : true 
        }
    })
    console.log(res)
}

// update("updateduser" , "kck588385@gmail.com")


async function getUser() {
    const res = await prisma.user.findMany({
        where : { age  : {gt : 20}}
    })
    console.log(res)
}

// getUser() ; 