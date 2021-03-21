import express, { Application } from 'express';
import cors from "cors";
import alertRoute from '../routers/alertas';

class Server {

    private app: Application;
    private port: string;
    private apiPath = {
        alertas: '/api/alert'
    }
 
    constructor(){
        this.app  = express();
        this.port = process.env.PORT || '8000';

        this.middlewares();

        this.router();
    }

    router() {

        this.app.use( this.apiPath.alertas, alertRoute );

    }

    middlewares(){
        this.app.use(cors());

        this.app.use( express.json() );

        this.app.use( express.static('public') );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        })
    }

}

export default Server;
