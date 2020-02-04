import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AddEditContactComponent } from './components/add-edit-contact/add-edit-contact.component';


const routes: Routes = [
  { path: 'contacts', component: ContactsComponent },
  { path: 'add-contact', component: AddEditContactComponent },
  { path: 'edit-contact/:id', component: AddEditContactComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
