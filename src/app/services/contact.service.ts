import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/iGroup';

@Injectable({
  providedIn: 'root'
})

// CRUD Processes
export class ContactService {
  // JSON Server URL
  private serverUrl: string = `http://localhost:9000`;

  constructor(private httpClient: HttpClient) { }

  // Get All Contacts
  public getAllContacts(): Observable<IContact[]>{
    let dataUrl: string = `${this.serverUrl}/contacts`;
    // below will send error if it exists to handleError
    return this.httpClient.get<IContact[]>(dataUrl).pipe(catchError(this.handleError));
  }

  // Get Single Contact
  public getContact(contactId : string): Observable<IContact>{
    let dataUrl : string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataUrl).pipe(catchError(this.handleError));
  }

  // Create a contact
  public createContact(contact : IContact): Observable<IContact>{
    let dataUrl : string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataUrl, contact).pipe(catchError(this.handleError));
  }

  // Update a contact
  public updateContact(contact : IContact, contactId : string): Observable<IContact>{
    let dataUrl : string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataUrl, contact).pipe(catchError(this.handleError));
  }

  // Delete a contact
  public deleteContact(contactId : string): Observable<{}>{
    let dataUrl : string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{ }>(dataUrl).pipe(catchError(this.handleError));
  }

  // Get All Groups
  public getAllGroups(): Observable<IGroup[]>{
    let dataUrl: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataUrl).pipe(catchError(this.handleError));
  }

  // Get Single Group
  public getGroup(contact : IContact): Observable<IGroup>{
    let dataUrl : string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup>(dataUrl).pipe(catchError(this.handleError));
  }

  // Error Handling
  public handleError(error:HttpErrorResponse){
    let errorMessage:string = '';
    if(error.error instanceof ErrorEvent) {
      //client error
      errorMessage = `Error : ${error.error.message}`
    }
    else{
      //server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
