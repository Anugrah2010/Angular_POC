import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
pathParam = true;

constructor(private route: ActivatedRoute, private router: Router) {
}

  ngOnInit(): void {
    console.log(this.router.url);
  }
  routeEffect() {
      this.pathParam = !this.pathParam;
  }
}
