import {Personne} from './Personne';

export class TerrainVendu {
  constructor(
    public id: number,
    public version: number,
    public libelle?: string,
    public paye?: boolean,
    public abonneGeo?: boolean,
    public unite?: string,
    public note?: string,
    public prixParMettreCarre?: string,
    public superficie?: string,
    public surfaceUtilise?: string,
    public description?: string,
    public latitude?: number,
    public longitude?: number,
    public numero?: string,
    public prix?: number,
    public path?: string,
    public nomVille?: string,
    public typeDocument?: string,
    public personne?: Personne
  ) {

  }

}
