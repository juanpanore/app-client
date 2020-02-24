import { Component, OnInit } from '@angular/core';
import { Client } from './model/client';
import { FormGroup, FormBuilder , Validators   } from '@angular/forms';
import { ClientService } from '../service/client.service';
import { Config } from 'protractor';





/**
 * Componente encargado de renderizar la vista inicial de la aplicación
 */
@Component({
    selector: 'client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})
export class ClientComponent  implements OnInit{
    public title = 'Management';
    public isCollapsed = false;
    submitted = false;
    dataClient: Client;
    clientForm: FormGroup;


    constructor(private formBuilder: FormBuilder, private clientService: ClientService) { }



    ngOnInit() { 

        this.clientForm = this.formBuilder.group({
            documentType: ['',Validators.required],
            documentNumber: ['',Validators.required],
            firstName: ['',Validators.required],
            secondName: [''],
            lastName :['',Validators.required],
            secondSurname :[''],
            cellphone :[''],
            email: ['', [Validators.required, Validators.email]],
            sex :[''],
            birthDate :[''],
        });

    }

    get f() { return this.clientForm.controls; }

    public getClient(): void {
        

        this.clientService.getClient(this.clientForm.get("documentType").value, this.clientForm.get("documentNumber").value).subscribe(
            response => {
                let answer: Config = response as Config;
                if (answer.status === 200) {
                    this.dataClient = answer ? answer.body as Client : new Client();
                    console.log("answer get {} ", answer.body);

                } else {
                    console.log("Error consultando %s", this.dataClient.documentType.concat(this.dataClient.documentNumber));
                    this.dataClient = undefined;
                }
            }
        );


    }

 

    public saveClient(): void{

        

        if (this.clientForm.invalid) {
            return;
        }
        
        this.dataClient = new Client();
        this.dataClient.documentType = this.clientForm.get("documentType").value;
        this.dataClient.documentNumber = this.clientForm.get("documentNumber").value;
        this.dataClient.firstName = this.clientForm.get("firstName").value;
        this.dataClient.secondName = this.clientForm.get("secondName").value;
        this.dataClient.lastName = this.clientForm.get("lastName").value;
        this.dataClient.secondSurname = this.clientForm.get("secondSurname").value;
        this.dataClient.cellphone = this.clientForm.get("cellphone").value;
        this.dataClient.birthDate = this.clientForm.get("birthDate").value;
        this.dataClient.email = this.clientForm.get("email").value;
        this.dataClient.sex = this.clientForm.get("sex").value;

        console.log("dataClient to save {} ", this.dataClient);


        this.clientService.saveClient(this.dataClient).subscribe(response => {

            let answer: Config = response as Config;
      
            if (answer.status === 200) {
              alert("Save sucess");
              this.clientForm.reset();
            }  else {
                alert("save error");
                //this.clientForm.reset();
            }            
         
          }, error => {
            alert("service save error");

            console.log("error post {} ", error);
           // this.clientForm.reset();
          });
      
        


    } 
}