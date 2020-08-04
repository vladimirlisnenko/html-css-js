
import Pool = require('pg-pool')
import { Client, PoolClient, Query } from 'pg';
import { v4 } from 'uuid';

type Config = { user: string, password: string, host: string, port: number, database: string, ssl: boolean }

const config: Config = {
  user: "postgres",
  password: "K*3aZKFTa*gbyMr3wX",
  host: "85.143.217.139",
  port: 5432,
  database: "webchat",
  ssl: false
};

type QueryRes = {
  client: PoolClient
  res?: Array<any>
}

type QueryFunc = (client: PoolClient) => Promise<QueryRes>

class Conn {
  constructor(config: Config) {
    const pool = new Pool(config);
    this.pool = pool
  }
  pool: Pool<Client>
  async query(func: QueryFunc): Promise<Array<any>> {
    return this.pool
      .connect()
      .then(func)
      .then((res: QueryRes) => {
        res.client.release
        return res.res
      })
  }
}

type Id = string

type User = {
  id: Id
}

type Message = {
  from: User
  to: User
  content: String
}

interface IHandler {
  newMessage(msg: Message): void
  getAllMessages(): Array<Message>
}

class Handler<IHandler> {
  constructor(config: Config) {
    this.conn = new Conn(config)
  }
  private conn: Conn

  newMessage = async (msg: Message): Promise<void> => {
    var id = v4()
    let query: QueryFunc = function (client: PoolClient): Promise<QueryRes> {
      return client.query(`
        insert into messages
          (id, from_id, to_id, content)
        values 
          ($1::uuid, $2::uuid, $3::uuid, $4::text)`, [id, msg.from.id, msg.to.id, msg.content])
        .then((res) => {
          return { client }
        })
    }

    this.conn.query(query)
  }

  getAllMessages = async (): Promise<Array<Message>> => {
    let query: QueryFunc = async function (client: PoolClient): Promise<QueryRes> {
      let res = await client.query(`
        select from_id, to_id, content
          from messages
        `)
        .then((execRes) => {
          return execRes
        })
        .then((execRes) => execRes.rows)
      return { client, res }
    }

    var res = await this.conn.query(query)
    return res
  }
}

function newHandler() {
  return new Handler(config)
}

module.exports = newHandler()