import http from 'http';
import app from './app';


const port:string|number|undefined = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});