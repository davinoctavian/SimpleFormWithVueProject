<template>
  <div id="app">
    <FormBuying />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FormBuying from './components/FormBuying.vue';

@Component({
  components: {
    FormBuying,
  },
})
export default class App extends Vue {}
</script>
