import {Produit} from './Produit';
import {Personne} from './Personne';

export class Demande {
  constructor(public id?: number,
              public version?: number,
              public produitId?: number,
              public nomComplet?: string,
              public email?: string,
              public code?: string,
              public telephone?: string,
              public selectionner?: any,
              public message?: string,
              public lu?: string) {
  }
}
