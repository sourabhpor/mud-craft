import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class ErrorHandler implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
