<template>
  <div id="app">
    <Calculator />
    <History />
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue';
import History from './components/History.vue';

export default {
  name: 'app',
  components: {
    Calculator,
    History
  }
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  justify-content: center;
  margin-top: 6.25rem;
}
</style>
