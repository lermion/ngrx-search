import { createAction, props } from '@ngrx/store';

export const searchQuery = createAction(
  '[Search] Search Query',
  props<{ query: string }>()
);

export const searchSuccess = createAction(
  '[Search] Search Success',
  props<{ results: any[] }>()
);

export const loadMoreResults = createAction(
  '[Search] Load More Results',
  props<{ query: string; page: number }>()
);

export const loadMoreResultsSuccess = createAction(
  '[Search] Load More Results Success',
  props<{ results: any[] }>()
);
