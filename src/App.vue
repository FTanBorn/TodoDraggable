<template>

      <!-- todo app -->
    <div class="row mt-7">
      <p>
        <a class="btn btn-light" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
           aria-controls="collapseExample">
          Özellikler
        </a>

      </p>
      <div class="collapse" id="collapseExample">
        <div class="card  card-body">
          <div class="row">
            <div class="card border-primary mb-3 m-4" style="max-width: 30rem;">
              <div class="card-header">List Name</div>
              <div class="card-body">
                <button class="btn btn-danger" @click="setColor('#e44c55')" >Red</button>
                <button class="btn btn-success" @click="setColor('#3cf281')" >Green</button>
                <button class="btn btn-light" @click="setColor('#3ab8c5')" >Blue</button>
                <button class="btn btn-dark" @click="setColor('#140223')" >Dark</button>
                <button class="btn btn-warning" @click="setColor('#ffc107')" >Warning</button>
                <button class="btn btn-secondary" @click="setColor('#8c226e')" >Secondary</button>

                <div class="mt-3 row">
                <label class="col-3" for="colorpicker">You Pick</label>
                <input class="col-6" type="color" id="colorpicker" value="#30bd61" v-on:input="this.test = $event.target.value">
                <button class="btn btn-sm btn-light col-3" @click="setColor(this.test)">Ekle</button>
                </div>
              </div>
            </div>
            <div class="card border-primary mb-3 m-4" style="max-width: 30rem;">
              <div class="card-header">Task Tema</div>
              <div class="card-body">
                <button class="btn btn-danger" @click="setColorNewTask('#e44c55')" >Red</button>
                <button class="btn btn-success" @click="setColorNewTask('#3cf281')" >Green</button>
                <button class="btn btn-light" @click="setColorNewTask('#3ab8c5')" >Blue</button>
                <button class="btn btn-dark" @click="setColorNewTask('#140223')" >Dark</button>
                <button class="btn btn-warning" @click="setColorNewTask('#ffc107')" >Warning</button>
                <button class="btn btn-secondary" @click="setColorNewTask('#8c226e')" >Secondary</button>

                <div class="mt-3 row">
                  <label class="col-3 " for="colorpickerTask">You Pick=</label>
                  <input class="col-6" type="color" id="colorpickerTask" value="#30bd61" v-on:input="this.colorpick = $event.target.value">
                  <button class="col-3  float-end btn btn-sm btn-light  " @click="setColorNewTask(this.colorpick)">Ekle</button>
                </div>
              </div>
            </div>
            <div class="card border-primary mb-3 m-4" style="max-width: 30rem;">
              <div class="card-header">Cols Tem</div>
              <div class="card-body">
                <button class="btn btn-danger" @click="setColsBackColor('#e44c55')" >Red</button>
                <button class="btn btn-success" @click="setColsBackColor('#3cf281')" >Green</button>
                <button class="btn btn-light" @click="setColsBackColor('#3ab8c5')" >Blue</button>
                <button class="btn btn-dark" @click="setColsBackColor('#140223')" >Dark</button>
                <button class="btn btn-warning" @click="setColsBackColor('#ffc107')" >Warning</button>
                <button class="btn btn-secondary" @click="setColsBackColor('#8c226e')" >Secondary</button>

                <div class="mt-3 row">
                  <label class="col-3" for="colorpickerBack">You Pick</label>
                  <input class="col-6" type="color" id="colorpickerBack" value="#30bd61" v-on:input="this.colorback = $event.target.value">
                  <button class="btn btn-sm btn-light col-3" @click="setColsBackColor(this.colorback)">Ekle</button>
                </div>



              </div>
            </div>
            <div class="card border-primary mb-3 m-4" style="max-width: 30rem;">
              <div class="card-header">Task Temp</div>
              <div class="card-body">
                <button class="btn btn-danger" @click="setNewInputBackColor('#e44c55')" >Red</button>
                <button class="btn btn-success" @click="setNewInputBackColor('#3cf281')" >Green</button>
                <button class="btn btn-light" @click="setNewInputBackColor('#3cf281')" >Blue</button>
                <button class="btn btn-dark" @click="setNewInputBackColor('#3cf281')" >Dark</button>
                <button class="btn btn-warning" @click="setNewInputBackColor('#ffc107')" >Warning</button>
                <button class="btn btn-secondary" @click="setNewInputBackColor('#8c226e')" >Secondary</button>
                <div class="mt-3 row">
                  <label class="col-3" for="colorInputBack">You Pick</label>
                  <input class="col-6" type="color" id="colorInputBack" value="#30bd61" v-on:input="this.colorInputBack = $event.target.value">
                  <button class="btn btn-sm btn-light col-3" @click="setNewInputBackColor(this.colorInputBack)">Ekle</button>
                </div>



              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  <div class="row mt-4">
      <div class="col-auto ms-4"  v-for="cont in columns" :key="cont.id">
        <apptodolist :menuname=cont  :colordate=datacolor :TaskDataColor="TaskDataColor"  :ColDataColor="ColumsBackColor" :InputDataColor="inputBackColor" ></apptodolist>
      </div>
      <div class="col-2 ms-3">
        <appnewtodolist></appnewtodolist>
      </div>
    </div>
</template>
<script>
import TodoList from "../src/components/TodoList.vue";
import newTodoList from "../src/components/newTodoList.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/firestore";
export default {
  data() {
    return {
      columns: {},
      selectedStatus: [],
      datacolor:localStorage.getItem("Color"),
      TaskDataColor:localStorage.getItem("NewTaskColor"),
      ColumsBackColor:localStorage.getItem("NewColsBackColor"),
      inputBackColor:localStorage.getItem("NewInputBackColor"),
      boards: [],
      ref: firebase.firestore().collection("todos")


    };
  },

  created() {
    this.ref.onSnapshot((querySnapshot) => {
      this.boards = [];
      querySnapshot.forEach((doc) => {
        this.boards.push({
          key: doc.id,
          status: doc.data().status,
          todo: doc.data().todo,
          description: doc.data().description
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
    setColor(color){
      localStorage.setItem("Color", color)
      this.datacolor = color
    },
    setColorNewTask(color){
      localStorage.setItem("NewTaskColor",color)
      this.TaskDataColor = color
    },
    setColsBackColor(color){
      localStorage.setItem("NewColsBackColor",color)
      this.ColumsBackColor = color
    },
    setNewInputBackColor(color){
      localStorage.setItem("NewInputBackColor",color)
      this.inputBackColor = color
    },


  },

  computed: {
    database() {
      return firebase.firestore().collection('todos');
    },

  },

  components: {
    apptodolist: TodoList,
    appnewtodolist: newTodoList,

  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

</style>