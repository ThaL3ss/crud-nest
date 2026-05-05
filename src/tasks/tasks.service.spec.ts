import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  create(createTaskDto: CreateTaskDto) {
    const newTask: Task = {
      id: this.idCounter++,
      ...createTaskDto,
      isCompleted: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) throw new NotFoundException(`Task #${id} not found`);
    return task;
  }

  update(id: number, updateTaskDto: any) {
    const task = this.findOne(id);
    const index = this.tasks.indexOf(task);
    this.tasks[index] = { ...task, ...updateTaskDto };
    return this.tasks[index];
  }

  remove(id: number) {
    this.findOne(id);
    this.tasks = this.tasks.filter(t => t.id !== id);
    return { deleted: true };
  }
}