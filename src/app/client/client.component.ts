import { Component, OnInit } from '@angular/core';
import { Client } from './model/client';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
export class ClientComponent implements OnInit {
    public title = 'Client Management';
    public isCollapsed = false;
    submitted = false;
    dataClient: Client;
    clientForm: FormGroup;


    constructor(private formBuilder: FormBuilder, private clientService: ClientService) { }



    ngOnInit() {

        this.dataClient = new Client();

        this.clientForm = this.formBuilder.group({
            documentType: ['', Validators.required],
            documentNumber: ['', Validators.required],
            firstName: ['', Validators.required],
            secondName: [''],
            lastName: ['', Validators.required],
            secondSurname: [''],
            cellphone: [''],
            email: ['', [Validators.required, Validators.email]],
            sex: [''],
            birthDate: [''],
        });

    }

    get f() { return this.clientForm.controls; }

    public transformDocumentType( documentType ): void {

        if (documentType === 'N'){
            documentType='A';
        }
        console.log("transform {} ", documentType);

     return documentType;
    }

    public getClient(): void {
        
        let documentType = this.transformDocumentType(this.clientForm.get("documentType").value);

        console.log("new documentType {} ", documentType);


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



    public saveClient(): void {



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
            } else {
                alert("save error");
                //this.clientForm.reset();
            }

        }, error => {
            alert("service save error" + error);

            console.log("error post {} ", error);
            // this.clientForm.reset();
        });

    }

    public updateClient(): void {

        if (this.dataClient.id) {

            let clientId = this.dataClient.id
            this.dataClient.documentType =   this.clientForm.get("documentType").value ? this.clientForm.get("documentType").value : this.dataClient.documentType;
            this.dataClient.documentNumber = this.clientForm.get("documentNumber").value ? this.clientForm.get("documentNumber").value : this.dataClient.documentNumber;
            this.dataClient.firstName = this.clientForm.get("firstName").value ? this.clientForm.get("firstName").value : this.dataClient.firstName;
            this.dataClient.secondName = this.clientForm.get("secondName").value ? this.clientForm.get("secondName").value : this.dataClient.secondName;
            this.dataClient.lastName = this.clientForm.get("lastName").value ? this.clientForm.get("lastName").value : this.dataClient.lastName;
            this.dataClient.secondSurname = this.clientForm.get("secondSurname").value ? this.clientForm.get("secondSurname").value : this.dataClient.secondSurname;
            this.dataClient.cellphone = this.clientForm.get("cellphone").value ? this.clientForm.get("cellphone").value : this.dataClient.cellphone;
            this.dataClient.birthDate = this.clientForm.get("birthDate").value ? this.clientForm.get("birthDate").value : this.dataClient.birthDate;
            this.dataClient.email = this.clientForm.get("email").value ? this.clientForm.get("email").value : this.dataClient.email;
            this.dataClient.sex = this.clientForm.get("sex").value ? this.clientForm.get("sex").value : this.dataClient.sex;


            this.clientService.updateClient(clientId, this.dataClient).subscribe(response => {
                let answer: Config = response as Config;

                if (answer.status === 200) {
                    alert("Update sucess");
                } else {
                    alert("Update error");
                }

            }, error => {

                alert("service update error:" + error);

                console.log("error update {} ", error);

            });
        }

    }

    public deleteClient(): void {

        if (this.dataClient.id) {

            this.clientService.deleteClient(this.dataClient.id).subscribe(response => {
                let answer: Config = response as Config;

                if (answer.status === 200) {
                    alert("Delete sucess");
                    this.clientForm.reset();

                } else {
                    alert("Delete error");
                }

            }, error => {

                alert("service delete error:" + error);

                console.log("error delete {} ", error);

            });
        }

    }
}