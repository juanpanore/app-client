import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../client/model/client';

const clientUrl = environment.client;


@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(private http: HttpClient) { }
    public getClient(documentType: string,documentNumber:string ): Observable<Object> {

        let params = {
            "documentType": documentType,
            "documentNumber":documentNumber,
        };

        return this.http.get(`${clientUrl}`, { params, observe: 'response' });
    }

    public saveClient (client : Client ): Observable<Object> {

        return this.http.post(`${clientUrl}`, client, { observe: 'response' });

    }
}