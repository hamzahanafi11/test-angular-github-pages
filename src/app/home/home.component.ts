import { HomeService } from './home.service';
import { ApiService } from './../@core/api.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    /*
    this.isLoading = true;
    this.homeService
      .getAllUsers()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (res) => {
          console.log('getAllUsers', res);
          this.quote = res.body;
        },
        (error) => {
          console.log('getAllUsers error', error);
        }
      );
      */
  }
}
