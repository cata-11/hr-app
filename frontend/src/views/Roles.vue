<template>
  <section>
    <RoleForm @roleCreated="addRole($event)" mode="create" />
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
      <RoleForm
        class="edit-form"
        mode="edit"
        :roleData="roleToEdit"
        :roleIdx="roleToEditIdx"
        @roleEdited="changeRole($event)"
        @modalClosed="closeModal"
      />
    </section>
  </Teleport>
</template>

<script>
import RoleForm from '../components/forms/RoleForm.vue';
import ListItems from '../components/items/ListItems.vue';

export default {
  components: {
    RoleForm,
    ListItems
  },
  data() {
    return {
      isEditMode: false,
      roleToEdit: {},
      roleToEditIdx: null,
      fields: ['Name', 'Date'],
      items: [
        {
          name: 'role 1',
          date: '25-Apr-2022'
        },
        {
          name: 'role 2',
          date: '25-Nov-2022'
        },
        {
          name: 'role 3',
          date: '25-Mar-2022'
        }
      ]
    };
  },
  methods: {
    addRole(item) {
      this.items.unshift(item);
    },
    changeRole(item) {
      if (item.isChanged) {
        this.items[item.idx] = { ...item.data };
      } else {
        //
      }
      this.isEditMode = false;
    },
    deleteItem(idx) {
      this.items.splice(idx, 1);
    },
    editItem(idx) {
      this.roleToEdit = { ...this.items[idx] };
      this.roleToEditIdx = idx;
      this.isEditMode = true;

      idx;
    },
    closeModal() {
      this.isEditMode = false;
    }
  }
};
</script>

<style scoped>
:deep(.data-value) {
  width: calc((80% / 2));
}
:deep(.data-field) {
  width: calc((80% / 2));
}

@media only screen and (max-width: 768px) {
  :deep(.data-value) {
    width: 100%;
  }
}
</style>
