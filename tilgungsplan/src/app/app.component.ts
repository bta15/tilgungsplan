import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TilgungsplanService} from "./service/tilgungsplan.service";
import {MatCard} from "@angular/material/card";
import {TilgungsplanEntry, TilgungsplanResponse} from "./entity/tilgungsplan-response";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {NgIf} from "@angular/common";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {TilgungsplanRequest} from "./entity/tilgungsplan-request";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'LL',
//     monthYearLabel: 'M.YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'D.M.YYYY',
//   },
// };


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    RouterOutlet, MatCard, MatHint, NgIf, MatFormField, MatLabel, MatButton, MatIcon, MatIconButton, MatMiniFabButton,
    MatDatepickerModule, MatInputModule, MatTableModule, FormsModule,
  ],
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
    //TODO: Es wird immer DatePicker-Startdatum - 1 Tag geschickt! Warum?
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

  onClickPrintTable(): void {
    //TODO: als PDF drucken später implementieren
    console.log("Als PDF drucken (noch nicht implementiert)")
  }


}
