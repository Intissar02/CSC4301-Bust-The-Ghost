Bust the Ghost Game 

Overview:

"Bust the Ghost" is an interactive game that combines probabilistic inference and engaging gameplay mechanics. The objective is to find and capture a ghost hidden in a 9x12 grid using sensor readings and Bayesian inference. Objectives and Game Mechanics

Grid Layout: The ghost is placed randomly in the grid according to a uniform prior distribution. Sensor Readings: Players click on grid cells to receive color-coded feedback: Red: Ghost is in the clicked cell. Orange: Ghost is 1-2 cells away. Yellow: Ghost is 3-4 cells away. Green: Ghost is at least 5 cells away. Gameplay: The game continues until the player locates the ghost or exhausts their credits or bust attempts.

Probabilistic Inference:

Bayesian Inference: The game updates the probability of each cell containing the ghost based on sensor readings using Bayesian methods. Probability Updates: When a sensor reading is received, probabilities are recalculated to reflect the new information.

User Interface:

Interactive Components: Grid Display: Click to receive sensor feedback. Peep Toggle Button: Displays current ghost location probabilities. Bust Button: Allows players to guess the ghost's exact location. Score and Bust Attempts: Tracks remaining credits and guesses.

Technologies Used:

JavaScript & React: For dynamic and responsive UI development. Redux: For efficient state management, ensuring consistent state transitions and strategic gameplay. Custom Utility Functions: For Bayesian updates and probabilistic modeling, enhancing decision-making and gameplay dynamics.

Advanced Functionalities:

Integration of a direction sensor providing directional hints, improving the gaming experience by combining distance and directional data for more accurate probability updates.

Conclusion:

"Bust the Ghost" showcases the application of Bayesian inference in gaming, creating a strategic and engaging experience. The use of advanced web development technologies like React and Redux ensures a responsive and interactive UI, while probabilistic modeling adds depth to the gameplay. 



## Azure Pipeline Mapping

| Pipeline Step       | What I Did                                                | Azure Equivalent              |
|---------------------|-----------------------------------------------------------|-------------------------------|
| Input & State Mgmt  | Captured user interaction and game state                  | Azure Logic Apps (event-driven trigger) |
| Processing          | Applied Bayesian inference for probability updates        | Azure Databricks (rule-based logic)     |
| Modeling/Decision   | Recalculated probabilities dynamically                    | DBT (calculated models/views)           |
| Output              | Visual feedback and decision system (UI in React)         | Power BI / Web Frontend                 |
| Automation          | Used Redux actions to trigger logic                       | Logic Apps / Function Apps              |
| Versioning          | Stored and tracked with GitHub                            | Azure DevOps Git                        |

