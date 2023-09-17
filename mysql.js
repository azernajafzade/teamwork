const express = require ("express");
const mysql = require ("mysql2");
const cors = require ("cors");

const app = express();
app.use(express.json());
app.use (cors());


let connection = mysql.createConnection({
    host: "bbsdmqdvdb1pozinypqt-mysql.services.clever-cloud.com",
    user: "u8fjn2v4jc8y6vio",
    password: "Cbci5khy4rMbIRJW9sWP",
    database: "bbsdmqdvdb1pozinypqt",
  });

  app.get("/", function (req, res) {    
    connection.query("select * from users", function (err, result, fields) {
        console.log(result);
        console.log(err)    
      res.send(result);
    });
  });

  app.get("/:id", (req, res) => {
    const elem = req.params;
    // sql id get method
    connection.query("select * from users", function (err, result, fields) {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        if (elem.id == result[i].ID) {
          res.send(result[i]);
        }
      }
    });
  });


  app.delete("/:id", (req, res) => {
    const elem = req.params.id;
    
    connection.query(
      `DELETE FROM data1 WHERE id=${elem}`,
      function (err, result, fields) {
        console.log(result);
      }
    );
  });

  app.post("/", (req, res) => {
    let obj = req.body;

    connection.query(
      `INSERT INTO users (id, ad, soyad, parol)
      VALUES ("${obj.id}", "${obj.ad}", "${obj.soyad}", "${obj.parol}")`,
      function (err, result, fields) {
        //   console.log(result);
        //   app.get("/users", function (req, res) {
        //     res.send(result);
        //   });
      }
    );
  });
//salam
  app.listen(process.env.PORT || 3000)