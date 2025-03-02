import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  // routes: Router; // NOTE - Comentado para inicializar primero el server de wws en app.ts
  public_path?: string;
}


export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  // private readonly routes: Router; // NOTE - Comentado para inicializar primero el server de wws en app.ts

  constructor(options: Options) {
    const { port, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    // this.routes = routes; // NOTE - Comentado para inicializar primero el server de wws en app.ts

    // Configuración del servidor al instanciar
    this.configure();
  }

  public getServer(router: Router) {
    this.app.use(router);
  }

  private configure(){
    //* Middlewares
    this.app.use( express.json() ); // raw
    this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded

    //* Public Folder
    this.app.use( express.static( this.publicPath ) );

    //* Routes
    // this.app.use( this.routes ); // NOTE -  Comentado para inicializar primero el server de wws en app.ts

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    this.app.get(/^\/(?!api).*/, (req, res) => {
      const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
      res.sendFile(indexPath);
    });
  }


  async start() {

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}
