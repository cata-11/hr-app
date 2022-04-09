<template>
  <section>
    <TeamForm @teamCreated="addTeam($event)" mode="create" />
  </section>
  <section>
    <ListItems
      :items="items"
      :fields="fields"
      @itemDeleted="deleteItem($event)"
      @itemEdited="editItem($event)"
    />
  </section>
  <Teleport to="#app">
    <section class="edit-form-container" v-if="isEditMode">
      <TeamForm
        class="edit-form"
        mode="edit"
        :teamData="teamToEdit"
        :teamIdx="teamToEditIdx"
        @teamEdited="changeTeam($event)"
        @modalClosed="closeModal"
      />
    </section>
  </Teleport>
</template>

<script>
import TeamForm from '../components/forms/TeamForm.vue';
import ListItems from '../components/items/ListItems.vue';
export default {
  components: {
    ListItems,
    TeamForm
  },
  data() {
    return {
      isEditMode: false,
      teamToEdit: {},
      teamToEditIdx: null,
      fields: ['Name', 'Manager', 'Date'],
      items: [
        {
          name: 'team 1',
          manager: 'manager 1',
          date: '5-Apr-2020'
        },
        {
          name: 'team 2',
          manager: 'manager 2',
          date: '5-Apr-2020'
        },
        {
          name: 'team 3',
          manager: 'manager 3',
          date: '5-Apr-2020'
        }
      ]
    };
  },
  methods: {
    addTeam(item) {
      console.log(item);
      this.items.unshift(item);
    },
    changeTeam(item) {
      if (item.isChanged) {
        console.log('update data');
        console.log('data: ', item.data);
        console.log('idx', item.idx);
        this.items[item.idx] = { ...item.data };
      } else {
        console.log('no changes were made');
      }
      this.isEditMode = false;
    },
    deleteItem(idx) {
      this.items.splice(idx, 1);
    },
    editItem(idx) {
      this.teamToEdit = { ...this.items[idx] };
      this.teamToEditIdx = idx;
      this.isEditMode = true;

      console.log(idx);
    },
    closeModal() {
      this.isEditMode = false;
    }
  }
};
</script>

<style scoped>
:deep(.data-value) {
  width: calc((80% / 3));
}
:deep(.data-field) {
  width: calc((80% / 3));
}
</style>
