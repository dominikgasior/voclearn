import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { CreateWordContract } from '@voclearn/contracts';

export class CreateWordDto implements CreateWordContract {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  value!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  translation!: string;

  @IsNotEmpty()
  @IsUUID()
  wordGroupId!: string;

  @IsNotEmpty()
  @IsUUID()
  associationId!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  associationNote!: string;
}
