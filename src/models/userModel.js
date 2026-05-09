const db = require('../config/db');

class UserModel {
    static async getAll(){
        const sql = "SELECT * FROM users";

        const [rows] = await db.query(sql);

        return rows;
    }

    static async getById(id){
        const sql = "SELECT * FROM users WHERE id = ?";

        const [rows] = await db.query(sql, [id]);

        return rows[0];
    }

    static async create(data){
        const sql = `
            INSERT INTO users(name, email, phone, password)
            VALUES(?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            data.username,
            data.email,
            data.phone,
            data.password
        ]);

        return result;
    }

    static async update(id, data){
        const sql = `
            UPDATE users SET name=?, email=?, phone=?, password=? WHERE id=?
        `;

        const [result] = await db.query(sql, [
            data.username,
            data.email,
            data.phone,
            data.password,
            id
        ]);

        return result;
    }

    static async delete(id) {
        const sql = `
            DELETE FROM users WHERE id=?
        `;
        const [result] = await db.query(sql, [id]);

        return result;
    }
}

module.exports = UserModel;