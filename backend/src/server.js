import app from './app.js';
import { config } from './config/env.js';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`SolarCalc API running on http://localhost:${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
