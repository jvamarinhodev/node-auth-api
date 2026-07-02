import { app } from './app.js';

const port = process.env.PORT || 5050;

app.listen(port, () => {
  const date = new Date();
  const realTime = date.toLocaleString('pt-br', {
    hour: '2-digit',
    minute: '2-digit',
  });
  console.log(`🚀 Client running in port: ${port} / time: ${realTime}`);
});
