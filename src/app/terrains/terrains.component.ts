import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Terrain} from '../models/Terrain';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogConfirmService} from '../helper/dialog-confirm.service';
import {AddTerrainsComponent} from './add-terrains/add-terrains.component';
import {UpdateTerrainsComponent} from './update-terrains/update-terrains.component';
import {TerrainService} from '../service/terrain.service';

@Component({
  selector: 'app-terrains',
  templateUrl: './terrains.component.html',
  styleUrls: ['./terrains.component.scss']
})
export class TerrainsComponent implements OnInit {

  constructor() {
  }
  ngOnInit(): void {

  }
}
