import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { FormsModule } from '@angular/forms';



/**
 * Arreglo donde se asigna una ruta a un componente específico
 */
const ADMIN_ROUTES: Routes = [
  { path: '', component: ClientComponent }
];

/**
 * Modulo que incluye los componentes del ejemplo
 */
@NgModule({
  imports: [
    RouterModule.forChild(ADMIN_ROUTES),
    FormsModule
    ],
  exports: [
    RouterModule,
  ],
  declarations: [
    ClientComponent
  ]   
})
export class ClientModule { }
