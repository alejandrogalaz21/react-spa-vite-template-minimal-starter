import type { AxiosResponse } from 'axios';

import axios from 'axios';

export const getStarShips = async (): Promise<any> => {
  const { data }: AxiosResponse<any> = await axios.get(`https://swapi.dev/api/starships`);
  return data;
};
