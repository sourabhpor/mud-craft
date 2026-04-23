export declare function generateOtp(length?: number): string;
export declare function generateOtpExpiry(minutes?: number): Date;
export declare class FileUploadService {
    uploadFiles(files: Express.Multer.File[], folder: string): string[];
    deleteFiles(fileUrls: string[], folder: string): void;
}
