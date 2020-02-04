import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IContact } from '../interfaces/contact-list.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public contactLists: IContact[];
  public contactListSubject = new BehaviorSubject<IContact[]>([]);

  constructor(private http: HttpClient) {}

  public readJSON(): Observable<any> {
    return this.http.get('./assets/json/contacts.json');
  }

  public saveContactInLocaleStorage(contactList) {
    localStorage.setItem('contacts', JSON.stringify(contactList));
    return new Observable(observer => {
      observer.next(true);
    });
  }

  public getContacts() {
    this.contactListSubject.next(JSON.parse(localStorage.getItem('contacts')));
    if (!this.contactListSubject.getValue()) {
      this.readJSON().subscribe(data => {
        this.contactLists = data;
        this.saveContactInLocaleStorage(this.contactLists);
        this.contactListSubject.next(this.contactLists);
      });
    }

    return new Observable(observer => {
      observer.next(this.contactLists);
    });
  }

  contactListStore(): Observable<any> {
    return this.contactListSubject.asObservable();
  }

  public createContact(model) {
    this.contactLists = this.contactListSubject.getValue();
    model.id = this.contactLists.length;
    model.id++;
    this.contactLists.push(model);
    return this.saveContactInLocaleStorage(this.contactLists);
  }

  getContact(id) {
    this.contactLists = this.contactListSubject.getValue();
    const user = this.contactLists.find(item => item.id === id);
    return new Observable(observer => {
      observer.next(user);
    });
  }

  updateContact(id, model) {
    this.contactLists = this.contactListSubject.getValue();
    model.id = id;
    this.contactLists[id+1] = model;
    return this.saveContactInLocaleStorage(this.contactLists);
  }

  deleteContact(index) {
    this.contactLists = this.contactListSubject.getValue();
    const newContactArray = this.contactLists.filter((element, id) => {
      return id != index;
    });
    return this.saveContactInLocaleStorage(newContactArray);
  }
}
