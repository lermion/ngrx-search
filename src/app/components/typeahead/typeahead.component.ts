import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, take } from 'rxjs';
import { FormControl } from '@angular/forms';
import { loadMoreResults, searchQuery } from '../../store/actions/search.actions';
import { selectPage, selectResults, selectSearchHistory } from '../../store/selectors/search.selectors';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
})
export class TypeaheadComponent implements OnInit {
  public searchControl = new FormControl('');
  public results$ = this.store.select(selectResults);
  public page$ = this.store.select(selectPage);
  public searchHistory$ = this.store.select(selectSearchHistory);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe((query) => this.store.dispatch(searchQuery({ query: query || '' })));
  }

  public onScroll(scrolledIndex: number, results: any[]): void {
    const isAtBottom = scrolledIndex >= results.length;
    if (isAtBottom) {
      this.page$.pipe(take(1)).subscribe((currentPage: number): void => {
        this.store.dispatch(loadMoreResults({ query: this.searchControl.value || '', page: currentPage }));
      });
    }
  }

  public setSearch(query: string): void {
    this.searchControl.patchValue(query);
  }
}
