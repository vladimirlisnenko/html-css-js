import Pool = require('pg-pool')
import { Client, PoolClient, Query } from 'pg';

type Config = { user: string, password: string, host: string, port: number, database: string, ssl: boolean }

const config: Config = {
    user: "postgres",
    password: "K*3aZKFTa*gbyMr3wX",
    host: "85.143.217.139",
    port: 5432,
    database: "webchat",
    ssl: false
};


export class Conn {
    constructor() {
        const pool = new Pool(config);
        this.pool = pool
    }
    pool: Pool<Client>
    async query(func: QueryFunc): Promise<Array<any>> {
        return this.pool
            .connect()
            .then(func)
            .then((res: QueryRes): Array<any> => {
                res.client.release
                return res.res || []
            })
    }
}

export type QueryFunc = (client: PoolClient) => Promise<QueryRes>

export type QueryRes = {
    client: PoolClient
    res?: Array<any>
}
