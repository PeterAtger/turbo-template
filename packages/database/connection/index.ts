import BaseConnector from './BaseConnector';

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var connector : BaseConnector | null;
}
if (!global.connector) global.connector = new BaseConnector();

const db : BaseConnector = global.connector;

// We only need a singleton from database
export default db;
