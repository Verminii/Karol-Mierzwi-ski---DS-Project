<template>
  <div id="app">
    <div id="sideMenu">
      <div class="image" v-for="cover in covers" :key="cover.id">
        <img
          :src="getImgUrl(cover)"
          class="image"
          v-on:click="click(cover.id)"
        />
      </div>
    </div>
    <div id="mainMenu">
      <h1>mp3 player cz.1 - files</h1>
      <table>
        <tr v-for="song in songs" :key="song.id">
          <td>{{ song.dire }}</td>
          <td>{{ song.name }}</td>
          <td>{{ song.size }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    songs() {
      return this.$store.getters.getAllSongs;
    },
    albums() {
      return this.$store.getters.getAllAlbums;
    },
    covers() {
      return this.$store.getters.getAllCovers;
    },
  },
  methods: {
    getImgUrl: function (cover) {
      return "http://localhost:3000/covers/" + cover;
    },
    click: function (id) {
      fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ info: "NEXT", album: id }), //treść wysyłana
      })
        .then((res) => res.json())
        .then((data) => {
          this.albums = JSON.parse(data.dires);
          this.covers = JSON.parse(data.covers);
          this.songs = JSON.parse(data.files);
          console.log(data);
        });
    },
  },
  created() {
    this.$store.dispatch("onload");
  },
};
</script>

<style>
#sideMenu {
  position: absolute;
  width: 15vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: blue;
  overflow-y: scroll;
}

#mainMenu {
  position: absolute;
  width: 85vw;
  height: 100vh;
  top: 0;
  left: 15vw;
  overflow-y: scroll;
}

#mainMenu > h1 {
  text-align: center;
  color: blue;
  font-size: 50px;
}

tr,
td {
  text-align: center;
  color: grey;
  font-size: 20px;
}

table {
  width: 100%;
}

.image {
  width: 100%;
  height: 200px;
}
</style>
