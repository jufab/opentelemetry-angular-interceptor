import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../example.service';
import { Result } from '../result';

@Component({
  selector: 'app-view-backend',
  templateUrl: './view-backend.component.html',
  styleUrls: ['./view-backend.component.css']
})
export class ViewBackendComponent implements OnInit {

  result: Result;

  constructor(private exampleService: ExampleService) { }

  ngOnInit(): void {
    this.exampleService.getApiBackend().subscribe(result => this.result = result);
  }

}
