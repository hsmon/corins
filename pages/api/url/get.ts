import DB from '~/lib/db'
import escape from 'sql-template-strings'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const url = await DB.query(escape`
        SELECT *
        FROM url;
      `)
    if (!url) {
      return res.send({
        error: {
          message: 'Not found URL.'
        }
      })
    }
    return res.status(200).json(url)
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      error: {
        message: error
      }
    })
  }
}
