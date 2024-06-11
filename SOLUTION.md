# Intro

I decided to solve each on with different scripting/programming language. I had an idea to incorporate some sort of TDD+LLM (write tests and let some AI do the job (generate source code) until all tests are passed for each task), but eventually I decided not to overcomplicate the solutions (though when preparing solution for the last task I wanted some AI assistance).

* For each solution/script, current working directory should be where the input CSV files are.

# Contents

* /src - all the solutions' scripts can be found here
* /results - resulting CSV files (tasks solutions) are in this folder

# Tasks

### Task 1

* Solution language: Python
* How to run:
>python .\src\task1.py

### Task 2

* Solution language: PowerShell Core (>=7.2)
* How to run:
>pwsh .\src\task2.ps1

### Task 3

I decided to approach this one with assistance of some LLM and I gave a chance to Microsoft Copilot. Resulting code had some bugs an required polishing here and there, but eventually I saved some time as at least the overall 'flow' of the solution 
was there, but hard to say how meaningful the time saving was as I spent some time fixing tricky bugs that AI did...

* Solution language: JavaScript
* How to run:
>npm install csv-parse  
>node .\src\task3.js
