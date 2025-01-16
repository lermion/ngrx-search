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
  on(searchQuery, (state, { query }) => {
    const newWords: string[] = query
      .split(/\s+/)
      .map((word: string) => word.trim())
      .filter((word: string) => word.length > 0 && !state.searchHistory.includes(word));
    return ({
      ...state,
      query,
      page: 1,
      results: [],
      searchHistory: [...state.searchHistory, ...newWords],
    })
  }),
  on(searchSuccess, (state, { results }) => ({ ...state, results })),
  on(loadMoreResultsSuccess, (state, { results }) => ({
    ...state,
    results: [...state.results, ...results],
    page: state.page + 1,
  }))
);
