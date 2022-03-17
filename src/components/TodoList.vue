<template>

  <div class="">
    <div class="card border-primary mb-3" style="">
      <div>
        <div class="card-header bg-primary text-center ">
          {{ menuad[0].status }}
        </div>
      </div>
      <div class="card-body">
        <draggable
            :list="menuad"
            group="todosapp"
            ghostClass="on-drag"
            animation="400"
        >
          <template #item="{ element }">
            <div style="border: solid 1px black" class="mt-1 card bg-info">
              <div class="text-center bg-secondary">
                {{ element.todo }} {{ index}}
              </div>
              <div class="">
                {{ element.description}}
              </div>
            </div>
          </template>
        </draggable>


      </div>

      <div class="modal-body bg-dark btn-outline-warning">

        <form @submit.prevent="addTo">
          <div class="">
            <label> Görevi Yazınız </label>
          </div>
          <div class="">
            <input type="text" class="form-control input-group-sm" v-model="this.netTask.todo" >
          </div>
          <div class="">
            <label> Açıklama Yazınız </label>
          </div>
          <div class="">
            <input type="text" class="form-control input-group-sm" v-model="this.netTask.description" >
          </div>
          <div class="">
            <button type="submit" class="btn btn-info" >Ekle</button>
          </div>
        </form>

      </div>

    </div>
  </div>


</template>


<script>

import draggable from "vuedraggable";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/firestore";


export default {

  data() {
    return {
      tester: [],
      netTask: {
        status: "",
        todo: "",
        description:"",
      },
    }
  },
  methods:{

    addTo() {
      firebase.firestore().collection("todos").add({
        status: this.menuad[0].status,
        description:this.netTask.description,
        todo: this.netTask.todo,
      })
      this.netTask = {}
      console.log("Başarılı")
    }


  },
  created() {
  },


  props: ['menuad','value'],
  components: {
    draggable

  }
}

</script>

<style>


</style>