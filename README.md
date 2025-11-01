# -Minesweeper-Game-React-JavaScript
 Functional Minesweeper clone with custom game logic, dynamic UI  rendering, and responsive design.

 🧩 Minesweeper (React)

This project was developed for the Scripting Languages course (2023/2024).
The goal was to recreate the classic Minesweeper game with some unique features, using React, JavaScript, HTML, and CSS.

👨‍💻 Authors

João Pedro Cardoso

Miguel Cardoso 

Duarte Batista 

🕹️ Project Overview

Minesweeper is a logic and strategy game where the player must uncover all non-mined cells on a grid without detonating any mines.

This project demonstrates the team’s skills in web programming with React, focusing on functional components, interactivity, and clean design.

⚙️ Technologies Used

React.js

JavaScript (ES6+)

HTML5

CSS3

🧱 Component Structure

The application is composed of three main components:

Component	Description
Board	Main navigation bar and game board container
BoardHead	Header displaying game info such as difficulty, timer, flags, and reset button
Cell	Individual cell component representing each tile on the board
🎮 Game Modes

Below the game title in the header, players can select the desired difficulty level:

Mode	Board Size
Beginner	9 × 9
Intermediate	16 × 16
Expert	30 × 16
🧠 Game Rules & Interactions
🖱️ Left Click

Reveals the selected cell.

If the cell contains adjacent mines → displays the number.

If the cell has no nearby mines → automatically opens neighboring cells.

If the cell contains a mine → the game ends (loss).

🖱️ Right Click

Marks the cell with a flag (🚩) if available.

Second click → replaces the flag with a question mark (?).

Third click → resets the cell to its original hidden state.

🏆 Win & Lose Conditions

Win: All non-mined cells are uncovered.

Lose: A mined cell is clicked.

The game displays alerts to indicate victory or defeat.

⚠️ Challenges Faced

During development, the team encountered a few challenges:

Reset Button: Difficulty in correctly resetting the board according to the selected difficulty level.

Adjacent Cell Logic: Implementing the recursive logic to correctly reveal surrounding cells.

🚀 How to Run

Clone the repository:

git clone https://github.com/your-username/minesweeper-react.git


Navigate to the project folder:

cd minesweeper-react


Install dependencies:

npm install


Run the development server:

npm start


Open your browser and visit:

http://localhost:3000

📄 License

This project was developed solely for academic purposes as part of the Scripting Languages course (LS – 2023/2024).
