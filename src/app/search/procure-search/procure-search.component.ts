import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MaterialFormModel } from 'src/app/home/materialModel';

@Component({
  selector: 'app-procure-search',
  templateUrl: './procure-search.component.html',
  styleUrls: ['./procure-search.component.scss']
})
export class ProcureSearchComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  displayedColumns: string[] = ['company', 'product', 'price', 'units', 'payment', 'email', 'geography', 'edit'];
  fetchArray: MaterialFormModel[];
  fetchArrayUrl = 'http://localhost:3000/getProcureArray';
  deleteEntryUrl = 'http://localhost:3000/deleteProcureEntry';
  dataSource: MatTableDataSource<MaterialFormModel>;


  ngOnInit(): void {
    this.http.get(this.fetchArrayUrl).subscribe((res: any[] ) => {
      console.log(res);
      console.log(JSON.stringify(res));
      this.fetchArray = res;
      this.dataSource = new MatTableDataSource(this.fetchArray);

    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  routeBack() {
    this.router.navigate(['/search']);
  }
  refreshRows() {
    this.ngOnInit();
  }
  deleteEntry(index) {
    this.fetchArray.splice(index, 1);
    console.log(this.fetchArray);
    this.http.post(this.deleteEntryUrl, this.fetchArray).subscribe( res => {
      console.log(res);
      this.refreshRows();
    });
  }
}
