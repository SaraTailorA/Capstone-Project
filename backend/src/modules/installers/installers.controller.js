import { query } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/responses.js';

export async function getInstallers(req, res) {
  try {
    const { city, specialty, search, page = 1, limit = 10 } = req.query;

    let sql = 'SELECT * FROM installers WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (city) {
      sql += ` AND city ILIKE $${paramIndex}`;
      params.push(`%${city}%`);
      paramIndex++;
    }

    if (specialty) {
      sql += ` AND specialties @> $${paramIndex}::jsonb`;
      params.push(JSON.stringify([specialty]));
      paramIndex++;
    }

    if (search) {
      sql += ` AND (company_name ILIKE $${paramIndex} OR contact_name ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    sql += ' ORDER BY rating DESC';

    const offset = (page - 1) * limit;
    sql += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(sql, params);

    sendSuccess(res, { installers: result.rows });
  } catch (error) {
    sendError(res, error.message);
  }
}

export async function getInstaller(req, res) {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM installers WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return sendError(res, 'Instalador no encontrado', 404);
    }

    sendSuccess(res, { installer: result.rows[0] });
  } catch (error) {
    sendError(res, error.message);
  }
}
