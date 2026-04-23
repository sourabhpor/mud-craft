import * as fs from "fs";
import * as path from "path";
import { Injectable } from "@nestjs/common";
import { Express } from "express";

export function generateOtp(length: number = 6): string {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  return Math.floor(min + Math.random() * (max - min)).toString();
}

export function generateOtpExpiry(minutes: number = 10): Date {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + minutes);
  return expiry;
}

@Injectable()
export class FileUploadService {
  uploadFiles(files: Express.Multer.File[], folder: string): string[] {
    const uploadDir = path.join(process.cwd(), `public/uploads/${folder}`);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    return files.map((file) => `/uploads/${folder}/${file.filename}`);
  }

  deleteFiles(fileUrls: string[], folder: string) {
    const uploadDir = path.join(process.cwd(), `public/uploads/${folder}`);

    fileUrls.forEach((fileUrl) => {
      const filePath = path.join(uploadDir, path.basename(fileUrl));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  }
}
