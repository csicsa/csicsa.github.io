<template>
  <div class="hello">
    <h1>VB18</h1>
    <button v-on:click="signIn">Sign in</button>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import FirebaseController from '../main'
  import axios from 'axios'

  export default {
    name: 'HelloWorld',
    methods: {
      signIn: function () {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(res => {
          console.log(res)
          axios.get(res.additionalUserInfo.profile.picture.data.url, {
            responseType: 'blob'
          }).then(img => {
            this.upload(img.data, "userid");

          })
        })
      },

      upload (file, filename) {
        const firebaseController = new FirebaseController();
        this.uploadTask = firebaseController.getFirebaseApp().storage().ref('profiles/' + firebaseController.getCurrentUserId()).put(file);
        this.uploadTask.then(snapshot => {
          this.downloadURL = this.uploadTask.snapshot.downloadURL;
          this.$emit('url', this.downloadURL)
        });
        firebaseController.saveUser();
      }
    },

    watch: {
      uploadTask: function () {
        this.uploadTask.on('state_changed', sp => {
          this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
        })
      }
    },

    data()
    {
      return {
        msg: 'Welcome to Your Vue.js App',
        token: null
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
