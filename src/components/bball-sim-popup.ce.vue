<template>
    <div>
      <h2>{{ player }}</h2>
    </div>
  </template>
  
  <script>
  import { defineCustomElement } from 'vue'
  
  export default defineCustomElement({
    props: {
      player: String,
    },
    setup(props) {
      return {
        player: props.player,
      }
    },
  })
  </script>