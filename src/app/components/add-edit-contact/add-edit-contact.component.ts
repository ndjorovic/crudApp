import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { IContact, Contact } from 'src/app/interfaces/contact-list.interface';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.scss']
})
export class AddEditContactComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private id: number;
  private formType: string
  private routeSubscribe: Subscription;
  private contactListsubs: Subscription;

  get emailsFormGroup() {
    return this.form.get('emails') as FormArray;
  }

  get phonesFormGroup() {
    return this.form.get('phones') as FormArray;
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emails: new FormArray([], Validators.required),
      phones: new FormArray([], Validators.required)
    });

    this.routeSubscribe = this.route.params.subscribe(params => {
      this.id = Number(params.id);
      if ((this.id)) {
        this.getContact();
        this.formType = 'update';
      } else {
        this.formType = 'create';
        this.addEmail();
        this.addPhone();
      }
    });
  }

  ngOnInit() {}

  addEmail(value: string = '') {
    this.emailsFormGroup.push(new FormControl(value, Validators.required));
  }

  addPhone(value: string = '') {
    this.phonesFormGroup.push(new FormControl(value, Validators.required));
  }

  removeEmail(index) {
    this.emailsFormGroup.removeAt(index);
  }

  removePhone(index) {
    this.phonesFormGroup.removeAt(index);
  }

  submit() {
    const formValues = this.form.getRawValue();
    const model = new Contact(
      this.id,
      formValues.firstName,
      formValues.lastName,
      formValues.emails,
      formValues.phones
    );
    if (isNaN(this.id)) {
      this.contactService
        .createContact(model)
        .subscribe(res => this.redirectToContacts());
    } else {
      this.contactService
        .updateContact(model.id, model)
        .subscribe(res => this.redirectToContacts());
    }
  }

  redirectToContacts() {
    this.contactService.getContacts();
    this.router.navigate(['/contacts']);
  }

  private getContact() {
    this.contactListsubs = this.contactService
      .getContact(this.id)
      .subscribe((res: IContact) => {
        if (res) {
          this.form.patchValue({
            firstName: res.first_name,
            lastName: res.last_name
          });
          res.email.forEach(mail => this.addEmail(mail));
          res.phone.forEach(phone => this.addPhone(phone));
        }
      });
  }

  deleteContact() {
    this.contactService.deleteContact(this.id).subscribe(res => {
      if (res) {
        this.contactService.getContacts();
        this.router.navigate(['/contacts']);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSubscribe) {
      this.routeSubscribe.unsubscribe();
    }
    if (this.contactListsubs) {
      this.contactListsubs.unsubscribe();
    }
  }
}
