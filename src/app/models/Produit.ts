import {Ville} from './combo/Ville';

export class Produit {
  constructor(public id ?: number,
              public version?: number,
              public libelle?: string,
              public description ?: string,
              public path?: string,
              public numero?: string,
              public ville?: Ville,
              public type?: string
  ) {
  }
}
