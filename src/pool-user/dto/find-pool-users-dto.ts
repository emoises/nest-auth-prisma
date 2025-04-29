import { IsString } from 'class-validator';

export class FindPoolUsersDto {
  @IsString()
  managerEmail: string;
}
