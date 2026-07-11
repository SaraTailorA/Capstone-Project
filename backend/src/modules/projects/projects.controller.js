import { query } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/responses.js';

export async function getProjects(req, res) {
  try {
    const result = await query(
      'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    sendSuccess(res, { projects: result.rows });
  } catch (error) {
    sendError(res, error.message);
  }
}

export async function getProject(req, res) {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM projects WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Proyecto no encontrado', 404);
    }

    sendSuccess(res, { project: result.rows[0] });
  } catch (error) {
    sendError(res, error.message);
  }
}

export async function createProject(req, res) {
  try {
    const { name, location, property_type, monthly_kwh, results } = req.body;

    if (!name || !monthly_kwh) {
      return sendError(res, 'Nombre y consumo mensual son obligatorios', 400);
    }

    const result = await query(
      `INSERT INTO projects (user_id, name, location, property_type, monthly_kwh, panels_count, panels_watt, inverter_kw, system_cost, monthly_savings, roi_months, co2_reduction)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        req.user.id,
        name,
        location || null,
        property_type || 'residential',
        monthly_kwh,
        results?.panelsCount || null,
        results?.panelWattage || null,
        results?.inverterKw || null,
        results?.cost?.total || null,
        results?.monthlySavings || null,
        results?.roiMonths || null,
        results?.co2Reduction || null,
      ]
    );

    sendSuccess(res, { project: result.rows[0] }, 201);
  } catch (error) {
    sendError(res, error.message);
  }
}

export async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const result = await query(
      'DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Proyecto no encontrado', 404);
    }

    sendSuccess(res, { message: 'Proyecto eliminado' });
  } catch (error) {
    sendError(res, error.message);
  }
}
