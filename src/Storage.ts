import { S3 } from 'aws-sdk';
const AWS_REGION = process.env.AWS_REGION || 'eu-central-1';
const bucketName = <string>process.env.BUCKET_NAME;

if (!bucketName) throw 'please define "BUCKET_NAME" env variable';

console.log('pre s3');
const s3 = new S3({
  region: AWS_REGION,
});
console.log('post s3');

export class DB {
  constructor() {

  }

  static async create(): Promise<DB> {
    const db = new DB();
    await db.init();
    return db;
  }

  async init() {
    if (! await this.bucketExists()) {
      await this.createBucket();
    }
  }

  fileName(id: string) {
    return `${id}.json`;
  }

  async createBucket() {
    return await s3.createBucket({
      Bucket: bucketName,
    }).promise();
  }

  async bucketExists() {
    try {
      await s3.listObjects({
        Bucket: bucketName,
      }).promise();
    } catch (error) {
      console.log('err', error);

      return false;
    }
    return true;
  }

  async readItem(id: string): Promise<any> {
    try {
      const record = await s3.getObject({
        Bucket: bucketName,
        Key: this.fileName(id),
      }).promise();
      if (record && record.Body) {
        const dataStr = record.Body.toString();
        console.log(`read ${dataStr.length} chars`);
        return JSON.parse(dataStr);
      }
    } catch (error) {
    }
    return undefined;
  }

  async deleteItem(id: string) {
    return await s3.deleteObject({
      Bucket: bucketName,
      Key: this.fileName(id),
    }).promise();
  }

  async writeItem(id: string, data: any) {
    const dataStr = JSON.stringify(data);
    console.log(`write ${dataStr.length} chars to ${this.fileName(id)}`);
    try {
      return s3.putObject({
        Bucket: bucketName,
        Key: this.fileName(id),
        Body: dataStr,
      }).promise();
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}

export default DB;