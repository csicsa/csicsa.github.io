<template>
  <div class="hello">
    <h1>VB18</h1>
    SUCCESS

    <b-row class="my-1 col-centered" v-for="match in matches" v-if="match != null" :key="match.id">
      <b-col sm="2" class="col-centered">{{match.P1}}</b-col>
      <b-col sm="1">
        <b-form-input type="text" v-model="bets[match.id][match.P1]"></b-form-input>
      </b-col>
      <b-col sm="1">
        <b-form-input type="text" v-model="bets[match.id][match.P2]"></b-form-input>
      </b-col>
      <b-col sm="2">{{match.P2}}</b-col>
    </b-row>

    <button v-on:click="submit">Send</button>


  </div>

</template>

<script>
  import firebase from 'firebase'
  import axios from 'axios'
  import FirebaseController from '../main'

  export default {
    name: 'betting',

    mounted: function () {
      this.$data.fbController = new FirebaseController();
      const fbController = this.$data.fbController;
      fbController.getMatches().then(res => {

        this.$data.matches = res.val();
        this.$data.matches.forEach((match) => {
          if (match !== null && match.id !== null) {
            console.log(match, match.id)
            this.$data.bets[match.id] = {};
            this.$data.bets[match.id] = {[match.P1]: 0, [match.P2]: 0};
          }
        });
        console.log(this.$data.bets[2]);

      })


    },

    methods: {
      submit: function () {
        console.log(this.$data.bets)
        const fbController = this.$data.fbController;
        Object.keys(this.$data.bets).forEach(key => {
          fbController.saveBet(key, this.$data.bets[key]);
        })
//        fbController.setBet(this.)
      }
    },
    data: function () {
      return {
        matches: {},
        bets: [],
        fbController: null

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
