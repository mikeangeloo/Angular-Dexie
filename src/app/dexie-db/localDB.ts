import Dexie from 'dexie';

export interface TodoI {
  id?: number;
  task: string;
  completed: boolean;
}

export class TodoDB extends Dexie {
  todos!: Dexie.Table<TodoI, number>;

  constructor() {
    super('todoApp');
    this.version(1).stores({
      todos: '++id,task,completed',
    });
  }
  public async addTask(event: Event, taskField: any) {
    event.preventDefault();

    await this.todos.add({
      task: taskField.value,
      completed: false,
    });
    taskField.value = '';
  }

  public async deleteTask(id: number | undefined) {
    if (id) {
      await this.todos.delete(id);
    }
  }

  public async toggleStatus(
    id: number | undefined,
    checkBox: HTMLInputElement | null
  ) {
    if (id && checkBox) {
      await this.todos.update(id, {
        completed: !!checkBox.checked,
      });
    }
  }
}

export const todoDB = new TodoDB();
