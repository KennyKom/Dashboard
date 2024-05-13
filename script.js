export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
export const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
export const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

import generateBarChart from './charts/barChart.js';
import generateLineChart from './charts/lineChart.js';
import generatePieChart from './charts/pieChart.js';

export default async function getData(url) {
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(`Server is unavailable`);
  }

  return data.json();
}
  
generateBarChart();
generateLineChart();
generatePieChart();