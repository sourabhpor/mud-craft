import { Injectable } from "@nestjs/common";

@Injectable()
export class SmsService {
  async sendOtp(phone: string, otp: string) {
    console.log(`Sending OTP ${otp} to ${phone}`);
  }
}
