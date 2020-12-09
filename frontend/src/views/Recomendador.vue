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
        href="https://github.com/amunis01/SiBi-InJou"
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
                <v-combobox :items="areas" v-model="area"  outlined dense ></v-combobox>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title>
                Categoria
                <v-combobox :items="categorias" v-model="categoria"  outlined dense ></v-combobox>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title>
                Nación de procedencia:
                <v-combobox :items="countrys" v-model="country" outlined dense ></v-combobox>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="recomendar" v-on:click="country ='Elige Nación de procedencia si quiere',categoria ='Eliga una categoria'" x-large color="light-blue">Recomendar</v-btn>
            <v-spacer></v-spacer>
            </v-toolbar>
             
        </v-card>
        
    </v-content>

    <v-content>
      <v-data-table v-if="this.tablavis"
        :headers="headers"
        :items= revistas
        :items-per-page="3"
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
     
      country:"Elige Nación de procedencia si quiere",
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
      ]      
    };
  },
  methods: {
    recomendar: function() {
      this.revistas= [];
      var params = {
        subcategoria: this.categoria,
        nacion: this.country,
      };
      axios.post(direccionIp+"/recomendRevista", params).then(
        response => {
          if (response.data != 0) { 
            this.revistas=response.data;
            this.tablavis=true;
            console.log(response.data);

          } else {      
            this.tablavis=false;      
            alert("No se ha podido encontrar niguna revista con los datos especificados")
          }
        },
      );
    },
  }
};
</script>
<style>
</style>