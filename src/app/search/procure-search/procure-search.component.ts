import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MaterialFormModel } from 'src/app/shared/models/materialModel';
import { MatDialog } from '@angular/material/dialog';
import { ProcureUpdateEntryModalComponent } from './procure-update-entry-modal/procure-update-entry-modal.component';

@Component({
  selector: 'app-procure-search',
  templateUrl: './procure-search.component.html',
  styleUrls: ['./procure-search.component.scss']
})
export class ProcureSearchComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, public dialog: MatDialog) { }
  displayedColumns: string[] = ['company', 'product', 'price', 'units', 'payment', 'email', 'geography', 'edit'];
  fetchArray: MaterialFormModel[];
  fetchArrayUrl = 'http://localhost:3000/getProcureArray';
  deleteEntryUrl = 'http://localhost:3000/deleteProcureEntry';
  postUpdateUrl = 'http://localhost:3000/post';
  dataSource: MatTableDataSource<MaterialFormModel>;
  input;

  ngOnInit(): void {
      this.getFetchArray();
      this.dataSource = new MatTableDataSource(this.fetchArray);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  routeBack() {
    this.router.navigate(['/search']);
  }
  getFetchArray() {
      this.http.get(this.fetchArrayUrl).subscribe((res: any[] ) => {
      console.log(res);
      console.log(JSON.stringify(res));
      this.fetchArray = res;

    });
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
  postUpdatedArray(array) {
    this.http.post(this.postUpdateUrl, array).subscribe((res) => {
      console.log(res);
    });

  }
  openDialog(index): void {
    const dialogRef = this.dialog.open(ProcureUpdateEntryModalComponent, {
      height: '700px',
      width: '550px',
      data: { object: this.fetchArray[index], input: this.input}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchArray[index] = result;
      console.log(this.fetchArray[index]);
      this.postUpdatedArray(this.fetchArray);
    });
  }

}
