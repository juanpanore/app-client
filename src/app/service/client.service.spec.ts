import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from '../client/model/client';


describe('ClientService', () => {

  const clientUrl = environment.client;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ClientService]

    })
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ClientService);
  });

  it('Debe crear servicio',() => {
   expect(service).toBeTruthy();
  });

  it('Debe retornar datos del cliente',() =>{

    const clientMock = [{
      "id": "5e50b8cb0098b3714122070e",
      "documentType": "C",
      "documentNumber": "1040039865",
      "firstName": "juan",
      "secondName": "pablo",
      "lastName": "norena",
      "secondSurname": "blandon",
      "sex": "M",
      "birthDate": "1985-02-19T00:00:00.000+0000",
      "email": "juanpanore@gmail.com",
      "cellphone": 3045476464,
      "createdDate": "2020-02-22T05:14:51.080+0000",
      "modifiedDate": "2020-02-22T05:14:51.080+0000"
  }];

  const params = '?documentType=C&documentNumber=1040039865'
  let dataError, dataResp;

  service.getClient('C', '1040039865')
  .subscribe (response => {
    dataResp = response;
  }, error => {
    dataError = error;
  });

  const req = httpTestingController.expectOne(`${clientUrl}${params}`);
  req.flush(clientMock);
  console.log(dataResp);

  expect(dataResp.body.length).toEqual(1);
  expect(req.request.method).toEqual('GET');
  expect (dataError).toBeUndefined();
  expect( dataResp.body[0].id).toBe ('5e50b8cb0098b3714122070e');
  expect( dataResp.body[0].documentType).toBe ('C');
  expect( dataResp.body[0].documentNumber).toBe ('1040039865');
  expect( dataResp.body[0].firstName).toBe ('juan');
  expect( dataResp.body[0].secondName).toBe ('pablo');
  expect( dataResp.body[0].lastName).toBe ('norena');
  expect( dataResp.body[0].secondSurname).toBe ('blandon');
  expect( dataResp.body[0].birthDate).toBe ('1985-02-19T00:00:00.000+0000');
  expect( dataResp.body[0].sex).toBe ('M');
  expect( dataResp.body[0].cellphone).toBe (3045476464);
  expect( dataResp.body[0].createdDate).toBe ('2020-02-22T05:14:51.080+0000');
  expect( dataResp.body[0].modifiedDate).not.toBe (null);

  });

});
