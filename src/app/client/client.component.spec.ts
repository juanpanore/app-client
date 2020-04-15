import { TestBed, async , ComponentFixture  } from '@angular/core/testing';
import { ClientComponent } from './client.component';
import { ReactiveFormsModule , FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

describe('ClientComponent', () => {

  let component: ClientComponent;


  beforeEach(async(() => {
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
      const fixture = TestBed.createComponent(ClientComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      fixture.detectChanges();
  })

  it('Debe crear componente client', () => {
    expect(component).toBeTruthy();
  });

  it ('Debe transformar tipo documento N', () => {
    let tipoDocumento = component.transformDocumentType("N");
    expect(tipoDocumento).toBe("A");
  }); 

  it ('Debe validar formulario cliente invalido si está vacío', () => {
    expect(component.clientForm.valid).toBeFalsy();
  });

  it ('Debe validar campo email', () => {
    let errors = {};
    let email = component.clientForm.controls['email'];
    expect(email.valid).toBeFalsy();    

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();


    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });
 
  it ('Debe validar campo primer nombre',() => {

    let errors = {};
    let firstName = component.clientForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();   
    
    firstName.setValue("Juan");
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();

  });

});
