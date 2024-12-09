const pool = require('../utils/db');

const ROLE = {
    USER: 'user',
    ADMIN: 'admin',
};

const getAll = async () => {
    try {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const create = async ({ email, password, role = ROLE.USER }) => {
    try {
        const result = await pool.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
            [email, password, role]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const update = async (id, { email, password, role }) => {
    try {
        const result = await pool.query(
            'UPDATE users SET email = $1, password = $2, role = $3 WHERE id = $4 RETURNING *',
            [email, password, role, id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteById = async (id) => {
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
    } catch (error) {
        throw error;
    }
};

const getByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    ROLE, 
    getAll,
    getById,
    create,
    update,
    deleteById,
    getByEmail,
};
