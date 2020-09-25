import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  @Input() languages: any[];

  constructor() { }

  ngOnInit(): void {

  }
}
