import config from "config";
import logger from "../utils/logger";

const sqlite3 = require('sqlite3').verbose();

const connect = async () => {
    const db_url = config.get<string>('db_url');

    let db = new sqlite3.Database(db_url, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: Error) => {

    if (err) {
        logger.error(err.message);
        throw new Error(err.message); 
    }
        
    logger.info(`Connected to the database at ${db_url}`);
});
}

export default connect


