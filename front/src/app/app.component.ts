import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private router: Router
  ) {

  }
  ngOnInit(): void {
  }

  pagina(ruta): void {
    this.router.navigateByUrl(ruta);
    this.close();
  }

  close() {
    this.sidenav.close();
  }


}
