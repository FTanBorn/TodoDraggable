<template>

  <div class="">
    <div class="card border-primary mb-3" style="">

      <div class >
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

              <div class="text-center">
                {{ element.todo }} {{ index}}

              </div>
              <div class="card-body bg-black">
                {{ element.description}}
              </div>
            </div>
          </template>
        </draggable>


      </div>
      <button class="btn btn-danger">Görev Ekle</button>


    </div>
  </div>

</template>


<script>

import draggable from "vuedraggable";
import {db} from "@/main";

export default {

  data() {
    return {
      tester: [],
    }
  },
  methods:{
    deleteToDo() {
      db.collection("todos").doc().delete()
    }

  },


  props: ['menuad','deleteid'],
  components: {
    draggable

  }
}

</script>

<style>


</style>