import { Employe } from './Employe';
import { Personne } from './Personne';
export class Versement{
  constructor(
    public id?: number,
    public version?: number,
    public date?: Date,
    public libelle?: string,
    public solde?: number,
    public reste?: number,

  ){

  }
}
