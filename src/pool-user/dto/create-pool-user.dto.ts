import { IsString } from 'class-validator';
import { IsDayOfWeek } from 'src/validator/custom.classValidator';

export class CreatePoolUserDto {
  @IsString()
  name: string;

  @IsString()
  status: string;

  @IsString()
  activityType: string;

  @IsString()
  managerId: string;

  @IsDayOfWeek({
    message:
      'daysOfActivity deve conter apenas abreviações válidas dos dias da semana (ex: MON, TUE)',
  })
  daysOfActivity?: string[];
}
