USE it_vocabulary;

INSERT INTO users (username, password, email) VALUES
('john_doe', '$2a$10$7EqJtq98hPqEX7fN/duHIe/9x0.e6c/5sTrK9i/yixEOx6ROz6i', 'john_doe@example.com'), -- Пароль: password123
('jane_smith', '$2a$10$E1GzF2ezo6Ytb/YJ6QW6OeAI.5j6xnV.l/E8o5S8wHeeE/6RHil', 'jane_smith@example.com'); -- Пароль: mypassword

INSERT INTO topics (name) VALUES
('Web Development'),
('Data Science'),
('Cybersecurity');

INSERT INTO terms (term, definition, topic_id) VALUES
('HTML', 'Hypertext Markup Language, the standard markup language for creating web pages.', 1),
('CSS', 'Cascading Style Sheets, used to describe the presentation of a document written in HTML or XML.', 1),
('JavaScript', 'A programming language commonly used in web development.', 1),
('Machine Learning', 'A field of computer science that focuses on the development of algorithms that learn from data.', 2),
('Neural Network', 'A series of algorithms that mimic the operations of a human brain to recognize relationships in a set of data.', 2),
('Phishing', 'A type of cyber attack where attackers deceive users into providing sensitive information.', 3),
('Firewall', 'A network security device that monitors and controls incoming and outgoing network traffic.', 3);

INSERT INTO quiz_results (term_id, user_id, user_answer, is_correct) VALUES
(1, 1, 1, TRUE),
(2, 1, 3, FALSE),
(3, 1, 3, TRUE),
(4, 2, 4, TRUE),
(5, 2, 6, FALSE),
(6, 2, 6, TRUE),
(7, 1, 7, TRUE);
