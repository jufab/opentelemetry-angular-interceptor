import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../example.service';
import { Result } from '../result';

@Component({
  selector: 'app-jsonp-backend',
  templateUrl: './jsonp-backend.component.html',
  styleUrls: ['./jsonp-backend.component.css'],
})
export class JsonpBackendComponent implements OnInit {
  result: Result;

  constructor(private exampleService: ExampleService) {}

  ngOnInit(): void {
    this.exampleService.jsonpApiExample().subscribe((data: Result) => {
      this.result = data;
    });
  }
}
