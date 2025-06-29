import { log } from '@repo/logger';
import { createServer } from './server';
import { pokedexService } from './modules/pokedex/pokedex.service';

const port = process.env.PORT || 5001;

async function startServer() {
  try {
    // Initialize Pokédex data on startup
    await pokedexService.loadData();

    const server = createServer();

    server.listen(port, () => {
      log(`api running on ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
