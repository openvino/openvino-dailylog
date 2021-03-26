import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VerifierService } from '../../verifier/verifier.service';
import { ProductService } from '../../product.service';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})

export class TasksListComponent implements OnInit {

    public loadedTasks=<any>[];
    public filterType = 'month';
    public item;
    public loadedTasksKeys=<any>[];
    public taskKeyToDate;

    constructor(
        public verifierService: VerifierService,
        private productService: ProductService,
    ){}

    ngOnInit(){}
  
    public onDateChange($event) {
      this.fetchTasks($event.year, $event.month, $event.day);
    }

    public fetchTasks (year, month, date) {
      this.productService.getTasks(year, month, date)
      .subscribe(
       data => {
          this.filterType = date ? 'day' : month ? 'month' : 'year';
          console.log(data, "resposta task entity")
          this.loadedTasks=data;
        })
    }
  }

