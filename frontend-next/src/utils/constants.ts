export const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Fantasy',
  'Biography',
  'History',
  'Self-Help',
  'Business',
  'Technology',
  'Poetry',
  'Drama',
  'Children',
  'Young Adult',
];

export const BOOK_STATUS = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  OUT_OF_STOCK: 'out_of_stock',
};

export const USER_ROLES = {
  READER: 'reader',
  AUTHOR: 'author',
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
];

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

export const ITEMS_PER_PAGE = 12;
