<template>
  <section class="pagination-container">
    <div
      :class="['arrow', 'double', currentPage === 1 ? 'disabled' : '']"
      @click="changePage('first')"
    ></div>
    <div
      :class="['arrow', currentPage === 1 ? 'disabled' : '']"
      @click="changePage('prev')"
    ></div>
    <div
      :class="[
        'page-nr',
        i < currentPage - 1 && i !== maxPages - 2
          ? 'hide'
          : i > currentPage + 1 && i !== 3
          ? 'hide'
          : '',
        currentPage === i ? 'active' : ''
      ]"
      v-for="i in +maxPages"
      :key="i"
      @click="changePage(i)"
    >
      {{ i }}
    </div>
    <div
      :class="['arrow', 'right', currentPage === maxPages ? 'disabled' : '']"
      @click="changePage('next')"
    ></div>
    <div
      :class="[
        'arrow',
        'right',
        'double',
        currentPage === maxPages ? 'disabled' : ''
      ]"
      @click="changePage('last')"
    ></div>
  </section>
</template>

<script>
export default {
  props: ['totalPages'],
  emits: ['page-changed'],
  data() {
    return {
      currentPage: 1,
      pages: this.totalPages === 0 ? 1 : this.totalPages
    };
  },

  computed: {
    maxPages() {
      return this.totalPages === 0 ? 1 : this.totalPages;
    }
  },
  methods: {
    changePage(page) {
      switch (page) {
        case 'first':
          this.currentPage = 1;
          break;
        case 'last':
          this.currentPage = this.maxPages;
          break;
        case 'prev':
          this.currentPage > 1 ? this.currentPage-- : (this.currentPage = 1);
          break;
        case 'next':
          this.currentPage < this.maxPages
            ? this.currentPage++
            : (this.currentPage = this.maxPages);
          break;
        default:
          this.currentPage = page;
      }
      this.$emit('page-changed', this.currentPage);
    }
  }
};
</script>

<style scoped>
.pagination-container {
  max-width: 18rem;
  background-color: var(--grey);
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.current-page {
  background-color: var(--grey);
  width: 2rem;
  height: 2rem;
}
.page-nr,
.arrow {
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--grey);
  cursor: pointer;
  margin: 0.25rem;
}

.arrow {
  background-image: url('../../assets/single-arrow.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 1rem;
  filter: brightness(90%);
}
.arrow.right {
  transform: rotate(180deg);
}
.arrow:first-of-type {
  margin-left: 0.5rem;
}
.arrow:last-of-type {
  margin-right: 0.5rem;
}

.arrow.double {
  background-image: url('../../assets/double-arrow.png');
}

.page-nr:hover,
.arrow:hover {
  filter: brightness(80%);
}

.page-nr.active {
  background-color: var(--yellow);
  pointer-events: none;
}

.hide {
  display: none;
}

.disabled {
  pointer-events: none;
  opacity: 0.2;
}

@media only screen and (max-width: 768px) {
  .pagination-container {
    margin-top: 0;
  }
  .page-nr,
  .arrow {
    width: 1.75rem;
    height: 1.75rem;
  }
}
</style>
