import app from './app';
import { config } from './config';

app.listen(config.port, () => {
    console.log(`Server is running in ${config.env} mode on port ${config.port}`);
});
