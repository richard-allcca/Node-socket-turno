import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';

(async()=> {
  main();
})();

function main() {
  // Crear una instancia del servidor de la aplicación
  const server = new Server({
    port: envs.PORT,
    // routes: AppRoutes.routes,
  });

  // Crear un servidor HTTP utilizando la instancia del servidor de la aplicación
  const httpServer = createServer(server.app);

  // Inicializar el servicio WebSocket con el servidor HTTP
  WssService.initWss({ server: httpServer });

  // NOTE - Inicializar las rutas luego del servicio WebSocket
  server.getServer(AppRoutes.routes);

  // Iniciar el servidor HTTP y escuchar en el puerto especificado
  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port ${ envs.PORT }`);
  });
}