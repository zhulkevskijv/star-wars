import { SWAPIResult } from 'types';
import swapi from 'config/axios';
import { AxiosResponse } from 'axios';

export const getPage = <Type>(url: string): Promise<SWAPIResult<Type> | void> =>
  swapi
    .get(url)
    .then((response: AxiosResponse<SWAPIResult<Type>>) =>
      Promise.resolve(response.data)
    )
    .catch((error) => console.log('Problem occurred during fetching!', error));

/* eslint-disable no-unused-vars */
export const getAllPages = async <Type>(
  url: string,
  processResults: (results: Array<Type>) => void
) => {
  const data = await getPage<Type>(url);
  if (data) {
    processResults(data.results);
    if (data.next !== null) {
      await getAllPages(data.next, processResults);
    }
  }
};
