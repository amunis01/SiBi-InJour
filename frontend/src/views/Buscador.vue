<template>
  <v-app style="background: grey">
    <v-card color="indigo lighten-2" height="60px">
      <v-toolbar dark height="60px" color="teal darken-3">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title id="game">
          <v-img :src="require('../assets/logoIJ.png')" class="my-3" contain height="75" alaign="left"></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
        href="https://github.com/amunis01/SiBi-InJour"
        target="_blank"
        text
        >
        <span class="mr-2">GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      </v-toolbar>
    </v-card>
    <v-content>
        
        <v-card color="grey lighten-4" height="100px">
            <v-toolbar height="100px" color="black" dark>
            <v-toolbar-title>
                Area
                <v-combobox :items="areas" v-model="area" outlined dense rounded></v-combobox>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title>
                Categoria
                <v-combobox :items="categorias" v-model="categoria" outlined dense rounded></v-combobox>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title>
                Nación de procedencia:
                <v-combobox :items="countrys" v-model="country" outlined dense rounded></v-combobox>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title>
                Nombre o Publisher:
            <v-text-field

                outlined
                dense
                label="Introduzca el Nombre o Publisher"
                v-model="busq"
                v-on:keyup.enter="buscar()"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                
            </v-toolbar-title>
            </v-toolbar>
        </v-card>
        <v-card color="grey lighten-4" height="100px">
        <v-toolbar height="100px" color="black" dark>
          
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn @click="buscar"  v-on:click="country ='Elige Nación de procedencia',categoria ='Elige una categoria'" x-large color="light-blue">Buscar</v-btn>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn @click="mostrarTodas"  v-on:click="country ='Elige Nación de procedencia',categoria ='Elige una categoria'" x-large color="light-blue">Mostrar Todas</v-btn>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-card>
    </v-content>

    <v-content>
      <v-data-table v-if="this.tablavis" 
        :headers="headers"
        :items= revistas
        :items-per-page="10"
        :sort-by="sjr"
        :sort-desc="true"
        class="elevation-1"
      ></v-data-table>
    </v-content>

    <v-navigation-drawer temporary absolute v-model="drawer" class="grey darken-4" dark>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon large>mdi-menu</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>Menú</v-list-item-title>

        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense class="pa-0" flat>
        <v-list-item-group>
          <v-list-item v-for="item in items" :key="item.title" :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
const axios = require("axios");
const direccionIp = "http://localhost:3000";
export default {
  data() {
    return {
      name: "recomendador",
      drawer: false,
      tablavis: false,
      busq:"",
      country:"Elige Nación de procedencia",
      area:"Computer Science",
      categoria:"Elige una categoria",

      revistas: [],
      items: [
        { title: "Inicio", icon: "mdi-home", link: "/" },
        { title: "Buscador", icon: "mdi-magnify", link: "/buscador" },
        { title: "Recomendación", icon: "mdi-help", link: "/recomendador" }
      ],
       countrys: [
        "United States",
        "United Kingdom",
        "Sweden",
        "Saudi Arabia",
        "China",
        "Netherlands",
        "Switzerland",
        "Germany",
        "Taiwan",
        "South Korea",
        "Iran",
        "Egypt",
        "France",
        "Spain",
        "Romania",
        "Poland",
        "United Arab Emirates",
        "Pakistan",
        "Bahrain",
        "Norway"
      ],
      categorias: [
        "Software",
        "Computational Theory and Mathematics",
        "Artificial Intelligence",
        "Computer Networks and Communications",
        "Computer Science (miscellaneous)",
        "Computer Science Applications",
        "Computer Graphics and Computer-Aided Design",
        "Computer Vision and Pattern Recognition",
        "Hardware and Architecture",
        "Human-Computer Interaction",
        "Signal Processing",
        "Information Systems"
      ],
      areas: [
        "Computer Science"        
      ],
      headers: [
          {
            text: 'Nobre de la revista',
            align: 'start',
            sortable: false,
            value: 'nombre',
          },
          { text: 'Publisher',sortable: false, value: 'publisher' },
          { text: 'Valoració SJR (sobre 100)',sortable: true, value: 'sjr' },
          { text: 'Periodo de emisión',sortable: false, value: 'emision' },
      ]      
    };
  },
  methods: {
    buscar: function() {
      this.revistas= [];
      var params = {
        subcategoria: this.categoria,
        nacion: this.country,
        nombre: this.busq
      };
      this.busq="";
      axios.post(direccionIp+"/busquedaRevista", params).then(
        response => {
          if (response.data != "Introduzca al menos un parametro de busqueda") { 
            this.revistas=response.data;
            if(this.revistas.length != 0){
              this.tablavis=true;
            }else{
              this.tablavis=false;
              alert("No se ha encontrado ninguna revista con los parámetros especificados")
            }      
            

          } else {      
            this.tablavis=false;      
            alert(response.data)
          }
        },
      );
    },
    mostrarTodas: function(){
      this.revistas= [];
      this.busq="";
      axios.post(direccionIp+"/mostrarTodasRevista").then(
        response => {
          this.revistas=response.data;
          this.tablavis=true;
        }
      );
    }
  }
};
</script>
<style>
</style>