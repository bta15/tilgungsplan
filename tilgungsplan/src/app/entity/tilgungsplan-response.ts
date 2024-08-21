export interface TilgungsplanResponse {
  tilgungsplanMonate: TilgungsplanEntry[],
  tilgungsplanEnde: TilgungsplanEnd
}

export interface TilgungsplanEntry {
  datum: Date,
  restschuldEuro: number,
  zinsenEuro: number,
  tilgungAuszahlungEuro: number,
  rateEuro: number
}

export interface TilgungsplanEnd {
  restschuldEuro: number,
  zinsenEuro: number,
  tilgungAuszahlungEuro: number,
  rateEuro: number
}
