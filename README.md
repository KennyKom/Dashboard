# Data-Visualization-Dashboard

## Task

- Use the JSONPlaceholder for mock data. Specifically, fetch data from the /users, /posts, and /comments endpoints to display user-related analytics

- Bar Chart: display the number of posts per user

- Line Chart: show the monthly comment trend based on the timestamp of the posts (you can simulate timestamps or create a mock setup since JSONPlaceholder doesn't provide dates)

- Pie Chart: illustrate the percentage distribution of posts among users

- Implement interactive filtering options to view data for specific users

- A `README.md` file in the repository detailing instructions on how to set up and run the project, along with a brief explanation of the project structure.

- A live demo link (optional but recommended, can be hosted on free platforms like GitHub Pages or Netlify)

## [Deploy](https://kennykom.github.io/Dashboard/)

## How to run

1. Clone this repository

```
git clone https://github.com/kennykom/Dashboard.git
```

2. Open the directory in code editor
3. Run `npm install` to install all the dependencies
4. Install `Live Server` extension, and click `Go Live` from the status bar to turn the server on/off

## How I do this
1. Created main HTML CSS & JS file's
   
2. Did branch `dev` in which i created branches for adding some features or fixing something
   
3. From `dev` btanch i created branch `add-barChart` in which i added JS settings for the Bar Chart : added some html code & JS file
   
4. Then i created branch `add-lineChart` from `dev` branch in which i added JS settings for the Line Chart : added some html code & JS file
   
5. Finally created branch `add-pieChart` from `dev` branch in which i added JS settings for the Pie Chart : added some html code & JS file

## Folders structure
```
📦                            
 ┣ 📂charts                       # folder with charts
 ┃ ┣ 📜barChart.js                # settings for Bar Chart
 ┃ ┣ 📜lineChart.js               # settings for Line Chart
 ┃ ┗ 📜pieChart.js                # settings for Pie Chart
 ┣ 📜index.html                   # main HTML file
 ┣ 📜style.css                    # style for Data-Dashboard
 ┗ 📜script.js                    # main settings
```
## Stack
- HTML
- CSS
- JS
