import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SearchService } from '../../services/search.service';
import {
  searchQuery,
  searchSuccess,
  loadMoreResults,
  loadMoreResultsSuccess,
} from '../actions/search.actions';
import { debounceTime, switchMap, map, withLatestFrom } from 'rxjs/operators';
import { selectQuery } from '../selectors/search.selectors';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService,
    private store: Store
  ) {}

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchQuery),
      debounceTime(300),
      switchMap(({ query }) => {
        return this.searchService.search(query).pipe(
          map((results) => searchSuccess({ results }))
        )
      })
    )
  );

  loadMoreResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoreResults),
      debounceTime(300),
      withLatestFrom(this.store.select(selectQuery)),
      switchMap(([{ page }, query]) =>
        this.searchService.search(query, page, 20).pipe(
          map((results) => loadMoreResultsSuccess({ results }))
        )
      )
    )
  );
}
