import { createReducer, on } from '@ngrx/store';
import { searchQuery, searchSuccess, loadMoreResultsSuccess } from '../actions/search.actions';

export interface SearchState {
  query: string;
  results: any[];
  page: number;
  searchHistory: string[];
}

export const initialState: SearchState = {
  query: '',
  results: [],
  page: 1,
  searchHistory: []
};

export const searchReducer = createReducer(
  initialState,
  on(searchQuery, (state, { query }) => ({
    ...state,
    query,
    page: 1,
    results: [],
    searchHistory: state.searchHistory.includes(query)
      ? state.searchHistory
      : [...state.searchHistory, query]
  })),
  on(searchSuccess, (state, { results }) => ({ ...state, results })),
  on(loadMoreResultsSuccess, (state, { results }) => ({
    ...state,
    results: [...state.results, ...results],
    page: state.page + 1,
  }))
);
