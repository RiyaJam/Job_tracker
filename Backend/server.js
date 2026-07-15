import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS job_application (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            companyName TEXT NOT NULL,
            roleTitle TEXT NOT NULL,
            status TEXT NOT NULL,
            appliedDate TEXT,
            deadline TEXT,
            notes TEXT,
            jobLink TEXT
        )`);
    }
});

// GET all applications
app.get('/api/applications', (req, res) => {
    db.all("SELECT * FROM job_application", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET applications by status
app.get('/api/applications/status/:status', (req, res) => {
    db.all("SELECT * FROM job_application WHERE status = ?", [req.params.status], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// POST new application
app.post('/api/applications', (req, res) => {
    const { companyName, roleTitle, status, appliedDate, deadline, notes, jobLink } = req.body;
    
    if (!companyName || !roleTitle) {
        return res.status(400).json({ error: 'Company Name and Role Title are required' });
    }

    const currentStatus = status || 'APPLIED';

    const sql = `INSERT INTO job_application 
        (companyName, roleTitle, status, appliedDate, deadline, notes, jobLink) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [companyName, roleTitle, currentStatus, appliedDate, deadline, notes, jobLink], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        db.get("SELECT * FROM job_application WHERE id = ?", [this.lastID], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(row);
        });
    });
});

// PUT (update) application
app.put('/api/applications/:id', (req, res) => {
    const { companyName, roleTitle, status, appliedDate, deadline, notes, jobLink } = req.body;
    
    const sql = `UPDATE job_application SET 
        companyName = ?, 
        roleTitle = ?, 
        status = ?, 
        appliedDate = ?, 
        deadline = ?, 
        notes = ?, 
        jobLink = ? 
        WHERE id = ?`;

    db.run(sql, [companyName, roleTitle, status, appliedDate, deadline, notes, jobLink, req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }
        
        db.get("SELECT * FROM job_application WHERE id = ?", [req.params.id], (err, row) => {
            res.json(row);
        });
    });
});

// DELETE application
app.delete('/api/applications/:id', (req, res) => {
    db.run("DELETE FROM job_application WHERE id = ?", [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(204).send();
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
