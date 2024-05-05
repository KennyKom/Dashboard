export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
export const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
export const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

import generateBarChart, { canvasBarChart } from './charts/barChart.js';
import generateLineChart, { canvasLineChart } from './charts/lineChart.js';

const bodyContent = document.querySelector('.page');

export default async function getData(url) {
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(`Server is unavailable`);
  }

  return data.json();
}

setTimeout(function () {
  bodyContent.classList.add('page_visible');
}, 0);

setTimeout(function () {
    canvasBarChart.classList.add('canvas__visible');
    canvasLineChart.classList.add('canvas__visible');
}, 0);
  
generateBarChart();
generateLineChart();