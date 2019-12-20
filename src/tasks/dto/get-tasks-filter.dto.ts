import { IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum([TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.OPEN]) // @IsEnum(entity: object)
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
