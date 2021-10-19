import { Employe } from './Employe';
import { TerrainVendu } from './TerrainVendu';
export class Versement{
  constructor(
    public id: number,
    public version: number,
    public date: Date,
    public libelle: string,
    public montantVerse: number,
    public solde: number,
    public terrainVendu: TerrainVendu,
    public employe: Employe
  ){

  }
}
