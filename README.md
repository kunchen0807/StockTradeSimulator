<div align="center">

# RobeanHood
## A stock trade simulator
[Description](#Description) |
[Installation](#Installation) |
[Usage](#Usage) |
[Tech-Stack](#Tech-Stack)

</div>

## Description:
The app emulates a stock trade site:

### Login Page:
<img src="./images/Screen Shot 2022-05-16 at 7.35.14 PM.png" alt="RobeanHood Login Page" style="zoom: 40%"/>

- Basic authentication system allows the user to create his/her own account and verifies the user by username and password.

### 5 Daily Stock News and TOP 20 Trending Stocks:
<img src="./images/Screen Shot 2022-05-16 at 7.36.58 PM.png" alt="news and trending stocks" style="zoom: 30%"/>

- 5 random daily stock news link.
- Top 20 daily trending stocks symbols updated at real-time.

<img src="./images/Screen Shot 2022-05-16 at 8.08.08 PM.png" alt="purchase" style="zoom: 30%"/>

- Purchase button allows the user to purchase more in-game coins.

### Stock Data and User Information:
<img src="./images/Screen Shot 2022-05-16 at 7.58.54 PM.png" alt="stock data and user info" style="zoom: 30%"/>

- Search bar allows the user to search for a stock by its stock symbol.
- Stock data chart displays how stock performanced in last 24 hours, in last month, and in last year by selecting the corresponding button at the top.
- Basic information of current queried stock displays below the chart.
- User information consists of cash on hand, total invested, total assets' value, total profit, and stocks user bought.


## Installation

### Step1: Clone the repo to your local computer

```shell
# clone
git clone https://github.com/kunchen0807/StockTradeSimulator.git
```

### Step2: Install dependencies

- In root folder, install all dependencies.
```shell
yarn install
```

## Usage

-  In root folder, install dependencies, then build webpack transpiling react

```shell
yarn install
yarn build
```
- In root folder, open localhost server
```shell
yarn server
open browser and type in http://localhost:3000/
```

## Tech-Stack:

### Frontend
- ReactJS
- Sass

### Backend
- Webpack
- Express server
- Node.js
- MongoDB