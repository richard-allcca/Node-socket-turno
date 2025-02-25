import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws'

interface Options {
  server: Server;
  path?: string;
}

export class WssService {

  private static _instance: WssService;
  private ws: WebSocketServer;

  constructor(options: Options) {
    const { server, path = '/ws' } = options;
    this.ws = new WebSocketServer({ server, path });
  }

  public  get instance(): WssService {
    if (!WssService._instance) {
      throw new Error('WssService not initialized');
    }
    return WssService._instance;
  }

  public static initWss(options: Options) {
    WssService._instance = new WssService(options);
  }

  public start() {

    this.ws.on('connection', (ws: WebSocket) => {
      console.log('connected');

      // ws.on('message', (message) => {
      //   console.log('received: %s', message);
      // });

      // ws.send('something');

      ws.on('close', () => {
        console.log('disconnected');
      });
    });
  }
}