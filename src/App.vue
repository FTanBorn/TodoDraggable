<template>

  <div class="container mt-5 ">
    <div class="row d-flex justify-content-center">
      <form @submit.prevent="addTodo" class="d-flex justify-content-center">
        <div class="col-2 m-2">
          <label> Tablo Eklemek İçin </label>
          <input type="text" class="form-control input-group-sm " v-model="newTask.status">
        </div>

          <button class="btn btn-info ms-2 mt-4" type="submit"> +EKLE</button>
      </form>
    </div>
  </div>

  <div class="container">
    <div class="row mt-5">
      <div class="col-3" v-for="cont in columns" :key="cont.id">

        <apptodolist :menuad=cont :deleteid="cont" ></apptodolist>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row mt-5">
      <div class="col-3" v-for="i in boards" :key="i.id">
        {{ i.status}}
      </div>
    </div>
  </div>





</template>

<script>


import TodoList from "../src/components/TodoList.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/firestore";







export default {




  data() {
    return {
      columns: {},
      selectedStatus:[],
      newTask: {
        status: "",
      },
      boards:[],
      ref:firebase.firestore().collection("todos")



    };
  },
  created() {
    this.ref.onSnapshot((querySnapshot) => {
      this.boards = [];
      querySnapshot.forEach((doc) => {
        this.boards.push({
          key : doc.id,
          status : doc.data().status
        })
      })
    })

  },


  mounted() {
    this.database.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          if (!this.columns[change.doc.data().status]) {
            this.columns[change.doc.data().status] = []
          }
          this.columns[change.doc.data().status].push({
            id: change.doc.id,
            ...change.doc.data()
          })
        }
      })
    }),






    console.log("Colleciton ver =>")


  },



  methods: {
    addTodo() {
      firebase.firestore().collection("todos").add({
        status: this.newTask.status.toUpperCase(),
      })
      this.newTask = {}
      console.log("Başarılı")
    }
  },




  computed: {
    database() {
      return firebase.firestore().collection('todos');
    },

  },

  components: {
    apptodolist: TodoList,
  },


}
</script>

<style>
.on-drag {
  background-color: #1d743e;
  color: white;
  z-index: 10;
}
</style>