/* eslint-disable @typescript-eslint/camelcase */
import DB from '~/lib/db'
import escape from 'sql-template-strings'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { unique_id } = req.query
  if (!unique_id) {
    res.send({
      error: 'not found url'
    })
  }
  try {
    if (unique_id) {
      const url = await DB.query(escape`
        SELECT *
          FROM url
          JOIN pin
          ON url.pin_id = pin.id
          WHERE url.unique_id = ${unique_id}
        ;
      `)
      res.status(200).json(url)
    } else {
      return res.status(200).json({
        error: 'not found url'
      })
    }
  } catch (error) {
    console.error(error)
    res.send({
      error: {
        message: 'Not found URL.'
      }
    })
  }
}
