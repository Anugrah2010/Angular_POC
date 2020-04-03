import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MaterialFormModel } from 'src/app/home/materialModel';
import * as io from 'socket.io-client';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-procure-search',
  templateUrl: './procure-search.component.html',
  styleUrls: ['./procure-search.component.scss']
})
export class ProcureSearchComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  displayedColumns: string[] = ['company', 'product', 'price', 'units', 'payment', 'email', 'geography'];
  fetchArray: MaterialFormModel[];
  fetchArrayUrl = 'http://localhost:3000/getArray';
  dataSource: MatTableDataSource<MaterialFormModel>;


  ngOnInit(): void {
    this.http.get(this.fetchArrayUrl).subscribe((res: any[] ) => {
      console.log(res);
      console.log(JSON.stringify(res));
      this.fetchArray = res;
      this.dataSource = new MatTableDataSource(res);
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  routeBack() {
    this.router.navigate(['/search']);
  }
}
