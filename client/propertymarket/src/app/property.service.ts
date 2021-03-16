import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Property } from './property';
import { MessageService } from './message.service';




@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private propertiesURL = 'http://127.0.0.1:8000/markets';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(this.propertiesURL).pipe(
      tap(_ => this.log('fetched properties')),
      catchError(this.handleError<Property[]>('getProperties', []))
    );
  }

  getPropertyNo404<Data>(id: number): Observable<Property>{
    const url = `${this.propertiesURL}/?id=${id}`;
    return this.http.get<Property[]>(url).pipe(
      map(properties => properties[0]),
      tap(h => {
        const outcome = h ? `fetched`: `did not find`;
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Property>(`getProperty id=${id}`))
    );
  }

  getProperty(id: number): Observable<Property>{
    const url = `${this.propertiesURL}/${id}`;
    return this.http.get<Property>(url).pipe(
      tap(_ =>this.log(`fetched property id=${id}`)),
      catchError(this.handleError<Property>(`getProperty id=${id}`))
    )
  }

  searchProperties(term: string): Observable<Property[]>{
    if (!term.trim()){
      return of([]);
    }
    return this.http.get<Property[]>(`${this.propertiesURL}/suburb/?search=${term}`).pipe(
      tap(x => x.length ?
      this.log(`found properties matching "${term}"`):
      this.log(`no properties matching "${term}" `)),
      catchError(this.handleError<Property[]>('searchProperties', []))

    )
  }

  addProperty(property: Property): Observable<Property>{
    return this.http.post<Property>(this.propertiesURL, property, 
    this.httpOptions).pipe(
      tap((newProperty: Property) => this.log(`added propery w/ id=${newProperty.id}`)),
      catchError(this.handleError<Property>('addProperty'))
    );
  }

  deleteProperty(property: Property | number): Observable<Property>{
    const id = typeof property === 'number' ? property : property.id;
    const url = `${this.propertiesURL}/${id}`;

    return this.http.delete<Property>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted property id=${id}`)),
      catchError(this.handleError<Property>('deleteProperty'))
    );
  }

  updateProperty(property: Property): Observable<any>{
    return this.http.put(`${this.propertiesURL}/${property.id}`, property, 
    this.httpOptions).pipe(
      tap(_ => this.log(`updated property id=${property.id}`)),
      catchError(this.handleError<any>('updateProperty'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T){

    return (error: any): Observable<T> =>{
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  private log(message: string){
    this.messageService.add(`PropertyService: ${message}`)
  }

}
