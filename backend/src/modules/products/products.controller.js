import { query } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/responses.js';

export async function getProducts(req, res) {
  try {
    const { category, search, sort, page = 1, limit = 12 } = req.query;

    let sql = 'SELECT * FROM products WHERE is_available = true';
    const params = [];
    let paramIndex = 1;

    if (category && category !== 'all') {
      sql += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (search) {
      sql += ` AND (name ILIKE $${paramIndex} OR brand ILIKE $${paramIndex} OR model ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (sort === 'price-asc') sql += ' ORDER BY price ASC';
    else if (sort === 'price-desc') sql += ' ORDER BY price DESC';
    else if (sort === 'rating') sql += ' ORDER BY rating DESC';
    else sql += ' ORDER BY name ASC';

    const offset = (page - 1) * limit;
    sql += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(sql, params);

    const countResult = await query('SELECT COUNT(*) FROM products WHERE is_available = true');

    sendSuccess(res, {
      products: result.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      pages: Math.ceil(countResult.rows[0].count / limit),
    });
  } catch (error) {
    sendError(res, error.message);
  }
}

export async function getProduct(req, res) {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return sendError(res, 'Producto no encontrado', 404);
    }

    sendSuccess(res, { product: result.rows[0] });
  } catch (error) {
    sendError(res, error.message);
  }
}
