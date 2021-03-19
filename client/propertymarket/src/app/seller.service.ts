import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of} from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';

import { Seller } from './seller';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private sellerUrl = 'http://127.0.0.1:8000/sellers'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  
  getSellers(): Observable<Seller[]>{
    return this.http.get<Seller[]>(this.sellerUrl).pipe(
      tap(_ => this.log('fetched sellers')),
      catchError(this.handleError<Seller[]>('getSellers', []))
    );
  }

  
  getSellerNo404<Data>(id: number): Observable<Seller> {
    const url = `${this.sellerUrl}/?id=${id}`;
    return this.http.get<Seller[]>(url).pipe(
      map(sellers => sellers[0]), tap(s =>{
        const outcome = s ? `fetched` : `did not find`;
        this.log(`${outcome} seller id=${id}`);
      }),
      catchError(this.handleError<Seller>(`getSeller id=${id}`))
    );
  }

  getSeller(id: number): Observable<Seller> {
    const url = `${this.sellerUrl}/${id}`;
    return this.http.get<Seller>(url).pipe(
      tap(_ => this.log(`fetched seller id=${id}`)),
      catchError(this.handleError<Seller>(`getSeller id=${id}`))
    )
  }

  searchSellers(term: string): Observable<Seller[]>{
    if (!term.trim()){
      return of([]);
    }
    return this.http.get<Seller[]>(`${this.sellerUrl}/name/?search=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found sellers matching "${term}"`):
        this.log(`no sellers matching "${term}" `)),
      catchError(this.handleError<Seller[]>('searchSellers', [])) 
    )
  }

  addSeller(seller: Seller): Observable<Seller>{
    return this.http.post<Seller>(this.sellerUrl, seller, this.httpOptions).pipe(
      tap((newSeller: Seller) => this.log(`added seller w/ id=${newSeller.id}`)),
      catchError(this.handleError<Seller>('addSeller'))
    );
  }

  deleteSeller(seller: Seller | number): Observable<Seller>{
    const id = typeof seller === 'number' ? seller : seller.id;
    const url = `${this.sellerUrl}/${id}`;

    return this.http.delete<Seller>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted seller id=${id}`)),
      catchError(this.handleError<Seller>('deleteSeller'))
    );
  }

  updateSeller(seller: Seller): Observable<any>{
    return this.http.put(`${this.sellerUrl}/${seller.id}`, seller, this.httpOptions).pipe(
      tap(_ => this.log(`updated seller id=${seller.id}`)),
      catchError(this.handleError<any>('updateSeller'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> =>{
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string){
    this.messageService.add(`SellerService: ${message}`);
  }

}
