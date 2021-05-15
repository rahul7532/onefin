// import { Component, OnInit, Output } from '@angular/core';
import { MovieData, MoviesService } from '../services/movies.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LoginService } from '../services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// import * as EventEmitter from 'events';

// import { from, Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CardModalComponent } from '../modals/card-modal/card-modal.component';
// import { Subject } from 'rxjs/Subject';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  share,
  mergeMap,
  tap,
  catchError,
  filter,
} from 'rxjs/operators';

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { Subject, Observable, of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader/loader.service';

import { fromEvent } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';




@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  @ViewChild('movieSearchInput', { static: true }) movieSearchInput: ElementRef;
  apiResponse: any;
  isSearching: boolean;

  isDarkTheme: boolean = true;
  @HostBinding('class') className = '';
  toggleControl = new FormControl(false);

  results$: Observable<string>;

  movies: any = [];
  limit: any;
  NA: string;
  public data: any = [];

  demo: string;

  sendValue: string;
  description: string;
  genres: string;

  dataSource: MovieData;
  pageEvent: PageEvent;

  public loading: boolean;
  public paginationElements: any;
  public errorMessage: any;
  public page: any;

  constructor(
    private moviesService: MoviesService,
    public loginService: LoginService,
    private dialog: MatDialog,
    // private searchService: SearchService,
    public loaderService: LoaderService,
    private httpClient: HttpClient
  ) {
    this.isSearching = false;
    this.apiResponse = [];

    // console.log(this.movieSearchInput);
  }

  ngOnInit(): void {
    // console.log('res$', this.results$);
    // this.search();
    this.fetchData();
    this.initDataSource();
    // this.searchService.search(this.searchTerm$).subscribe((results) => {
    //   this.results$ = results.results;
    //   console.log("res$",this.results$);
    // });

    this.toggleControl.valueChanges.subscribe((val) => {
      this.className = val ? 'darkMode' : '';
    });

    // console.log(this.movieSearchInput);

    fromEvent(this.movieSearchInput.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        // if character length greater then 2
        filter((res) => res.length > 2),

        // Time in milliseconds between key events
        debounceTime(250),

        // If previous query is diffent from current
        distinctUntilChanged()

        // subscription for response
      )
      .subscribe((text: string) => {
        this.isSearching = true;

        this.searchGetCall(text).subscribe(
          (res: any) => {
            // console.log('res', res);
            this.isSearching = false;
            this.apiResponse = res;
          },
          (err: any) => {
            this.isSearching = false;
            // console.log('error', err);
          }
        );
      });
  }
  baseurl:String='https://demo.credy.in/api/v1/maya/movies/';
  searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
  
    return this.httpClient.get(`${this.baseurl}?q=${term}`);
  }

  initDataSource() {
    this.moviesService
      .findAll(1, 10)
      .pipe(
        tap((movies) => {}),
        map((movieData: MovieData) => (this.dataSource = movieData))
      )
      .subscribe();
  }

  // ngOnDestroy(): void {
  //   this.searchTerm$.unsubscribe();
  // }

  //paginator
  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page + 1;
    this.moviesService
      .findAll(page, size)
      .pipe(map((movieData: MovieData) => (this.dataSource = movieData)))
      .subscribe();
  }

  fetchData() {
    this.initDataSource();
    this.moviesService.getMovies().subscribe(
      (res) => {
        // console.log('response', res);
        // console.log('response', res.count);
        this.demo = res.count;
        this.movies = res.results.map(function (a: any) {
          return a['title'];
        });
        this.data = res.results;
        this.dataSource = res.results;
        // console.log('data', this.data);
      },

      (err) => {
        // console.log(err);
        // Swal.fire({
        //   icon: 'warning',
        //   title: 'warning',
        //   text: 'Please Click on refresh',
        //   confirmButtonColor: '#3f51b5',
        //   timer: 5000,
        // });
        // this.loginForm.reset();
      }
    );
  }

  // modal dialog
  statusDialog(title: any, description: any, genres: any): void {
    this.sendValue = title;
    this.description = description;
    this.genres = genres;

    // console.log('dial', title);

    const dialogRef = this.dialog.open(CardModalComponent, {
      width: '400px',
      data: {
        pageValue: this.sendValue,
        description: this.description,
        genres: this.genres,
      },
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        data['title'] = title;
        // console.log(data);
      }
    });
  }
}
