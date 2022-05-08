import { PrismaClient } from '@prisma/client'
import { general_infos } from './general_infos'
import { locations } from './locations'

const prisma = new PrismaClient()

 const departments = [
    {
        name: "Information Technology",
        budget: 8000
    },
    {
        name: "Science",
        budget: 8000
    },
    {
        name: "Education",
        budget: 8000
    },


    {
        name: "Business Administration",
        budget: 8000
    },


    {
        name: "Arts & Humanities",
        budget: 8000
    },


    {
        name: "Finance",
        budget: 8000
    },


]

async function main() {

    await prisma.department.createMany({
        data: [
            ...departments
        ]
    });

    await prisma.location.createMany({
        data: [
            ...locations
        ]
    })


    await prisma.generalInfo.createMany({
        data: [
            ...general_infos
        ]
    })

}

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})