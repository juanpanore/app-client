import { TestBed, async  } from '@angular/core/testing';
import { ClientComponent } from './client.component';
import { ReactiveFormsModule , FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


describe ('ClientComponent', () => {

  let component: ClientComponent;

  beforeEach (async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClientComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ]
  }).compileComponents();
}))

beforeEach (() =>{
  const fixture = TestBed.createComponent(ClientComponent);
  component = fixture.componentInstance;
  component.ngOnInit();
  fixture.detectChanges();
});

it('Debe crear componente',() =>{
  expect(component).toBeTruthy();
});

/*it ('Debe transformar tipo documento N', () =>{
    let tipoDocumento = component.transformDocumentType('N');
    expect (tipoDocumento).toBe('A');
    expect (tipoDocumento).not.toBe ('C');
});*/

it ('Debe validar formulario si esta  vacio sea invalido', () => {
  expect(component.clientForm.valid).toBeFalsy;
});

it( 'Debe validar campor email', () => {
  let errors={};
  let email = component.clientForm.controls['email'];
  expect(email.valid).toBeFalsy();
  
  errors = email.errors || {};
  expect (errors['required']).toBeTruthy();
  
  email.setValue("test@example.com");
  errors = email.errors || {};

  expect(errors['required']).toBeFalsy();
  expect(errors['email']).toBeFalsy();
  
});





});