import {Ville} from './combo/Ville';
import {Document} from './Document';

export class Produit {
  constructor(public id ?: number,
              public version?: number,
              public libelle?: string,
              public description ?: string,
              public numero?: string,
              public ville?: Ville,
              public document?: Document,
              public type?: string
  ) {
  }
}
