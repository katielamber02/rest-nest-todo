// import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

// export class TaskStatusValidationPipe implements PipeTransform {
//   transform(value: any, metadata: ArgumentMetadata) {
//     console.log(value, metadata); // invalid metatype([Function:string],type:body,data:status)
//     return value;
//   }
// }

// we don't need metadata in this case, so:

import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  // readonly means that even doing runtime it can't be modofied with class members
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`" ${value}" is an invalid status`);
    }
    return value;
  }
  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status); // -1 if there is no such a status
    return idx !== -1; // so if the status is valid we will return true
  }
}

// POSTMAN: PATCH
// http://localhost:3000/tasks/83e66de0-231a-11ea-98d0-c988b784d8e1/status=_INVALID_STATUS

// {
//   "statusCode": 400,
//   "error": "Bad Request",
//   "message": "\" _INVALID_STATUS\" is an invalid status"
// }
