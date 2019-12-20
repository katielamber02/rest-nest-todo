import { TaskStatus } from '../task.model';
import { IsOptional, IsNotEmpty, IsEnum } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum([TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}

// POSTMAN:
// http://localhost:3000/tasks?status=NONE
// {
//   "statusCode": 400,
//   "error": "Bad Request",
//   "message": [
//       {
//           "target": {
//               "status": "NONE"
//           },
//           "value": "NONE",
//           "property": "status",
//           "children": [],
//           "constraints": {
//               "isEnum": "status must be a valid enum value"
//           }
//       }
//   ]
// }

// http://localhost:3000/tasks?search
// {
//   "statusCode": 400,
//   "error": "Bad Request",
//   "message": [
//       {
//           "target": {
//               "search": ""
//           },
//           "value": "",
//           "property": "search",
//           "children": [],
//           "constraints": {
//               "isNotEmpty": "search should not be empty"
//           }
//       }
//   ]
// }
