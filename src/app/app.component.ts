import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TargetLanguage, Translate } from './models/translate.model';
import { TranslateService } from './service/translate.service';
import {Observable, Observer} from 'rxjs/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  translations: Observable<any>;
  translateForm: FormGroup;
  translation: Translate = {
    text: [],
    target: '',
    translation: []
  };
  targets = TargetLanguage;
  keys: any;
  time: Observable<string>;

  constructor(public router: Router, public translateService: TranslateService, private fb: FormBuilder) {
    this.createForm();
    this.keys = Object.keys(this.targets).filter(String);
  }

  ngOnInit() {
    this.test();
  }

  test() {
    this.time = new Observable<string>((observer: Observer<string>) => {
      setInterval(() => observer.next(new Date().toString()), 5000);
    });
  }

  translate() {
    this.translation.text = [this.translateForm.value.text];
    this.translation.target = this.translateForm.value.target;
    this.translations = new Observable<any>((observer: Observer<any>) => {
      observer.next(this.translateService.callTranslateLambda(this.translation));
    });

  }

  createForm() {
    this.translateForm = this.fb.group({
      text: ['', Validators.required],
      target: [TargetLanguage.Korean],
    });
  }
}

