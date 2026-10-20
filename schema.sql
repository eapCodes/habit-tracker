CREATE DATABASE IF NOT EXISTS habit_tracker;
USE habit_tracker;

CREATE TABLE habits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    weight TINYINT NOT NULL CHECK (weight BETWEEN 1 AND 5),
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE habit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    habit_id INT NOT NULL,
    log_date DATE NOT NULL,
    completed TINYINT(1) NOT NULL DEFAULT 0,
    weight_at_log TINYINT NOT NULL,
    UNIQUE (habit_id, log_date),
    FOREIGN KEY (habit_id) REFERENCES habits(id)
);

INSERT INTO habits (name, weight) VALUES
    ('Reading', 3),
    ('Exercise', 2),
    ('Meditation', 2);