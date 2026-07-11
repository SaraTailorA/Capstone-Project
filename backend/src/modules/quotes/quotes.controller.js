import { query } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/responses.js';
import { v4 as uuidv4 } from 'uuid';

export async function createQuote(req, res) {
  try {
    const { project_id } = req.body;

    if (!project_id) {
      return sendError(res, 'project_id es obligatorio', 400);
    }

    const project = await query(
      'SELECT * FROM projects WHERE id = $1 AND user_id = $2',
      [project_id, req.user.id]
    );

    if (project.rows.length === 0) {
      return sendError(res, 'Proyecto no encontrado', 404);
    }

    const quoteNumber = `SC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    const result = await query(
      `INSERT INTO quotes (project_id, user_id, quote_number, total_cost, valid_until)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        project_id,
        req.user.id,
        quoteNumber,
        project.rows[0].system_cost,
        validUntil,
      ]
    );

    sendSuccess(res, { quote: result.rows[0] }, 201);
  } catch (error) {
    sendError(res, error.message);
  }
}

export async function getQuotes(req, res) {
  try {
    const result = await query(
      `SELECT q.*, p.name as project_name, p.monthly_kwh
       FROM quotes q
       JOIN projects p ON q.project_id = p.id
       WHERE q.user_id = $1
       ORDER BY q.created_at DESC`,
      [req.user.id]
    );

    sendSuccess(res, { quotes: result.rows });
  } catch (error) {
    sendError(res, error.message);
  }
}
