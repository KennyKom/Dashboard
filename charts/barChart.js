import { USERS_URL, POSTS_URL } from '../script.js';
import getData from '../script.js';

const canvasBarChart = document.getElementById('bar_chart');
const ctx = canvasBarChart.getContext('2d');
const canvasWidth = canvasBarChart.clientWidth;
const canvasHeight = canvasBarChart.clientHeight;
const barChartForm = document.forms.bar_chart_form;
const barChartUserInput = barChartForm.elements.barUsername;
const barChartSubmitButton = document.querySelector('.bar-chart__button-submit');
const barChartResetButton = document.querySelector('.bar-chart__button-reset');

export default function generateBarChart() {
  const posts = getData(POSTS_URL);
  const users = getData(USERS_URL);

  canvasBarChart.classList.add('canvas__visible');

  function updateBarChartData(userInput) {
    Promise.all([posts, users]).then((data) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      ctx.beginPath();
      ctx.moveTo(70, 50);
      ctx.lineTo(70, canvasHeight - 50);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(70, 50);
      ctx.lineTo(75, 55);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(70, 50);
      ctx.lineTo(65, 55);
      ctx.stroke();
      ctx.closePath();

      ctx.font = '16px Arial';
      ctx.fillStyle = '#000000';
      ctx.fillText('Posts', 10, 30);
      ctx.fillText('Users', canvasWidth - 55, canvasHeight - 10);

      let users = data[1].map((user) => {
        return (user = {
          id: user.id,
          name: user.name,
          username: user.username,
          numberOfPosts: 0,
        });
      });

      if (userInput) {
        users = users.filter((user) =>
          user.username.toLowerCase().includes(userInput.toLowerCase()),
        );
      }

      let filteredPosts = data[0];

      for (let i = 0; i < users.length; i++) {
        filteredPosts.forEach((item) => {
          if (item.userId == users[i].id) {
            users[i].numberOfPosts += 1;
          }
        });
      }

      const max = users.length > 0 ? users.reduce((acc, curr) => acc.numberOfPosts > curr.numberOfPosts ? acc : curr) : 0;

      const postsLength = max ? max.numberOfPosts / 8 : 0;

      for (let i = 0; i < 10; i++) {
        ctx.font = '14px Arial';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        postsLength !== 0
          ? ctx.fillText(
              postsLength.toString().startsWith('0')
                ? `${0 + +(i * postsLength).toFixed(1)}`
                : `${0 + +(i * postsLength).toFixed(1)}`,
              45,
              canvasHeight - 50 - ((canvasHeight - 50 - 50) / 10) * i,
            )
          : ctx.fillText('0', 45, canvasHeight - 50);
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(153,153,153,0.5)';
        ctx.moveTo(70, canvasHeight - 50 - ((canvasHeight - 50 - 50) / 10) * i);
        ctx.lineTo(
          canvasWidth - 90,
          canvasHeight - 50 - ((canvasHeight - 50 - 50) / 10) * i,
        );
        ctx.stroke();
        ctx.closePath();
      }

      let widthIterator = 100;
      users.forEach((user) => {
        ctx.fillStyle = '#0e83b5';
        ctx.fillRect(
          widthIterator,
          canvasHeight - 50,
          45,
          Math.trunc((-user.numberOfPosts * (canvasHeight - 50 - 50)) / 10 / postsLength),
        );

        ctx.textBaseline = 'bottom';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';
        ctx.fillText(
          `${user.username.slice(0, 8)}...`,
          widthIterator + 30,
          canvasHeight - 27,
        );
        widthIterator += 85;
      });

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.textAlign = 'start';
      ctx.textBaseline = 'alphabetic';

      // Y Axis
      ctx.beginPath();
      ctx.moveTo(70, canvasHeight - 50);
      ctx.lineTo(canvasWidth - 50, canvasHeight - 50);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(canvasWidth - 50, canvasHeight - 50);
      ctx.lineTo(canvasWidth - 55, canvasHeight - 55);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(canvasWidth - 50, canvasHeight - 50);
      ctx.lineTo(canvasWidth - 55, canvasHeight - 45);
      ctx.stroke();
      ctx.closePath();
    });
  }

  updateBarChartData();

  let userInput = '';

  barChartSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    userInput = barChartUserInput.value;
    updateBarChartData(userInput);
  });

  barChartResetButton.addEventListener('click', () => {
    userInput = '';
    updateBarChartData(userInput);;
  });
}