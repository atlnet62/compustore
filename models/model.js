import pool from "../database/db.js";

class Model {

    static async getAllDatas(query) {
        const [result] = await pool.execute(query);
        return result;
    }

    static async getDataByKey({query, key}) {
        const [result] = await pool.execute(query, [key]);
        console.log([result]);
        return result;
    }

    static async delDataByKey({query, key}) {
        const [result] = await pool.execute(query, [key]);
        return result;
    }

    static async saveData(query, datas) {
        const [result] = await pool.execute(query, [...Object.values(datas)]);
        return result;
    }
}

export default Model;