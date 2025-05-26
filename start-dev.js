// Script para iniciar o servidor em modo desenvolvimento (funciona no Windows)
import { spawn } from 'child_process';

// Define a variável de ambiente
process.env.NODE_ENV = 'development';

// Inicia o servidor
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, NODE_ENV: 'development' }
});

server.on('error', (error) => {
  console.error('Erro ao iniciar o servidor:', error);
});

server.on('close', (code) => {
  console.log(`Servidor finalizado com código ${code}`);
});