const express = require('express');
const bodyParser =require('body-parser');
const app = express();
const port = 3000;
const cors=require('cors');
const neo4j = require("neo4j-driver");
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "1234"));
const session = driver.session();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.listen(port, function(){
    console.log('Estoy escuchando en el siguiente puerto  '+ port +'!');
});

app.get("/cogerPaises",(req,res)=>{
    console.log("Parte de dar el Pais para hacer listado");
    var paises=[];
    var query="match(n:Nacion) return n.nombre"
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            //console.log(result.get(0));
            paises.push(result.get(0));
        },
        onCompleted: function () {
            console.log(paises.length);
            res.send(paises);
            session.close();
        
        },
        onError: function (error) {
            console.log(error + " error cojonudo");
        }
    })
});

app.post("/recomendRevista",(req,res)=>{
    console.log("Devuelve las tres revistas mas utiles");
    var subcat=req.body.subcategoria;
    //console.log(subcat);
    var revistas=[];
    var query="match (n:Journal)-[a:TIENE_ARTICULOS_SOBRE]->(s:Subcategoria) where s.nombre='"+ subcat +"' with  n order by a.valor descending limit 3 return n order by n.sjr desc"
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            //console.log(result.get(0));
            revistas.push(result.get(0));
        },
        onCompleted: function () {
            console.log(revistas.length);
            res.send(revistas);
            session.close();
        
        },
        onError: function (error) {
            console.log(error + " error cojonudo");
        }
    })
});