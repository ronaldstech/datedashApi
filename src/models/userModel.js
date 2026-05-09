const db = require('../config/db');

class UserModel {
    static async getAll(){
        const sql = "SELECT * FROM users";

        const [rows] = await db.query(sql);

        return rows;
    }
}