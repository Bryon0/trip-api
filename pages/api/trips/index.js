import prisma from 'lib/prisma'

export default async function handler(req, res) {
    if(req.method !== 'GET') {
        req.status(405).json({
            message: 'Method not allowed'
        })
        return
    }   

    const trips = await prisma.trip.findMany()
    res.status(200).json(trips)
}