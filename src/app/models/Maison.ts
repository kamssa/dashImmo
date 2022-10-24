import {Ville} from './combo/Ville';
import {Produit} from './Produit';

export class Maison extends Produit {
  constructor(public id ?: number,
              public version?: number,
              public libelle?: string,
              public description ?: string,
              public prix?: number,
              public superficie?: string,
              public nbreChambre?: number,
              public nbreSalleEau?: number,
              public nbreCuisine?: number,
              public nbreSaleMange?: number,
              public nbreBuanderie?: number,
              public nbreTerrasse?: number,
              public  situationGeographique?: string,
	            public maisonType?: string,
	            public typeVente?: string,
              public type?: string
              )
   {
     super(id, version, libelle, description, type);
     }
}
