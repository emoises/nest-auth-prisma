import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePoolUserDto {
  @IsString()
  name: string;

  @IsString()
  status: string;

  @IsString()
  activituType: string;

  @IsOptional()
  @IsString()
  daysOfActivity?: string;

  @IsDateString()
  createdAt: string;
}
