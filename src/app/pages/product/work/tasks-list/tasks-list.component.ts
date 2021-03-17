import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VerifierService } from '../../verifier/verifier.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})

export class TasksListComponent implements OnInit {

    constructor(
        public verifierService: VerifierService,
        private http: HttpClient,
    ){}

    ngOnInit(){
      this.fetchTasks()
    }
    
    private fetchTasks () {
      getTasks.subscribe(tasks => {
       // this.loadedTasks = tasks
        console.log(tasks)
      })  
    }
}
