import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  public noContent = 'no content';
  public newsData = [];
  public noData: any;
  public results = [];
  p: number = 1;
  public loading = false;

  customOptions: OwlOptions = {
    loop: true,
    margin:10,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      768: {
        items: 2
      },
      940: {
        items: 4
      }
    },
  }

  constructor(
    private api: ApiService
  ) { }

  getNews() {
    this.loading = true;
    this.api.getNews().subscribe((results) =>  {
       this.newsData = results.articles;
       this.loading = false;
       //console.log('JSON Response = ', JSON.stringify(results));
       console.log ('News component is connected');
    })
  }

  ngOnInit() {
    this.getNews();
  }

}
