import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VerifierService } from '../verifier/verifier.service';


@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})

export class SensorsComponent implements OnInit {
    constructor(
        public verifierService: VerifierService,
    ){}
    ngOnInit(){}
}
