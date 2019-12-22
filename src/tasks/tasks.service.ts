import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    // user added
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    // const found = await this.taskRepository.findOne(id);
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      // throw new NotFoundException(); // automatically forms an error exception
      throw new NotFoundException(`Task with id "${id}" not found`);
      // it will also work for updating as it uses the same getTaskById method
    }
    return found;
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user); //relation to user added
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    // const result = await this.taskRepository.delete(id);
    const result = await this.taskRepository.delete({ id, userId: user.id }); //without where
    console.log(result); // {raw:[],affected:2}  id=2
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  }
  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
