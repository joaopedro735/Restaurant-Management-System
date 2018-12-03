<template>
    <div v-if="dadosPessoais" class="col-md-9">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <form>
                            <div class="form-group row">
                                <label for="username" class="col-4 col-form-label">Nome de utilizador</label>
                                <div class="col-8">
                                    <input id="username" name="username" v-model="user.username" :disabled="!editingUser" class="form-control here" type="text">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="name" class="col-4 col-form-label">Nome completo</label>
                                <div class="col-8">
                                    <input id="fullname" name="fullname" v-model="user.name" :disabled="!editingUser" class="form-control here" type="text">
                                </div>
                            </div>


                            <div class="form-group row">
                                <label for="email" class="col-4 col-form-label">Email</label>
                                <div class="col-8">
                                    <input id="email" name="email" v-model="user.email" disabled class="form-control here" type="text">
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="offset-4 col-8">
                                    <button v-if="showEnableEditingButton" @click.prevent="enableEdit()" class="btn btn-primary">Atualizar</button>
                                    <button v-if="showSaveChangesButton" @click.prevent="saveUser()" class="btn btn-primary">Guardar</button>
                                    <button v-if="showSaveChangesButton" @click.prevent="cancelEditUser()" class="btn btn-danger">Cancelar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['dadosPessoais', 'user'],
        data: function() {
            return {
                editingUser: false,
                showSaveChangesButton: false,
                showEnableEditingButton: true
            };
        },
        methods: {
            enableEdit: function() {
                this.editingUser = true;
                this.showSaveChangesButton = true;
                this.showEnableEditingButton = false;
            },
            saveUser: function() {
                this.editingUser = false;
                this.showSaveChangesButton = false;
                this.showEnableEditingButton = true;
                
                // TODO: Validar campos

                this.$emit("save-user");
            },
            cancelEditUser: function() {
                this.editingUser = false;
                this.showSaveChangesButton = false;
                this.showEnableEditingButton = true;
            }
        },
        mounted() {}
    }

</script>

<style scoped>

</style>
