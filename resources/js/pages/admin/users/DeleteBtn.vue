<template>
    <v-btn
        :disabled="disabled"
        @click="destroy(id)">
        <v-icon color="red" v-text="icon">

        </v-icon>
    </v-btn>
</template>

<script>
export default {
    name: "DeleteBtn",
    props:{
        id:{
            required:true,
            type:Number,
        },
        icon:{
            required:false,
            type:String,
            default: 'mdi-trash-can'
        },
        disabled:{
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            isLoading:false
        }
    },
    methods:{
        destroy(id) {
            this.isLoading = true
            this.$store.dispatch('users/delete', id)
                .then(res =>{
                    if( res.success ){
                        this.isLoading = false
                    }
                })
        }
    }
}
</script>

<style scoped>

</style>
