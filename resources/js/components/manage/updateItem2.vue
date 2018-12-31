<template>
<div class="jumbotron" v-if="editingUser">
    <h2>Edit User</h2>
    <form>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="name" style="width: 115px;"><i class="fas fa-user"></i>&nbsp;Name</label>
            </div>
            <input type="text" class="form-control" id="name" v-model="currentUser.name">
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="email" style="width: 115px;"><i class="fas fa-at"></i>&nbsp;Email</label>
            </div>
            <input type="email" class="form-control" id="email" v-model="currentUser.email">
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="age" style="width: 115px;"><i class="fas fa-calendar"></i>&nbsp;Age</label>
            </div>
            <input type="number" class="form-control" id="age" v-model="currentUser.age">
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="departmentSelect" style="width: 115px;"><i class="fas fa-building"></i>&nbsp;Department</label>
            </div>
            <select class="custom-select" id="departmentSelect" v-model="currentUser.department_id">
                <option v-for="department in departments" :value="department.id" :key="department.id">{{department.name}}</option>
            </select>
        </div>

        <div class="container">
            <button @click.prevent="saveUser()" class="btn btn-primary">Save</button>
            <button @click.prevent="cancelEdit()" class="btn btn-dark">Cancel</button>
        </div>
    </form>
</div>
</template>

<script>
module.exports = {
  props: ["currentUser", "editingUser", "departments"],
  data: function() {
    return {};
  },
  methods: {
    saveUser: function() {
      this.$emit("save-user");
    },
    cancelEdit: function() {
      this.$emit("cancel-edit");
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>