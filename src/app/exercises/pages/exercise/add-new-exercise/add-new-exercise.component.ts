import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-exercise',
  templateUrl: './add-new-exercise.component.html',
  styleUrls: ['./add-new-exercise.component.css']
})
export class AddNewExerciseComponent implements OnInit {
  title = 'Add new exercise';

  constructor() { }

  ngOnInit() {
  }

}
