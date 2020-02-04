import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewContactComponent } from './components/add-new-contact/add-new-contact.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';


const routes: Routes = [
  { path: 'contacts', component: ContactsComponent },
  { path: 'add-contact', component: EditContactComponent },
  { path: 'edit-contact/:id', component: EditContactComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
