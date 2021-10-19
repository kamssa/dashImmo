import {TerrainVendu} from './TerrainVendu';
import {Personne} from './Personne';

export class Paiement {
  constructor(
    public id?: number,
    public version?: number,
    public montantVerse?: number,
    public resteapaye?: number,
    public date?: Date,
    public terrainVendu?: TerrainVendu,
    public personne?: Personne
  ) {
  }
}
