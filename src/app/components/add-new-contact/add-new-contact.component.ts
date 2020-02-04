import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.scss']
})
export class AddNewContactComponent implements OnInit {
  public form: FormGroup;
  first_name: FormControl;
  last_name: FormControl;
  public emailList: FormArray;
  public phoneList: FormArray;

  get emailsFormGroup() {
    return this.form.get('email') as FormArray;
  }

  get phonesFormGroup() {
    return this.form.get('phone') as FormArray;
  }

  // get firstName() {
  //   return this.form.get('first_name');
  // }
  // get lastName() {
  //   return this.form.get('last_name');
  // }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: this.fb.array([this.createEmailField()]),
      phone: this.fb.array([this.createPhoneField()])
    });

    this.emailList = this.form.get('email') as FormArray;
    this.phoneList = this.form.get('phone') as FormArray;
  }

  createEmailField(): FormGroup {
    return this.fb.group({
      email: [null, Validators.compose([Validators.required])]
    });
  }

  createPhoneField(): FormGroup {
    return this.fb.group({
      phone: [null, Validators.compose([Validators.required])]
    });
  }

  addEmail() {
    this.emailList.push(this.createEmailField());
  }

  addPhone() {
    this.phoneList.push(this.createPhoneField());
  }

  removeEmail(index) {
    this.emailList.removeAt(index);
  }
  removePhone(index) {
    this.phoneList.removeAt(index);
  }

  getEmailsFormGroup(index): FormGroup {
    const emailsFormGroup = this.emailList.controls[index] as FormGroup;
    return emailsFormGroup;
  }

  getPhonesFormGroup(index): FormGroup {
    const emailsFormGroup = this.phoneList.controls[index] as FormGroup;
    return emailsFormGroup;
  }

  submit() {
    const model = this.formatFormFields(this.form.value);
    this.contactService.createContact(model).subscribe(res => {
      if (res) {
        this.contactService.getContacts();
        this.router.navigate(['/contacts']);
      }
    });
  }

  formatFormFields(formFeilds) {
    const email = [];
    const phone = [];
    if (formFeilds.email && formFeilds.email.length) {
      formFeilds.email.forEach(element => {
        email.push(element.email);
      });
    }
    if (formFeilds.phone && formFeilds.phone.length) {
      formFeilds.phone.forEach(element => {
        phone.push(element.phone);
      });
    }

    return {
      first_name: formFeilds.first_name,
      last_name: formFeilds.last_name,
      email,
      phone
    };
  }
}
