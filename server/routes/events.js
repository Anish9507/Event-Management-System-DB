const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../db');
router.use(auth);
router.get('/', async (req, res) => {
  try {
    const rows = await db.query('SELECT id, name, date, time, venue, organizer, description, created_at FROM events WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json(rows || []);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/', async (req, res) => {
  try {
    const { name, date, time, venue, organizer, description } = req.body;
    if (!name || !date || !time || !venue || !organizer) return res.status(400).json({ message: 'Missing required fields' });
    await db.query('INSERT INTO events (user_id, name, date, time, venue, organizer, description) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.user.id, name, date, time, venue, organizer, description || '']);
    const rows = await db.query('SELECT id, name, date, time, venue, organizer, description, created_at FROM events WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.status(201).json(rows || []);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, time, venue, organizer, description } = req.body;
    const owned = await db.one('SELECT id FROM events WHERE id = ? AND user_id = ?', [id, req.user.id]);
    if (!owned) return res.status(404).json({ message: 'Not found' });
    await db.query('UPDATE events SET name = ?, date = ?, time = ?, venue = ?, organizer = ?, description = ? WHERE id = ? AND user_id = ?', [name, date, time, venue, organizer, description || '', id, req.user.id]);
    const rows = await db.query('SELECT id, name, date, time, venue, organizer, description, created_at FROM events WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json(rows || []);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const owned = await db.one('SELECT id FROM events WHERE id = ? AND user_id = ?', [id, req.user.id]);
    if (!owned) return res.status(404).json({ message: 'Not found' });
    await db.query('DELETE FROM events WHERE id = ? AND user_id = ?', [id, req.user.id]);
    const rows = await db.query('SELECT id, name, date, time, venue, organizer, description, created_at FROM events WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json(rows || []);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
