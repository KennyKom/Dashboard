import { POSTS_URL, USERS_URL } from '../script.js';
import getData from '../script.js';

const canvasPieChart = document.getElementById('pie_chart');
const ctxPc = canvasPieChart.getContext('2d');
const canvasWidthPc = canvasPieChart.clientWidth;
const canvasHeightPc = canvasPieChart.clientHeight;
const pieCartForm = document.forms.pie_chart_form;
const pieChartUserInput = pieCartForm.elements.pieUsername;
const pieChartSubmitButton = document.querySelector('.pie-chart__button-submit');
const pieChartResetButton = document.querySelector('.pie-chart__button-reset');

export default function generatePieChart() {
  const posts = getData(POSTS_URL);
  const users = getData(USERS_URL);

  canvasPieChart.classList.add('canvas__visible');

  function updatePieChartData(userInput) {
    Promise.all([posts, users]).then((data) => {
      const postsData = data[0];
      const usersData = data[1];

      let filteredUsers = usersData.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        numberOfPosts: 0,
      }));

      if (userInput) {
        filteredUsers = filteredUsers.filter((user) =>
          user.username.toLowerCase().includes(userInput.toLowerCase())
        );
      }

      let totalPosts = 0;

      const userPostsCount = new Map();
      const userColors = new Map();

      const userColorMap = {
        1: '#ff0000', 2: '#00ff00', 3: '#0000ff', 4: '#FF9999', 5: '#663300',
        6: '#ffff00', 7: '#cc6600', 8: '#660000', 9: '#990099',10: '#660099',
      };

      for (let post of postsData) {
        totalPosts++;
        if (!userPostsCount.has(post.userId)) {
          userPostsCount.set(post.userId, 0);
          userColors.set(post.userId, userColorMap[post.userId]);
        }
        userPostsCount.set(post.userId, userPostsCount.get(post.userId) + 1);
      }

      ctxPc.clearRect(0, 0, canvasWidthPc, canvasHeightPc);

      const centerX = canvasWidthPc / 2;
      const centerY = canvasHeightPc / 2;
      const radius = Math.min(canvasWidthPc, canvasHeightPc) / 2 - 10;
      let startAngle = 0;

      for (let user of filteredUsers) {
        const percentage = (userPostsCount.get(user.id) / totalPosts) * 100;
        const endAngle = startAngle + (percentage / 100) * Math.PI * 2;

        ctxPc.beginPath();
        ctxPc.moveTo(centerX, centerY);
        ctxPc.arc(centerX, centerY, radius, startAngle, endAngle);
        ctxPc.fillStyle = userColors.get(user.id);
        ctxPc.fill();

        startAngle = endAngle;
      }

      ctxPc.beginPath();
      ctxPc.moveTo(centerX, centerY);
      ctxPc.arc(centerX, centerY, radius, startAngle, Math.PI * 2);
      ctxPc.fillStyle = '#ccc';
      ctxPc.fill();

      ctxPc.font = '16px Arial';
      ctxPc.textAlign = 'start';
      ctxPc.textBaseline = 'middle';

      let heightIterator = 0;

      for (let user of filteredUsers) {
        const percentage = (userPostsCount.get(user.id) / totalPosts) * 100;
        const color = userColors.get(user.id);

        ctxPc.fillStyle = '#000';

        ctxPc.fillText(
          `${user.username} (${percentage.toFixed(1)}%)`,
          canvasWidthPc - 185,
          45 + heightIterator,
        );

        ctxPc.fillStyle = color;
        ctxPc.fillRect(canvasWidthPc - 220, 30 + heightIterator + 5, 20, 20);

        heightIterator += 45;
      }
    });
  }

  updatePieChartData();

  let userInput = '';

  pieChartSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    userInput = pieChartUserInput.value;
    updatePieChartData(userInput);
  });

  pieChartResetButton.addEventListener('click', () => {
    userInput = '';
    updatePieChartData(userInput);
  });
}