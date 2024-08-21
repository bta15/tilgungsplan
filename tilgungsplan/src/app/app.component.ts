import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TilgungsplanService} from "./service/tilgungsplan.service";
import {MatCard} from "@angular/material/card";
import {TilgungsplanEntry, TilgungsplanResponse} from "./entity/tilgungsplan-response";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell,
  MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {NgIf} from "@angular/common";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {TilgungsplanRequest} from "./entity/tilgungsplan-request";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'de'}, provideNativeDateAdapter()],
  imports: [RouterOutlet, MatCard, MatTable, MatHeaderRow, MatRow, MatCell, MatHeaderCell, MatHint,
    MatColumnDef, NgIf, MatHeaderRowDef, MatRowDef, MatHeaderCellDef, MatCellDef, MatFooterCellDef,
    MatFooterCell, MatFooterRowDef, MatFooterRow, MatFormField, MatInput, MatLabel, MatButton, MatDatepickerToggle, MatDatepicker, MatDatepickerInput, MatIcon, FormsModule, MatIconButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  darlehensbetrag: number = 100000.0;
  sollzinsProzent: number = 2.12;
  startTilgungProzent: number = 2;
  zinsbindungJahre: number = 10;
  startDatum: Date = new Date();

  tilgungsplanResponse: TilgungsplanResponse = {} as TilgungsplanResponse;

  displayedColumns: string[] = ['datum', 'restschuldEuro', 'zinsenEuro', 'tilgungAuszahlungEuro', 'rateEuro'];
  dataSource = new MatTableDataSource<TilgungsplanEntry>(this.tilgungsplanResponse.tilgungsplanMonate);

  constructor(private tilgungsplanService: TilgungsplanService) {

  }

  onClickPlanErstellen(): void {
    const request: TilgungsplanRequest = {
      darlehensbetragEuro: this.darlehensbetrag,
      sollzinsProzent: this.sollzinsProzent,
      anfaenglicheTilgungProzent: this.startTilgungProzent,
      zinsbindungJahre: this.zinsbindungJahre,
      startdatum: this.startDatum
    };
    this.tilgungsplanService.getTilgungsplan(request).subscribe(response => {
      this.tilgungsplanResponse = response;
      this.dataSource = new MatTableDataSource<TilgungsplanEntry>(this.tilgungsplanResponse.tilgungsplanMonate);
    })
  }


}
