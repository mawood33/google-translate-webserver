import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from './service/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  signForm: FormGroup;
  search: string;
  sign = {};

  constructor(public router: Router, public translateService: TranslateService, private fb: FormBuilder) {
    console.log('in KoreanSignComponent');
    this.createForm();
  }

  clearSign() {
    this.sign = {};
  }
  
  searchSigns() {
    this.clearSign();
    console.log('get korean sign:', this.sign);
    const test = {
        text: ['father'],
        target: ['ko'],
        translation: []
    }
    this.sign = this.translateService.callTranslateLambda(test);
    console.log(this.sign);
  }

  createForm() {
    this.signForm = this.fb.group({
      name: ['', Validators.required]
    })
  }
}

