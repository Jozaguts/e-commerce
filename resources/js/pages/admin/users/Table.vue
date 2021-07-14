<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-center">
                    Name
                </th>
                <th class="text-center">
                    Email
                </th>
                <th class="text-center">
                    Actions
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="user in $store.state.users.users"
                :key="user.id"
            >
                <td class="text-center">{{ user.name }}</td>
                <td class="text-center">{{ user.email }}</td>
                <td class="text-center">
                    <DeleteBtn :id="user.id" />
                    <v-btn text
                           :to="`/admin/users/update/${user.id}`"
                    >
                        <v-icon color="yellow">
                            mdi-pencil-box
                        </v-icon>
                    </v-btn>
                </td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
import DeleteBtn from "./DeleteBtn";
export default {
    name: "Table",
    components:{ DeleteBtn },
    beforeCreate () {
        this.$store.dispatch('users/getUsers')
    }
}
</script>
