import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VerifierService } from '../../verifier/verifier.service';
import { ProductService } from '../../product.service';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})

export class TasksListComponent implements OnInit {

    public loadedTasks=[];
    public filterType = 'month';
    public item;
    public taskActive;

    constructor(
        public verifierService: VerifierService,
        private productService: ProductService,
    ){}

    ngOnInit(){
      
    }
  
    public onDateChange($event) {
      this.fetchTasks($event.year, $event.month, $event.day);
    }

    public onTaskChange(event) {
      this.taskActive = event;
      console.log(event)

    }

    public fetchTasks (year, month, date) {
      this.productService.getTasks(year, month, date)
      .subscribe(
       data => {
          this.filterType = date ? 'day' : month ? 'month' : 'year';
          console.log(data, "resposta")
          this.loadedTasks=data;
        })
    }

    

  }

