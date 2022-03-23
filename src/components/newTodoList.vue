<template>
  <div class="card border-primary mb-3" style="max-width: 20rem;">
    <div class="card-body">

      <form @submit.prevent="addTodo" class="d-flex justify-content-center">
        <div class="">
          <label> Tablo Eklemek İçin </label>
          <input
              placeholder="Görev Statüsünü Giriniz"
              type="text"
              class="form-control input-group-sm"
              required
              v-model="newTask.status">
        </div>

        <button class="btn btn-info ms-2 mt-4" type="submit"> +EKLE</button>
      </form>

    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/firestore";
export default {
  data: function () {
    return {
      newTask: {
        status: "",
      },
    }
  },
  methods:{
    addTodo() {
      firebase.firestore().collection("todos").add({
        status: this.newTask.status.toUpperCase(),
      })
      this.newTask = {}
      console.log("Başarılı")
    },


  },


}
</script>

<style scoped>


</style>