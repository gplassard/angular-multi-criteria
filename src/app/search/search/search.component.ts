import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {SearchResult, SearchService} from "./search.service";
import {merge, Observable, switchMap, tap} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchCriteria: string = '';
  searchResults: SearchResult[] = [];
  criteriaChanges = new EventEmitter<string>();

  constructor(private searchService: SearchService) {

  }

  ngOnInit(): void {
    this.criteriaChanges.asObservable()
      .pipe(
        tap((value) => console.log("before switchMap", value)),
        tap(() => this.searchResults = []),
        switchMap(criteria => this.search(criteria)),
        tap((value) => console.log("after switchMap", value)),
      )
      .subscribe((v) => {
        console.log("subscribe", v);
        this.searchResults = [...this.searchResults, ...v];
      })
  }


  onCriteriaChange(criteria: string) {
    console.log("change", criteria);
    this.criteriaChanges.emit(criteria);
  }

  ngOnDestroy(): void {
    this.criteriaChanges.unsubscribe();
  }

  private search(criteria: string): Observable<SearchResult[]> {
    return merge(
      fromPromise(this.searchService.searchCriteria(1, criteria)),
      fromPromise(this.searchService.searchCriteria(2, criteria)),
      fromPromise(this.searchService.searchCriteria(3, criteria)),
    );
  }
}
