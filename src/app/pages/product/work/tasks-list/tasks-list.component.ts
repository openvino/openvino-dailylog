import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VerifierService } from '../../verifier/verifier.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})

export class TasksListComponent implements OnInit {

    loadedTasks=[];

    constructor(
        public verifierService: VerifierService,
        private productService: ProductService,
    ){}

    ngOnInit(){
      this.fetchTasks()
    }
    
    private fetchTasks () {
      this.productService.getTasks().subscribe(
        response => {
          console.log(response, "resposta")
          this.loadedTasks=response;
        }
      )
    
    }

  }