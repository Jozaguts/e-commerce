<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-center text-capitalize">
                    name
                </th>
                <th class="text-center text-capitalize">
                    description
                </th>  <th class="text-center text-capitalize">
                price
            </th>
                <th class="text-center text-capitalize ">
                    status
                </th>
                <th class="text-center text-capitalize">
                    actions
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="product in $store.state.products.products"
                :key="product.id"
            >
                <td class="text-center">{{ product.name }}</td>
                <td class="text-center">{{ product.description }}</td>
                <td class="text-center">{{ product.price }}</td>
                <td class="text-center">
                    <v-switch
                        v-model="product.status"
                        color="green"
                        @change="update(product)">
                    </v-switch>
                </td>
                <td class="text-center">
                    <v-btn text
                           @click="$store.dispatch('products/delete', product.slug )"
                    >
                        <v-icon color="red">
                            mdi-trash-can
                        </v-icon>
                    </v-btn>
                    <v-btn text
                           :to="`/admin/products/update/${product.slug}`"
                    >
                        <v-icon color="yellow">
                            mdi-pencil-box
                        </v-icon>
                    </v-btn>
                </td>
            </tr>
            </tbody>
            <tr>
                <v-snackbar
                    v-model="$store.state.global.showMessage"
                >
                    {{$store.state.global.message}}
                </v-snackbar>
            </tr>
        </template>
    </v-simple-table>
</template>
<script>
export default {
    name: "Table",
    methods:{
        update( product ) {
          this.$store.dispatch('products/updateStatus', { slug: product.slug })
      }
    },
    beforeCreate () {
        this.$store.dispatch('products/getProducts')
    }
}
</script>
