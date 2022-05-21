import { PrismaClient } from '@prisma/client'
import prisma from 'lib/prisma'
import { isResSent } from 'next/dist/shared/lib/utils'

export default async function handler(req, res) {
    if(req.method === 'GET') {
        const trip = await prisma.trip.findUnique({
            where: {
              id: parseInt(req.query.id),
            },
          })
          if(!trip) {
            res.status(404).json({message: 'Not Found'})
          }          
          res.status(200).json(trip)
    }

    if(req.method === 'PUT') {
      const {trip, name, date, amount, currency} = req.body

      await prisma.expense.update({
        data: {
          trip,
          name, 
          date, 
          amount,
          currency,
        },
        where: {
          id: parseInt(req.query.id)
        }
      })
      return res.status(200).end()
    }

    if(req.method === 'DELETE') {
      await prisma.expense.delete({
        where: {
          id: parseInt(req.query.id),
        },
      })
      return res.status(200).end()
    }

}