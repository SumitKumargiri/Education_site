// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-adminheaderbar',
//   templateUrl: './adminheaderbar.component.html',
//   styleUrl: './adminheaderbar.component.css'
// })
// export class AdminheaderbarComponent {


// }


import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-adminheaderbar',
    templateUrl: './adminheaderbar.component.html',
    styleUrl: './adminheaderbar.component.css'
  })
  export class AdminheaderbarComponent  implements OnInit {

  username: string | null = null;
  constructor() { }

  ngOnInit(): void {
    this.getUsernameFromLocalStorage();
  }

  getUsernameFromLocalStorage(): void {
    this.username = localStorage.getItem('username');
  }

}

