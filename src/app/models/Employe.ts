import {Adresse} from './Adresse';
import {Personne} from './Personne';
import {Departement} from './Departement';
import {Role} from './Role';


export class Employe extends Personne{
  constructor(public id ?: number,
              public version?: number,
              public titre?: string,
              public nom ?: string,
              public prenom ?: string,
              public email ?: string,
              public password ?: string,
              public fonction ?: string,
              public nomComplet ?: string,
              public adresse ?: Adresse,
              public actived?: boolean,
              public departement?: Departement,
              public  type?: string,
              public roles?: []) {
    super(id, version, titre, nom, prenom, email, password, fonction, nomComplet, adresse, actived, type, roles);
  }


}
