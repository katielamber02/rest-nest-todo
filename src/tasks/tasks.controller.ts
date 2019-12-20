import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  // here we create a DI
  // constructor with a parameter taskService and type TaskService
  // it will be use when instantiate this controller and looking for taskService object
  // it's going to find it or create it if it doesn't exist

  constructor(private tasksService: TasksService) {}

  // BEFORE FILTER:
  // @Get()
  // getAllTasks(): Task[] {
  //   // could be name any other name
  //   return this.tasksService.getAllTasks();
  // }
  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    // http://localhost:3000/tasks?status=OPEN&search=hello
    console.log(filterDto); // {status:"OPEN",search="hello"}

    // http://localhost:3000/tasks?status=DONE
    // http://localhost:3000/tasks?search=like

    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  // BEFORE DTO:
  // @Post()
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Task {
  //   return this.tasksService.createTask(title, description);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
    // create a new task and then find by id
    // otherwise returns 1
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    // @Body('status') status: TaskStatus,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}

// POSTMAN:
// for empty title and description
// Gives this:
// See more: https://github.com/typestack/class-validator#validation-decorators
//   {
//     "statusCode": 400,
//     "error": "Bad Request",
//     "message": [
//         {
//             "target": {
//                 "description": "",
//                 "title": ""
//             },
//             "value": "",
//             "property": "title",
//             "children": [],
//             "constraints": {
//                 "isNotEmpty": "title should not be empty"
//             }
//         },
//         {
//             "target": {
//                 "description": "",
//                 "title": ""
//             },
//             "value": "",
//             "property": "description",
//             "children": [],
//             "constraints": {
//                 "isNotEmpty": "description should not be empty"
//             }
//         }
//     ]
// }
