<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    <nuxt-link
                        to="/users/add"
                        class="btn btn-primary float-right btn-sm"
                        >Add New</nuxt-link
                    >
                </h4>
            </div>
            <div class="card-body row">
                <div class="col-md-4 offset-md-8 mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        v-model="keyword"
                        class="form-control"
                    />
                </div>
                <div class="col-md-12">
                    <b-table
                        striped
                        hover
                        :items="users"
                        :fields="fields"
                        show-empty
                        responsive
                    >
                        <template v-slot:cell(name)="row">
                            <strong
                                >{{ row.item.firstName }}
                                {{ row.item.lastName }}</strong
                            >
                        </template>
                        <template v-slot:cell(gender)="row">
                            {{ row.item.gender == "M" ? "Male" : "Female" }}
                        </template>
                        <template v-slot:cell(actions)="row">
                            <nuxt-link
                                :to="{
                                    name: 'users-edit-id',
                                    params: { id: row.item.id },
                                }"
                                class="btn btn-warning btn-sm"
                                :key="'edit' + row.index"
                                >Edit</nuxt-link
                            >
                            <button
                                class="btn btn-danger btn-sm"
                                @click="openDeleteModal(row)"
                            >
                                Delete
                            </button>
                        </template>
                    </b-table>
                </div>
                <b-modal v-model="deleteModal" title="Delete data">
                    <p>Are you sure you want to delete this data!</p>
                    <template #modal-footer>
                        <div class="w-100">
                            <b-button
                                variant="secondary"
                                size="sm"
                                @click="deleteModal = false"
                            >
                                Close
                            </b-button>
                            <b-button
                                variant="primary"
                                size="sm"
                                @click="deleteDataUser"
                            >
                                Delete
                            </b-button>
                        </div>
                    </template>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
    async asyncData({ store }) {
        await Promise.all([store.dispatch("user/getUsersData")]);
        return;
    },
    data() {
        return {
            fields: [
                "name",
                "email",
                "age",
                "phone",
                "website",
                "gender",
                "actions",
            ],
            items: [],
            deleteModal: false,
            user_selected: null,
            keyword: "",
            awaitingSearch: false,
        };
    },
    watch: {
        keyword: function (val) {
            if (!this.awaitingSearch) {
                setTimeout(() => {
                    this.getUsersData(this.keyword);
                    this.awaitingSearch = false;
                }, 500);
            }
            this.awaitingSearch = true;
        },
    },
    computed: {
        ...mapState("user", {
            users: (state) => state.users,
        }),
    },
    methods: {
        ...mapActions("user", ["getUsersData", "destroyUsersData"]),
        openDeleteModal(row) {
            this.user_selected = row.item;
            this.deleteModal = true;
        },
        deleteDataUser() {
            this.destroyUsersData(this.user_selected.id).then(() => {
                this.deleteModal = false;
                this.user_selected = null;
            });
        },
        findUser() {
            this.getUsersData(this.search);
        },
    },
};
</script>

<style scoped>
</style>