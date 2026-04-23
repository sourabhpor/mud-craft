import { diskStorage } from "multer";
import { extname } from "path";
import { BadRequestException } from "@nestjs/common";
import * as fs from "fs";

const uploadDir = "public/uploads/products";

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const multerOptions = {
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      cb(null, uploadDir);
    },
    filename: (req: any, file: any, cb: any) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join("");
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req: any, file: any, cb: any) => {
    // Accept image files only
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedMimes.includes(file.mimetype)) {
      cb(
        new BadRequestException(
          "Only image files are allowed (jpeg, png, gif, webp)",
        ),
        false,
      );
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};
