<template>



</template>

<script>
export default {
  data() {
    return {
      datacolor:localStorage.getItem("Color")
    }
  },

  methods: {
    setColor(color){
      localStorage.setItem("Color", color)
      this.datacolor = color
    }
  }
}
</script>

<style scoped>

</style>