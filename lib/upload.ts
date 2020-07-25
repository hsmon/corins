import AWS from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'

AWS.config.logger = console

const accessKeyId = process.env.S3_ACCESSKEY
const secretAccessKey = process.env.S3_SECRET_ACCESSKEY
const bucketName = process.env.S3_BUCKET_NAME

const bucket = new S3({
  accessKeyId,
  secretAccessKey,
  region: 'ap-northeast-1'
})

export default async (uniqueId: string, imagePath: string): Promise<void> => {
  const param: S3.Types.PutObjectRequest = {
    Bucket: bucketName as string,
    Key: `images/${uniqueId}.png`,
    Body: Buffer.from(imagePath, 'base64'),
    ACL: 'public-read',
    ContentType: 'image/png'
  }

  bucket.upload(param, (err: Error, data: S3.ManagedUpload.SendData) => {
    if (err) {
      console.error(err)
    } else {
      console.log('Successfully uploaded file.', data)
    }
  })
}
