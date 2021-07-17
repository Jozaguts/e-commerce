<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <TableComponent />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-snackbar
                    v-model="$store.state.global.showMessage"
                >
                    {{$store.state.global.message}}
                </v-snackbar>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TableComponent from '../../../components/products/table.vue'
export default {
    name: "Admin",
    components:{TableComponent}
}
</script>
