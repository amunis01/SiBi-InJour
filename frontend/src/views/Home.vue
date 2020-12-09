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
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logoIJ.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Página de recomendación y busqueda de revistas de investigación
        </h1>
      </v-col>

    </v-row>
    <v-row
    align="center"
    justify="space-around"
    >
      <v-btn @click="$router.push('/buscador')" x-large color="light-blue" dark>Buscador</v-btn>
      <v-btn @click="$router.push('/recomendador')" x-large color="light-blue" dark>Recomendación</v-btn>
    </v-row>
    
  </v-container>
    

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
export default {
  data() {
    return {
      name: "home",
      drawer: false,
     
      items: [
        { title: "Inicio", icon: "mdi-home", link: "/" },
        { title: "Buscador", icon: "mdi-magnify", link: "/buscador" },
        { title: "Recomendación", icon: "mdi-help", link: "/recomendador" }
      ],
     
      limits: ["Top 3", "Top 5", "Top 10", "Top 15", "Top 20", "Top 30"],
      historial: []
    };
  },
  
};
</script>
<style>
</style>