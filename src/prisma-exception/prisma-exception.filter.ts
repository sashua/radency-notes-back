import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2003': {
        const statusCode = HttpStatus.BAD_REQUEST;
        response.status(statusCode).json({
          message: 'category not found',
          error: 'Bad Request',
          statusCode,
        });
        break;
      }

      case 'P2025': {
        const statusCode = HttpStatus.NOT_FOUND;
        response.status(statusCode).json({
          message: 'record not found',
          error: 'Not Found',
          statusCode,
        });
        break;
      }

      default: {
        super.catch(exception, host);
        break;
      }
    }
  }
}
