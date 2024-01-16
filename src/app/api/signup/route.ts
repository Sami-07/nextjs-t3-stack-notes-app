// import prisma from "../../../helpers/prismaHelper";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const { name, email, password, confirmPassword } = await req.json()
    if (!name || !email || !password || !confirmPassword) return NextResponse.json({ message: "Please fill all the fields", status: 400 })
    if (password !== confirmPassword) return NextResponse.json({ message: "Password and confirm password should be same", status: 400 });
   
    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (userExists) return NextResponse.json({ message: "User already exists", status: 400 })

    const hashedPassword = await bcrypt.hash(password, 10);

    let role = "USER";
    
    if (email === "admin@gmail.com") {
        role = "ADMIN"
    }
    else if (email === "recruiter@gmail.com") {
        role = "RECRUITER"
    }
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            role: role

        }
    })
 
    return NextResponse.json({ status: 200, message: "User created successfully" })
}