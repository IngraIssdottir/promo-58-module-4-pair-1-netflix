require('dotenv').config();
//esto tiene que estar en la primera línea para que funcione el .env
// y hay que instalarlo npm install dotenv

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


//ENDPOINT

server.get("/", (req, res) => {
  res.send("Hola Adalabers!");
});

server.get('/api/movies', async (req, res) => {
  //Esta función tiene que estar fuera del get, debajo del serverPort
  async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 4000, // hay que cambiar el port al port de la base de datos
    database: 'netflix',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
  });
  await connection.connect();

  console.log(
    `Conexión establecida con la base de datos (identificador=${connection.threadId})`
  );

  return connection;
}
  console.log('Pidiendo a la base de datos de pelis.');
  let sql = `SELECT * FROM movies`;

  const connection = await getConnection();
  const [results, fields] = await connection.query(sql);
  res.json(results);
  connection.end();



});


/*async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 4000,
    database: 'netflix',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
  });
  await connection.connect();

  console.log(
    `Conexión establecida con la base de datos (identificador=${connection.threadId})`
  );

  return connection;
}*/

const fakeMovies = [
  {
    id: 1,
    title: "Wonder Woman",
    genre: "Action",
    image:
      "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/12/gal-gadot-como-wonder-woman-universo-extendido-dc-2895594.jpg?tf=3840x",
    category: "Superhero",
    year: 2017,
    director: "Patty Jenkins",
  },
  {
    id: 2,
    title: "Inception",
    genre: "Science Fiction",
    image:
      "https://m.media-amazon.com/images/S/pv-target-images/e826ebbcc692b4d19059d24125cf23699067ab621c979612fd0ca11ab42a65cb._SX1080_FMjpg_.jpg",
    category: "Thriller",
    year: 2010,
    director: "Christopher Nolan",
  },
];

server.get("/api/movies", (req, res) => {
  console.log("GET /api/movies");

  res.json({
    success: true,
    movies: fakeMovies,
  });

  // Devolvemos el array de objetos con los datos de animes

  // como un JSON (Express hará el stringify por nosotras):

  // OTROS TIPOS DE RESPUESTA:

  // res.send(data);  --> Envía como texto

  // res.render();  --> Servidor de ficheros dinámicos

  // res.sendFile()  --> Servidor de ficheros estáticos
});
