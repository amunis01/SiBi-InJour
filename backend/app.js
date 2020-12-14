const express = require('express');
const bodyParser =require('body-parser');
const app = express();
const port = 3000;
const cors=require('cors');
const neo4j = require("neo4j-driver");
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "1234"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.listen(port, function(){
    console.log('Estoy escuchando en el siguiente puerto  '+ port +'!');
});

app.get("/cogerPaises",(req,res)=>{
    var session = driver.session();
    console.log("Parte de dar el Pais para hacer listado");
    var paises=[];
    var query="match(n:Nacion) return n.nombrePais"
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
            console.log(error + " error interesante");
        }
    })
});

app.get("/cogerSubcategorias",(req,res)=>{
    var session = driver.session();
    console.log("Parte de dar la Subcategoria para hacer listado");
    var subcat=[];
    var query="match(n:Subcategoria) return n"
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            //console.log(result.get(0));
            subcat.push(result.get(0));
        },
        onCompleted: function () {
            console.log(subcat.length);
            res.send(subcat);
            session.close();
        
        },
        onError: function (error) {
            console.log(error + " error interesante");
        }
    })
});

app.get("/cogerAreaa",(req,res)=>{
    var session = driver.session();
    console.log("Parte de dar el Area de estudio para hacer listado");
    var area=[];
    var query="match(n:Area) return n.nombre_area"
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            //console.log(result.get(0));
            area.push(result.get(0));
        },
        onCompleted: function () {
            console.log(area.length);
            res.send(area);
            session.close();
        
        },
        onError: function (error) {
            console.log(error + " error interesante");
        }
    })
});

app.post("/recomendRevista",(req,res)=>{
    var session = driver.session();
    console.log("Devuelve las tres revistas mas utiles");
    var subcat=req.body.subcategoria;
    var pais=req.body.nacion;
    var query="";
    var revistas=[];
    var revistasAux=[];
    if (pais!="Elige Nación de procedencia si quiere"){
        query+="match (n)-[:PAIS_PROCEDENCIA]->(p:Nacion) where p.nombrePais='"+ pais +"' with n ";
    }
    //console.log(subcat);
    
    query+="match (n:Journal)-[a:TIENE_ARTICULOS_SOBRE]->(s:Subcategoria) where s.nombreCategoria='"+ subcat +"' with  n order by a.valor descending limit 3 return n  order by n.sjr desc"
    const resultadoPromesa = session.run(query).subscribe({
        onNext: function (result) {
            //console.log(result.get(0));
            revistasAux.push(result.get(0));
        },
        onCompleted: function () {
            //console.log(revistasAux);

            for (let index = 0; index < revistasAux.length; index++) {
                var element = revistasAux[index].properties;
                console.log(element);
                revistas.push(element)
            }    
            res.send(revistas);
            session.close();
        
        },
        onError: function (error) {
            console.log(error + " error interesante");
        }
    })
});

app.post("/busquedaRevista",(req,res)=>{
    var session = driver.session();
    console.log("Buscador de revistas");

    var area=req.body.area;
    var subcat=req.body.subcategoria;
    var pais=req.body.nacion;
    var nombre_publisher=req.body.nombre;
    var datoBuscado=false;
    var queryCompleta=false;
    var query="";
    var revistas=[];
    var revistasAux=[];

    /*if(area!="Elige el area de la reviosta"){
        //Para futuro En el que haya más Areas en la base de datos
    }*/
    if (pais!="Elige Nación de procedencia"){
        query+="match (n)-[:PAIS_PROCEDENCIA]->(p:Nacion) where p.nombrePais='"+ pais +"' with n ";
        datoBuscado=true;
        console.log("a");
    }

    if(subcat!="Elige una categoria"){
        query+="match (n)-[:TIENE_ARTICULOS_SOBRE]->(p:Subcategoria) where p.nombreCategoria='"+ subcat +"' with n ";
        datoBuscado=true;
        console.log("b");
    }

    if(nombre_publisher!=""){
        query+="match (n:Journal) where n.nombre='"+nombre_publisher+"' or n.publisher='"+nombre_publisher+"' return n";
        queryCompleta=true;
        console.log("c");
    }

    if(datoBuscado==true && queryCompleta==false){
        query+= "match (n:Journal) return n";
        queryCompleta=true;
        console.log("d");
    }
    
    if(queryCompleta==true){
        const resultadoPromesa = session.run(query).subscribe({
            onNext: function (result) {
                //console.log(result.get(0));
                revistasAux.push(result.get(0));
            },
            onCompleted: function () {
               for (let index = 0; index < revistasAux.length; index++) {
                var element = revistasAux[index].properties;
                console.log(element);
                revistas.push(element)
            }    
            res.send(revistas);
            session.close();
            
            },
            onError: function (error) {
                console.log(error + " error interesante");
            }
        })
    }else{
        res.send("Introduzca al menos un parametro de busqueda");
    }
});

app.post("/mostrarTodasRevista",(req,res)=>{
    var session = driver.session();
    console.log("Mostrar todas las revistas");

    var query="";
    var revistas=[];
    var revistasAux=[];

    query+= "match (n:Journal) return n";
        
    const resultadoPromesa = session.run(query).subscribe({
            onNext: function (result) {
                //console.log(result.get(0));
                revistasAux.push(result.get(0));
            },
            onCompleted: function () {
               for (let index = 0; index < revistasAux.length; index++) {
                var element = revistasAux[index].properties;
                console.log(element);
                revistas.push(element)
            }    
            res.send(revistas);
            session.close();
            
            },
            onError: function (error) {
                console.log(error + " error interesante");
            }
        })
});    