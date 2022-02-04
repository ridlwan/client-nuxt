<template>
    <div>
        <div class="form-group">
            <label for="">First Name</label>
            <input
                type="text"
                class="form-control"
                v-model="users.firstName"
                :class="{ 'is-invalid': errors.firstName }"
            />
            <p class="text-danger" v-if="errors.firstName">
                {{ errors.firstName[0] }}
            </p>
        </div>
        <div class="form-group">
            <label for="">Last Name</label>
            <input
                type="text"
                class="form-control"
                v-model="users.lastName"
                :class="{ 'is-invalid': errors.lastName }"
            />
            <p class="text-danger" v-if="errors.lastName">{{ errors.lastName[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Username</label>
            <input
                type="text"
                class="form-control"
                v-model="users.username"
                :class="{ 'is-invalid': errors.username }"
            />
            <p class="text-danger" v-if="errors.username">
                {{ errors.username[0] }}
            </p>
        </div>
        <div class="form-group">
            <label for="">Email</label>
            <input
                type="text"
                class="form-control"
                v-model="users.email"
                :class="{ 'is-invalid': errors.email }"
            />
            <p class="text-danger" v-if="errors.email">{{ errors.email[0] }}</p>
        </div>
        <button class="btn btn-primary btn sm" @click="submit">Save</button>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    created() {
        if (this.$route.name == "users-edit-id") {
            this.users = {
                id: this.user.id,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                username: this.user.username,
                email: this.user.email,
            };
        }
    },
    data() {
        return {
            users: {
                id: "",
                firstName: "",
                lastName: "",
                username: "",
                email: "",
            },
        };
    },
    computed: {
        ...mapState("user", {
            user: (state) => state.data,
            errors: (state) => state.errors,
        }),
    },
    methods: {
        ...mapActions("user", ["storeUsersData", 'updateUserData']),
        submit() {
            if (this.$route.name == "users-edit-id") {
                let data = Object.assign({id: this.$route.params.id}, this.users)
                this.updateUserData(this.users).then((this.$router.push('/users')));
            } else {
                this.storeUsersData(this.users).then(() =>
                    this.$router.push("/users")
                );
            }
        },
    },
};
</script>

<style scoped>
</style>