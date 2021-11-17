import { Personne } from './Personne';
import { Employe } from './Employe';
import { Versement } from './Versement';
export class DetailVersement{
  constructor(
    public id?: number,
    public version?: number,
    public date?: Date,
    public libelle?: string,
    public montantVerse?: number,
    public versement?: Versement,
    public personne?: Personne,
    public employe?: Employe
  ){

  }
}
