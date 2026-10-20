# Habit Tracker

A web app for tracking daily habits. Each habit has a **weight (1-5)** for how much it matters. You check habits off each day and get a **daily score (0-100)**, plus a chart with Day / Week / Month / Year views.

**CS 3311 Web Application Development, Idaho State University**
**Author:** Eduardo A. Paz

## Features

- Add a habit with a name and a weight from 1 to 5, with client-side validation (required fields, allowed characters, duplicate names, weight range)
- Daily check-in list with a live score and progress bar
- "How scoring works" note shown on the page
- Chart with a Day / Week / Month / Year toggle
- Habits are saved in and loaded from a MySQL database through PHP
- Server-side validation and prepared statements (PDO)

## Scoring

```
score = 100 x (sum of weight x done) / (sum of weight)
```

Each habit is either done (1) or not done (0). Checked habits earn their weight in points. All habits done = 100. Skipping a heavy habit costs more than skipping a light one.

Example: Reading (3, done), Exercise (2, done), Meditation (2, not done) gives 100 x 5 / 7 = 71.

Week, Month and Year views will show the average of the daily scores in that range.

## Tech stack

| Layer | Technology |
|---|---|
| Front end | HTML, CSS, vanilla JavaScript |
| Back end | PHP 8 (PDO) |
| Database | MySQL / MariaDB (XAMPP, phpMyAdmin) |
| Version control | Git and GitHub |

## Project structure

```
habit-tracker/
  index.html       page structure
  style.css        styling and layout
  script.js        score logic, rendering, form validation, chart, fetch calls
  schema.sql       database schema and starter data
  api/
    db.php         PDO database connection
    habits.php     GET = list habits, POST = add a habit (returns JSON)
  README.md
```

## How to run it (XAMPP)

1. Install [XAMPP](https://www.apachefriends.org/) and open the XAMPP Control Panel.
2. Start **Apache** and **MySQL**.
3. Copy this folder to `C:\xampp\htdocs\habit-tracker`.
4. Open `http://localhost/phpmyadmin`, click the **SQL** tab, paste the contents of `schema.sql`, and click **Go**. This creates the `habit_tracker` database and tables and adds 3 starter habits.
5. Open `http://localhost/habit-tracker/` in your browser.

The database connection in `api/db.php` uses the XAMPP defaults (user `root`, empty password), which is for local development only.

## Database schema

- **habits**: `id`, `name`, `weight` (1-5), `is_active`, `created_at`
- **habit_logs**: `id`, `habit_id`, `log_date`, `completed`, `weight_at_log`. It has a unique key on (`habit_id`, `log_date`) and a foreign key to `habits`. `weight_at_log` stores the habit's weight on that day, so changing a weight later doesn't rewrite history.

## Current status (midterm)

Done:
- Front end layout, styling, score calculation and chart toggle
- Add-habit form with client-side validation
- **Write path:** new habits are saved to MySQL through `api/habits.php` (POST)
- **Read path:** habits are loaded from MySQL on page load (GET)

Not done yet:
- Saving daily check-ins to `habit_logs`
- Server-side score calculation and real Week / Month / Year data (currently sample data)
- User accounts (register / login, password hashing, sessions)
- Edit and archive habits
- Responsive polish

## Roadmap (toward the final)

1. Save check-ins to `habit_logs`
2. Calculate scores on the server with SQL aggregation, and feed the chart with real data
3. User accounts with PHP sessions and `password_hash()`
4. Edit and archive habits, and check in on past days
5. Responsive layout and final polish