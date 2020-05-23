import { Component, OnInit } from '@angular/core';
import { Result } from '../result';
import { ExampleService } from '../example.service';

@Component({
  selector: 'app-post-backend',
  templateUrl: './post-backend.component.html',
  styleUrls: ['./post-backend.component.css'],
})
export class PostBackendComponent implements OnInit {
  public result: Result;

  constructor(private exampleService: ExampleService) {}

  ngOnInit(): void {}

  onSubmit(resultForm): void {
    let oneResult: Result = new Result(resultForm.avalue);
    this.exampleService
      .postApiBackend(oneResult)
      .subscribe((result) => (this.result = result));
  }
}
