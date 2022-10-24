import {Document} from './Document';
import {Produit} from './Produit';
import {Ville} from './combo/Ville';

export class FlashTerrain extends Produit {
  constructor(public id?: number,
              public version?: number,
              public  libelle?: string,
              public surfaceUtile?: string,
              public surfaceTerrain?: string,
              public situationGeographique?: string,
              public flashmaisonType?: string,
              public prix?: number,
              public description ?: string,
              public numero?: string,
              public ville?: Ville,
              public document?: Document,
              public type?: string) {
    super(id, version, libelle, description, numero, ville, document, type);
  }
}
