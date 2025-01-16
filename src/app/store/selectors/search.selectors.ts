import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../reducers/search.reducer';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectResults = createSelector(selectSearchState, (state) => state.results);

export const selectQuery = createSelector(selectSearchState, (state) => state.query);

export const selectPage = createSelector(selectSearchState, (state) => state.page);

export const selectSearchHistory = createSelector(selectSearchState, (state) => state.searchHistory);
