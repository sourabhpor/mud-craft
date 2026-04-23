import { Injectable } from "@nestjs/common";
import Twilio from "twilio";

@Injectable()
export class SmsService {
  private client;

  constructor() {
    this.client = Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  }

  async sendOtp(phone: string, otp: string) {
    return this.client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });
  }
}
