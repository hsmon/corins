import DB from '~/lib/db'
import escape from 'sql-template-strings'
import Hashids from 'hashids/cjs'
import uploadS3 from '~/lib/upload'

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

      await DB.insert(escape`
        INSERT INTO pin(src) VALUES(${JSON.stringify(pins)})
        ;
      `)
      await DB.insert(escape`
        INSERT INTO
          url(image_width, image_height, pin_id, unique_id, datetime)
          SELECT
            ${imageWidth},
            ${imageHeight},
            COUNT(pin.id + 1),
            ${uniqueId},
            CURRENT_TIMESTAMP
          FROM pin
        ;
      `)
      return { uniqueId }
    }
  } catch (error) {
    if (error) return { error }
  }
}
