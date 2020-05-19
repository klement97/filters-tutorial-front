import { formatDate } from '@angular/common';


export const MIN_TIME = '00:00:00.000000';
export const MAX_TIME = '23:59:59.999999';


export function buildQueryString(page: number = 0, page_size: number = 10, ordering: string = '', filter: any): string {
  const queryString = [];
  page++;
  if (page) {
    queryString.push(`page=${page}`);
  }
  if (page_size) {
    queryString.push(`page_size=${page_size}`);
  }
  if (ordering) {
    queryString.push(`ordering=${ordering}`);
  }
  if (filter) {
    queryString.push(buildFilterString(filter));
  }
  if (queryString.length > 0) {
    return '?' + queryString.join('&');
  }
  return '';
}

function buildFilterString(filter: { [key: string]: any }) {
  let filterString = '';
  Object.keys(filter).forEach((key) => {
    filterString += filter[key] ? `${key}=${filter[key]}&` : '';
  });
  return filterString;
}

export function formatDateToString(date: Date | string, time: string = ''): string {
  if (typeof date === 'object') {
    let formattedDate: string = formatDate(date, 'yyyy-MM-dd', 'en-us');
    if (time) {
      formattedDate += `+${time}`;
    }
    return formattedDate;
  }
  return date;
}


/**
 * Convert Mat Sort Header Direction to required sign for backend.
 * @param active:         Field name
 * @param direction:      Mat Sort Direction
 * @return sort:          '-' if directions is desc and '' otherwise
 */
export function getSort(active: string, direction: 'asc' | 'desc' | '') {
  const sort = direction === 'desc' ? '-' : '';
  return sort + active;
}
