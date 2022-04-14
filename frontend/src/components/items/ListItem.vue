<template>
  <li>
    <div class="data">
      <div v-for="(data, key) in itemData" :key="key" class="data-value">
        <div class="inline-field">
          {{ key.charAt(0).toUpperCase() + key.slice(1).toLowerCase() }}
        </div>
        <div class="inline-value">{{ data }}</div>
      </div>
    </div>
    <div class="btns">
      <base-button color="yellow" @click="editItem">Edit</base-button>
      <base-button color="red" @click="deleteItem">Delete</base-button>
    </div>
  </li>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
export default {
  props: ['item', 'idx'],
  emits: ['item-edited', 'item-deleted'],
  components: {
    BaseButton
  },
  methods: {
    editItem() {
      this.$emit('item-edited', this.idx);
    },
    deleteItem() {
      this.$emit('item-deleted', this.idx);
    }
  },
  computed: {
    itemData() {
      const formatedItem = { ...this.item };

      delete formatedItem.id;

      // //TODO: format data on fetch

      // delete formatedItem.__v;
      // delete formatedItem.updatedAt;

      // if (formatedItem.birthdate)
      //   formatedItem.birthdate = getDate(formatedItem.birthdate);

      // if (formatedItem.createdAt)
      //   formatedItem.createdAt = getDate(formatedItem.createdAt);

      // //

      return formatedItem;
    }
  }
};
</script>

<style scoped>
li {
  display: flex;
  padding: 0.5rem 1rem;
  padding-right: 0;
  box-sizing: border-box;
}
li div {
  width: 100%;
}
.data {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.data-value {
  word-wrap: break-word;
  font-size: calc(var(--font-size) - 0.25rem);
}
.btns {
  width: 20%;
  align-items: center;
  display: flex;
  justify-content: space-evenly;
}
.btns * {
  width: 40%;
}

.inline-field {
  font-size: var(--font-size);
  display: none;
}

@media only screen and (max-width: 768px) {
  li {
    flex-direction: column;
    padding: 0.5rem;
    border: 1px solid var(--blue);
    margin-bottom: 1rem;
  }
  .inline-field {
    display: block;
    width: 30%;
  }
  .inline-value {
    width: 70%;
  }
  .data {
    width: 100%;
    flex-direction: column;
  }
  .data-value {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 2rem;
    border-bottom: 1px solid var(--blue);
  }
  .btns {
    width: 60%;
    padding: 0;
    margin-top: 0.5rem;
    margin-left: auto;
    margin-right: 0;
    justify-content: flex-end;
  }
  .btns > button {
    margin-left: 0.5rem;
  }
}
</style>
