<template>

  <div class="">
    <div class="card border-primary mb-3" style="">
      <div>
        <div class="card-header bg-primary text-center ">
          <div class="row">
            <div class="col-10 text-center mt-1 h4 ">
              <b>
                {{ menuname[0].status }}

              </b>

            </div>
            <div class="col-2 mt-1 float-end">
              <button type="button" class="btn  btn-danger btn-sm  float-end" @click="deleteTodoss(menuname[0].id)">
                Delete
              </button>
            </div>
          </div>

        </div>
      </div>
      <div>
        <div class="card-body">
          <draggable
              :list="menuname"
              group="todosapp"
              ghostClass="on-drag"
              animation="400"
              @change="dragTask"

          >

            <template #item="{ element }">
              <div class="card  mb-3 bg-warning">
                <div class="row">
                  <div class="col-8">

                    <input
                        :value="element.todo"
                        type="text"
                        class="form-control input-group-sm"
                        v-on:input="this.netUpdateTodo.updatetodo = $event.target.value"
                        @keyup.enter="updateTodo(element.id)">
                  </div>
                  <div class="row col-4">

                      <button type="button" class="btn btn-danger btn-sm ps-2 " @click="deleteTodoss(element.id)">
                        Del
                      </button>

                  </div>

                </div>
                <div class=" btn-outline-dark">
                  <input
                      :value="element.description"
                      type="text"
                      class="form-control input-group-sm"
                      v-on:input="this.netUpdateDescription.updateDescription = $event.target.value"
                      @keyup.enter="updateDescription(element.id)"
                  >
                </div>
              </div>
            </template>

          </draggable>
        </div>

      </div>
      <!-- Görev Ekle -->
      <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample">
        Görev Ekle
      </a>

      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          <div class="modal-body bg-dark btn-outline-warning">
            <form @submit.prevent="addTo">
              <div class="">
                <input placeholder="Başlık Yazınız !" type="text" class="form-control input-group-sm" REQUIRED
                       v-model="this.netTask.todo">
              </div>
              <br>
              <div class="">
                <input placeholder="Açıklama Yazınız" type="text" class="form-control input-group-sm"
                       v-model="this.netTask.description">
              </div>
              <br>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-info">Ekle</button>
              </div>
            </form>

          </div>

        </div>
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
      netTask: {
        status: "",
        todo: "",
        description: "",
      },

      netUpdateTodo:{
        updatetodo: "",
      } ,
      netUpdateDescription:{
        updateDescription: "",
      }



    }
  },
  methods: {

    addTo() {
      firebase.firestore().collection("todos").add({
        status: this.menuname[0].status,
        description: this.netTask.description,
        todo: this.netTask.todo,
      })
      this.netTask = {}
      console.log("successfully!!")
    },
    deleteTodoss(doc) {
      firebase.firestore().collection("todos").doc(doc).delete().then(function () {
        console.log("Document successfully deleted!");
        location.reload()
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    },

    updateTodo(doc){
      firebase.firestore().collection("todos").doc(doc).update({
        todo : this.netUpdateTodo.updatetodo
      });
      console.log("Değiştirildi")

    },
    updateDescription(doc){
      firebase.firestore().collection("todos").doc(doc).update({
        description : this.netUpdateDescription.updateDescription
      });
      console.log("Description Değiştirildi")

    },

    dragTask(doc) {
      firebase.firestore().collection("todos").doc(doc.added.element.id).update({
        status: this.menuname[0].status
      });
    },




  },


  props: ['menuname', 'deleteitem', 'docid'],
  components: {
    draggable

  }
}

</script>

<style scoped>



</style>