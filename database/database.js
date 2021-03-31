import { Client, Pool, PoolClient } from "../deps.js";
import { config } from "../config/config.js";

console.log(config.database)
const connectionPool = new Pool(config.database, 3);


const executeQuery = async(query, ...params) => {
    const client = await connectionPool.connect();
    try {
        return await client.queryObject(query, ...params);
    } catch (e) {
        console.log(e);  
    } finally {
        client.release();
    }
    
    return null;
  };


export { executeQuery };
