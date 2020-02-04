export interface IContact {
  id: number;
  first_name: string;
  last_name: string;
  email: string[];
  phone: string[];
  photo: string;
}

export class Contact implements IContact {
  id: number;
  first_name: string;
  last_name: string;
  email: string[];
  phone: string[];
  photo: string;

  constructor(id: number, first_name: string, last_name: string, email: string[], phone: string[], photo?: string) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.photo = photo;
  }
}
