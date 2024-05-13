import { COMMENTS_URL } from '../script.js';
import getData from '../script.js';

const canvasLineChart = document.getElementById('line_chart');
const ctxLc = canvasLineChart.getContext('2d');
const canvasWidthLc = canvasLineChart.clientWidth;
const canvasHeightLc = canvasLineChart.clientHeight;
const lineChartForm = document.forms.line_chart_form;
const lineChartUseremailInput = lineChartForm.elements.lineUseremail;
const lineChartCommentBodyInput = lineChartForm.elements.lineCommentbody;
const lineChartSubmitButton = document.querySelector('.line-chart__button-submit');
const lineChartResetButton = document.querySelector('.line-chart__button-reset');

export default function generateLineChart() {
  const commentsData = getData(COMMENTS_URL);

  canvasLineChart.classList.add('canvas__visible');

  const date = {};

  function updateLineChartData(userEmailInput, commentBodyInput) {
    commentsData.then((data) => {
      let comments = data.map((comment) => ({
        ...comment,
        date: date[comment.id] ||= new Date(2023, Math.round(Math.random() * 11 + 1)).toISOString().split('T')[0]
      }));

      if (userEmailInput || commentBodyInput) {
        comments = comments.filter(({ email, body }) =>
          email.toLowerCase().includes(userEmailInput.toLowerCase()) &&
          body.toLowerCase().includes(commentBodyInput.toLowerCase())
        );
      }      

      const commentPerMonth = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0};

      comments.forEach((item) => {
        const month = parseInt(item.date.slice(5, 7));
        commentPerMonth[month] = (commentPerMonth[month] || 0) + 1;
      });      

      ctxLc.clearRect(0, 0, canvasWidthLc, canvasHeightLc);

      // X axis
      ctxLc.beginPath();
      ctxLc.moveTo(70, canvasHeightLc - 50);
      ctxLc.lineTo(canvasWidthLc - 80, canvasHeightLc - 50);
      ctxLc.stroke();
      ctxLc.closePath();

      ctxLc.beginPath();
      ctxLc.moveTo(canvasWidthLc - 80, canvasHeightLc - 50);
      ctxLc.lineTo(canvasWidthLc - 85, canvasHeightLc - 55);
      ctxLc.stroke();
      ctxLc.closePath();

      ctxLc.beginPath();
      ctxLc.moveTo(canvasWidthLc - 80, canvasHeightLc - 50);
      ctxLc.lineTo(canvasWidthLc - 85, canvasHeightLc - 45);
      ctxLc.stroke();
      ctxLc.closePath();

      const monthsLength = (canvasWidthLc - 70 - 50) / 12;
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      for (let i = 0; i < 12; i++) {
        ctxLc.font = '14px Arial';
        ctxLc.fillStyle = '#000000';
        ctxLc.textBaseline = 'top';
        ctxLc.fillText(months[i], 60 + monthsLength * i, canvasHeightLc - 35);

        ctxLc.beginPath();
        ctxLc.strokeStyle = 'rgba(153,153,153,0.5)';
        ctxLc.moveTo(70 + i * monthsLength, canvasHeightLc - 50);
        ctxLc.lineTo(70 + i * monthsLength, 65);
        ctxLc.stroke();
        ctxLc.closePath();
      }

      let maxNumberOfCommentsPerMonth = Object.values(commentPerMonth).sort((a, b) => b - a)[0];

      const commentsLength = maxNumberOfCommentsPerMonth / 8;

      for (let i = 0; i < 10; i++) {
        ctxLc.font = '14px Arial';
        ctxLc.fillStyle = '#000000';
        ctxLc.textAlign = 'center';
        ctxLc.textBaseline = 'middle';
        commentsLength !== 0
          ? ctxLc.fillText(
              commentsLength.toString().startsWith('0')
                ? `${0 + +(i * commentsLength).toFixed(1)}`
                : `${0 + +(i * commentsLength).toFixed(0)}`,
              45,
              canvasHeightLc - 50 - ((canvasHeightLc - 50 - 35) / 10) * i,
            )
          : ctxLc.fillText('0', 45, canvasHeightLc - 50);

        ctxLc.beginPath();
        ctxLc.strokeStyle = 'rgba(153,153,153,0.5)';
        ctxLc.moveTo(70, canvasHeightLc - 50 - ((canvasHeightLc - 50 - 35) / 10) * i);
        ctxLc.lineTo(
          canvasWidthLc - 110,
          canvasHeightLc - 50 - ((canvasHeightLc - 50 - 35) / 10) * i,
        );
        ctxLc.stroke();
        ctxLc.closePath();
      }

      ctxLc.beginPath();
      ctxLc.strokeStyle = '#0e83b5';
      ctxLc.lineWidth = 3;

      for (let i = 0; i < 12; i++) {
        const startY = canvasHeightLc - 50 - (Object.values(commentPerMonth)[i] * (canvasHeightLc - 50 - 35)) / 10 / commentsLength;
        const endY = canvasHeightLc - 50 - (Object.values(commentPerMonth)[i + 1] * (canvasHeightLc - 50 - 35)) / 10 / commentsLength;

        ctxLc.moveTo(70 + i * monthsLength, startY);
        ctxLc.lineTo(70 + monthsLength * (i + 1), endY);
      }

      ctxLc.stroke();
      ctxLc.closePath();

      ctxLc.strokeStyle = '#000000';
      ctxLc.lineWidth = 1;
      ctxLc.textAlign = 'start';
      ctxLc.textBaseline = 'alphabetic';

      // Y axis
      ctxLc.beginPath();
      ctxLc.moveTo(70, 35);
      ctxLc.lineTo(70, canvasHeightLc - 50);
      ctxLc.stroke();
      ctxLc.closePath();

      ctxLc.beginPath();
      ctxLc.moveTo(70, 35);
      ctxLc.lineTo(75, 40);
      ctxLc.stroke();
      ctxLc.closePath();

      ctxLc.beginPath();
      ctxLc.moveTo(70, 35);
      ctxLc.lineTo(65, 40);
      ctxLc.stroke();
      ctxLc.closePath();

      ctxLc.font = '16px Arial';
      ctxLc.fillStyle = '#000000';
      ctxLc.fillText('Comments', 10, 25);
      ctxLc.fillText('Month', canvasWidthLc - 65, canvasHeightLc - 30);
    });
  }

  updateLineChartData();

  let userEmailInput = '';
  let commentBodyInput = '';

  lineChartSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    canvasLineChart.classList.remove('canvas__visible');
    userEmailInput = lineChartUseremailInput.value;
    commentBodyInput = lineChartCommentBodyInput.value;
    setTimeout(function () {
      updateLineChartData(userEmailInput, commentBodyInput);
      canvasLineChart.classList.add('canvas__visible');
    }, 0);
  });

  lineChartResetButton.addEventListener('click', () => {
    canvasLineChart.classList.remove('canvas__visible');
    userEmailInput = '';
    commentBodyInput = '';
    setTimeout(function () {
      updateLineChartData(userEmailInput, commentBodyInput);
      canvasLineChart.classList.add('canvas__visible');
    }, 0);
  });
}
