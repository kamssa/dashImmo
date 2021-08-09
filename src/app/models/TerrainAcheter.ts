import {Produit} from './Produit';
import {Personne} from './Personne';
import {DetailTerrain} from './DetailTerrain';

export class TerrainAcheter {
  constructor(public id?: number,
              public version?: number,
              public detailTerrain?: DetailTerrain,
              public personne?: Personne) {
  }
}
