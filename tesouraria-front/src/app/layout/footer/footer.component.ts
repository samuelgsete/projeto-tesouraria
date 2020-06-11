import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public year = new Date().getFullYear();
  public icons = [
    'fab fa-facebook',
    'fab fa-instagram',
    'fab fa-youtube',
    'fab fa-whatsapp',
    'fab fa-telegram',
  ];

  constructor() { }

  ngOnInit() {
  }

}
