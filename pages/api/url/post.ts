import DB from '~/lib/db'
import escape from 'sql-template-strings'
import Hashids from 'hashids/cjs'
import AWS from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'

// ユニークIDの生成
const hashids = new Hashids('', 32)

// S3へアップロード
AWS.config.logger = console

const accessKeyId = process.env.S3_ACCESSKEY
const secretAccessKey = process.env.S3_SECRET_ACCESSKEY
const bucketName = process.env.S3_BUCKET_NAME

const bucket = new S3({
  accessKeyId,
  secretAccessKey,
  region: 'ap-northeast-1'
})

export default async ({ imagePath, imageWidth, imageHeight, pins }) => {
  const hasStatus = imagePath && imageWidth && imageHeight && pins.length
  if (!hasStatus) return

  try {
    if (hasStatus) {
      const uniqueId = await hashids.encode(
        imageWidth +
          imageHeight +
          pins.length * Math.floor(Math.random() * imagePath.length)
      )

      const param: S3.Types.PutObjectRequest = {
        Bucket: bucketName as string,
        Key: `images/${uniqueId}.png`, // ファイル絶対パス
        Body: Buffer.from(imagePath, 'base64'), // ファイルの内容
        ACL: 'public-read', // インターネットから誰でもダウンロードできるように
        ContentType: 'image/png'
      }

      bucket.upload(param, (err: Error, data: S3.ManagedUpload.SendData) => {
        if (err) {
          console.error(err)
        } else {
          console.log('Successfully uploaded file.', data)
        }
      })
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
    if (error) throw error
  }
}
