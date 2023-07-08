import { Component, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { BehaviorSubject } from 'rxjs';
import { todoDB, TodoI } from '../../dexie-db/localDB';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todoDB = todoDB;
  allItems$ = new BehaviorSubject<TodoI[] | null>([]);
  constructor() {}

  ngOnInit() {
    liveQuery(() => this.todoDB.todos.toArray()).subscribe((infoData) => {
      this.allItems$.next(infoData);
    });
  }
}
