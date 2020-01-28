<template>
  <ul class="history-list">
    <li v-for="({ equation, date }, index) in history" :key="index">
      <div>{{ equation }}</div>
      {{ formatDate(date) }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'History',
  computed: {
    history() {
      return this.$store.state.history;
    }
  },

  created() {
    this.$store.dispatch('getHistory');
  },

  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);

      return date.toISOString().slice(0, 10);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/variables.scss';

.history-list {
  margin-left: 1rem;
  width: 18.75rem;
  list-style: none;
  background: $dark-gray;
  color: white;
  max-height: 38.75rem;
  overflow: auto;

  li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;

    &:hover {
      background: $gray;
    }
  }
}
</style>
