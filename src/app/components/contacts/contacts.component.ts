import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { IContact } from 'src/app/interfaces/contact-list.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {
  public contactLists: IContact;
  public contactListSubs: Subscription;

  constructor(private contactService: ContactService) {
    this.contactListSubs = this.contactService.contactListStore().subscribe(res => {
      if (res) {
        this.contactLists = res;
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.contactListSubs.unsubscribe();
  }
}
