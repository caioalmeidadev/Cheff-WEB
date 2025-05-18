import Firebird, { Options } from 'node-firebird'
import { env } from '../env'

const dbOptions: Options = {
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  database: env.DB_PATH,
  user: env.DB_USER,
  password: env.DB_PWD,
  lowercase_keys: true, // set to true to lowercase keys
  pageSize: 4096,        // default when creating database
  retryConnectionInterval: 1000, // reconnect interval in case of connection drop
  blobAsText: true, // set to true to get blob as text, only affects blob subtype 1
  encoding: 'UTF8', // default encoding for connection is UTF-8  

}

async function executeQuery(sql: string, params: any[]): Promise<any[]> {

  let data = [];

  return new Promise((resolve, reject) => {

    Firebird.attach(dbOptions, function (err, base) {

      if (err) { reject(err) }


      base.query(sql, params, function (err, result) {

        if (err)
          reject(err)

        base.detach()


        data = result

        resolve(data)

      })


    })
  })

}

async function executeCommand(sql: string, params: any[]) {
  return new Promise((resolve, reject) => {
    Firebird.attach(dbOptions, (err, db) => {
      if (err)
        reject(err)

      db.query(sql, params, function (err, result) {

        if (err)
          reject(err)

        db.detach()

        resolve({})
      })
    })
  })


}

export { executeQuery, executeCommand };
