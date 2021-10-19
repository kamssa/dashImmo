import {Produit} from './Produit';
import {Ville} from './combo/Ville';


export class FlashMaison extends Produit{
  constructor(public id ?: number,
              public version?: number,
              public libelle?: string,
              public description ?: string,
              public path?: string,
              public numero?: string,
              public ville?: Ville,
              public type?: string,
              public surfaceUtile?: string,
              public surfaceTerrain?: string,
              public situationGeographique?: string,
              public flashmaisonType?: string,
              public prix?: number)
  {super(id, version, libelle, description, path, numero, ville, type); }
}
