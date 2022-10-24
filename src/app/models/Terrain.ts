import {Document} from './Document';
import {Produit} from './Produit';
import {Ville} from './combo/Ville';

export class Terrain extends Produit {
  constructor
  (
  public id?: number,
  public version?: number,
  public  libelle?: string,
  public note?: string,
  public prixParMettreCarre?: string,
  public superficie?: string,
  public surfaceUtilise?: string,
  public description?: string,
  public numero?: string,
  public prix?: number,
  public typeVente?: string,
  public  ville?: Ville,
  public  document?: Document,
  public type?: string)
   {
    super(id, version, libelle, description, numero, ville, document, type);
  }
}
