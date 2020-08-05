
import { Conn, QueryFunc, QueryRes } from './adapter'
import { PoolClient } from 'pg';
import { v4 } from 'uuid';
import { IHandler, Message, User } from './interface'

class Handler<IHandler> {
  constructor() {
    this.conn = new Conn()
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

export const db = new Handler()
