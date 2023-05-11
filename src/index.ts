import { PORT } from './setup/env';
import server from './server';
import { setupDatabase, disconnectDatabase } from './setup/database';
import logger from './setup/logger';

await setupDatabase();

const serverListener = server.listen(PORT, () => {
  logger.info('Listening on :' + PORT);
});

async function closeServer() {
  logger.info('Shutting down.');
  serverListener.close();
  await disconnectDatabase();
}

process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
