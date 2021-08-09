import Hashids from 'hashids/cjs'
import uploadS3 from '~/lib/upload'

import { PSDB } from 'planetscale-node'
const conn = new PSDB('main')

export type PostProps = {
  imagePath: string
  imageWidth: number
  imageHeight: number
  pins: string
}

type ReturnType = {
  uniqueId?: string
  error?: unknown
} | void

// ユニークIDの生成
const hashids = new Hashids('', 32)

export default async ({
  imagePath,
  imageWidth,
  imageHeight,
  pins
}: PostProps): Promise<ReturnType> => {
  const hasStatus = imagePath && imageWidth && imageHeight && pins.length

  try {
    if (hasStatus) {
      const uniqueId = hashids.encode(
        imageWidth + imageHeight + pins?.length ??
          1 * Math.floor(Math.random() * imagePath?.length ?? 1)
      )

      await uploadS3(uniqueId, imagePath)

      await conn.execute(
        `
        INSERT INTO pin(src) VALUES(?);
      `,
        [JSON.stringify(pins)]
      )
      await conn.execute(
        `
        INSERT INTO
          url(image_width, image_height, pin_id, unique_id)
          SELECT
            ?,
            ?,
            COUNT(pin.id + 1),
            ?
          FROM pin
        ;
      `,
        [imageWidth, imageHeight, uniqueId]
      )
      return { uniqueId }
    }
  } catch (error) {
    if (error) return { error }
  }
}
