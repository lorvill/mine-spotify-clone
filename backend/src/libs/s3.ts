import { S3Client } from '@aws-sdk/client-s3'

const {
  R2_ACCESS_KEY,
  R2_SECRET_KEY,
  R2_ACCOUNT_ID
} = process.env

if (!R2_ACCESS_KEY || !R2_SECRET_KEY || !R2_ACCOUNT_ID) {
  throw new Error("Error configuration");
}

export const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY,
    secretAccessKey: R2_SECRET_KEY,
  },
})