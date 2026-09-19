-- Drop existing data for testing if necessary
-- Note: ddl-auto=update will handle schema creation, so we only need to insert demo data here.

-- Insert test users (Passwords should ideally be encoded, but assuming plain for now or BCrypt later)
-- We will use BCrypt for passwords: 'password' -> $2a$10$wY1tw.uG.eY9x3v3Z8P1/.5q4tXhG5X1Q9k/3C5PjX3/Z5Z9Z9Z9Z
-- Actually let's assume we implement BCrypt in Spring Security and encode these. For now, let's keep it simple.

INSERT INTO user (id, email, password, role) VALUES 
(1, 'owner@leadyfy.com', '$2a$10$vR5FZSBjDAkTd0Wd7M2nWe66wITFRNKPqH55rMzgOOFqCgF7vqW8y', 'OWNER'),
(2, 'admin@leadyfy.com', '$2a$10$vR5FZSBjDAkTd0Wd7M2nWe66wITFRNKPqH55rMzgOOFqCgF7vqW8y', 'ADMIN'),
(3, 'employee@leadyfy.com', '$2a$10$vR5FZSBjDAkTd0Wd7M2nWe66wITFRNKPqH55rMzgOOFqCgF7vqW8y', 'EMPLOYEE'),
(4, 'client@leadyfy.com', '$2a$10$vR5FZSBjDAkTd0Wd7M2nWe66wITFRNKPqH55rMzgOOFqCgF7vqW8y', 'CLIENT')
ON DUPLICATE KEY UPDATE email=VALUES(email), password=VALUES(password), role=VALUES(role);

-- Insert test client
INSERT INTO client (id, client_name, company_name, email, phone, status, user_id) VALUES 
(1, 'John Doe', 'Acme Corp', 'client@example.com', '1234567890', 'ACTIVE', 3)
ON DUPLICATE KEY UPDATE email=email;

-- Insert test order
INSERT INTO orders (id, client_id, package_name, status, price, contracted_video_count, completed_video_count) VALUES 
(1, 1, 'Premium Video Package', 'IN_PRODUCTION', 1500.00, 5, 0)
ON DUPLICATE KEY UPDATE package_name=VALUES(package_name), status=VALUES(status);

-- Insert test creator
INSERT INTO creator (id, name, gender, age_group, niches, status) VALUES 
(1, 'Alex Smith', 'Male', '18-24', 'Tech, Gaming', 'AVAILABLE')
ON DUPLICATE KEY UPDATE name=name;

-- Insert test script
INSERT INTO script (id, client_id, order_id, script_text, status) VALUES 
(1, 1, 1, 'Hey everyone, check out this amazing new product from Acme Corp...', 'APPROVED')
ON DUPLICATE KEY UPDATE status=status;

-- Insert test shoot
INSERT INTO shoot (id, client_id, creator_id, location, date_time, status) VALUES 
(1, 1, 1, 'Studio A', '2026-10-01 10:00:00', 'SCHEDULED')
ON DUPLICATE KEY UPDATE status=status;

-- Insert test video
INSERT INTO video (id, client_id, shoot_id, video_link, status) VALUES 
(1, 1, 1, 'https://drive.google.com/open?id=123', 'CLIENT_REVIEW')
ON DUPLICATE KEY UPDATE status=status;

