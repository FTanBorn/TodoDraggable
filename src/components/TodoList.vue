<template>
  <div class="">
    <div class="card mb-3" :style="{boxshadow: '3px'+shadow}">

      <div>
        <div  class="card-header text-center" :style="{backgroundColor : colordate}">
          <div class="row">
            <div class="col-10 text-center mt-1 h4 ">
              <b>
                {{ menuname[0].status }}
              </b>
            </div>
            <!--  Delete TaskList  -->
            <div class="col-2 mt-1 float-end">
              <button type="button" class="btn  btn-danger btn-sm  float-end" @click="deleteTodoss(menuname[0].id)">
                Sil

              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!-- Draggable  -->

        <div class="card-body" :style="{backgroundColor:ColDataColor}">
          <draggable
              :list="menuname"
              group="todosapp"
              ghostClass="on-drag"
              animation="1000"
              @change="dragTask"

          >

            <template #item="{ element }">
              <div class="card  mb-3 bg-dark">
                <div class="row">

                  <!-- Input  todo  -->

                  <div class="col-auto">

                    <input
                        placeholder="Başlık Giriniz"
                        :value="element.todo"
                        type="text"
                        :style="{backgroundColor:InputDataColor}"
                        class="form-control input-group-sm"
                        v-on:input="this.netUpdateTodo.updatetodo = $event.target.value"
                        @keydown.enter="updateTodo(element.id)"
                        style="width: 120%;border-radius: unset"
                    >
                  </div>
                  <!-- Delete Task Div  -->

                  <div class="col-auto">
                      <button type="button" class="btn  btn-danger" @click="deleteTodoss(element.id)">
                        Sil
                      </button>
                  </div>
                </div>
                <!-- Text Area Description  -->
                <div class=" ">
                  <textarea
                      placeholder="Açıklama Giriniz"
                      :value="element.description"
                      type="text"
                      :style="{backgroundColor:InputDataColor}"
                      class="form-control input-group-sm"
                      v-on:input="this.netUpdateDescription.updateDescription = $event.target.value"
                      @keydown.enter="updateDescription(element.id)"
                      style="border-radius: unset;height: border-box"
                  ></textarea>
                </div>
              </div>
            </template>
          </draggable>
        </div>

      </div>
      <!-- New Task Add  -->

      <button class="btn btn-sm btn-light" :style="{backgroundColor : TaskDataColor}"  @click="addTo">Görev Ekle</button>







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
      console.log("Change")
    },
    updateDescription(doc){
      firebase.firestore().collection("todos").doc(doc).update({
        description : this.netUpdateDescription.updateDescription
      });
      console.log("Description Change")

    },
    dragTask(doc) {
      firebase.firestore().collection("todos").doc(doc.added.element.id).update({
        status: this.menuname[0].status
      });
    },




  },
  props: ['menuname', 'colordate','TaskDataColor','ColDataColor','InputDataColor','shadow'],

  components: {
    draggable,

  },

  created() {

  }
}

</script>

<style scoped>



</style>