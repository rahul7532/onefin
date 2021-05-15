import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private moviesUrl = 'https://demo.credy.in/api/v1/maya/movies/';

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<any>(this.moviesUrl)
    .pipe(catchError(this.handleError));
  }

private handleError(errorResponse:HttpErrorResponse){
  if(errorResponse.error instanceof ErrorEvent){
    console.error('Client Side Error',errorResponse.error.message)
  }
  else{
    console.error('Server Side Error',errorResponse)
  }
  return throwError('There is a problem with the service ')
}

findAll(page:number,size:number):Observable<MovieData>{
 
 let params= new HttpParams();
 params=params.append('page',String(page));
 params=params.append('limit',String(size));

  return this.http.get(this.moviesUrl,{params}).pipe(
    map((movieData:any)=>movieData),
    catchError(err=>throwError(err))
  )
}



}
export interface MovieData {
  filter: string;
  results: Movie[];
  count: number;
  next: string;
  previous: string;
}
