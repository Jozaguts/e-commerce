<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <TableComponent />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TableComponent from '../../../components/users/table.vue'
export default {
    name: "Admin",
    components:{TableComponent}
}
</script>
