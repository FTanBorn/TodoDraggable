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
            @change="updateTask"

        >
          <template #item="{ element }">

            <div class="card  mb-3 bg-warning" >
              <div class="row">
                <div class="col-8">
                  <div class="card-header bg-info">{{ element.todo }}</div>
                </div>
                <div class="col-4 mt-1 float-end">
                  <button type="button" class="btn btn-danger btn-sm me-2 float-end" @click="deleteTodoss(element.id)">Sil
                  </button>
                </div>
              </div>
              <div class="card-body btn-outline-dark">
                <p class="card-text">{{ element.description }}</p>
              </div>
            </div>
          </template>
        </draggable>
      </div>


      <div class="modal-body bg-dark btn-outline-warning">

        <form @submit.prevent="addTo">

          <div class="">
            <input placeholder="Başlık Yazınız !" type="text" class="form-control input-group-sm" REQUIRED v-model="this.netTask.todo">
          </div>
          <br>
          <div class="">
            <input placeholder="Açıklama Yazınız" type="text" class="form-control input-group-sm" v-model="this.netTask.description">
          </div>
          <br>
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-info">Ekle</button>
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
        description: "",
      },
      reg: firebase.firestore().collection("todos"),

    }
  },
  methods: {

    addTo() {
      firebase.firestore().collection("todos").add({
        status: this.menuad[0].status,
        description: this.netTask.description,
        todo: this.netTask.todo,
      })
      this.netTask = {}
      console.log("Başarılı")
    },
    deleteTodoss(doc) {
      firebase.firestore().collection("todos").doc(doc).delete().then(function () {
        console.log("Document successfully deleted!");
        location.reload()
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    },
    updateTask(doc){
      firebase.firestore().collection("todos").doc(doc.added.element.id).update({
        status : "TODOS"
      })
    }





  },



  props: ['menuad', 'deleteitem','docid'],
  components: {
    draggable

  }
}

</script>

<style>


</style>