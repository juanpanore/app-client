import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

describe ('AppComponent', () => {

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ClientComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
      ]
    }).compileComponents();
  }))

  it('Debe crear app',() => {
     const fixture = TestBed.createComponent(AppComponent);
     const app = fixture.debugElement.componentInstance;
     expect (app).toBeTruthy();

  });

});