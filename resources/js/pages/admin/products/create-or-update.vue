<template>
    <v-row>
        <v-col cols="6">
            <v-form>
                <v-text-field
                    autocomplete="off"
                    label="Name"
                    v-model="product.name"
                >
                </v-text-field>
                <v-text-field
                    autocomplete="off"
                    label="Description"
                    v-model="product.description"
                >
                </v-text-field>
                <v-text-field
                    autocomplete="off"
                    v-model="product.price"
                    type="number"
                    label="Price"
                ></v-text-field>
                <v-file-input
                    v-model="image.file"
                    accept="image/png, image/jpeg, image/bmp"
                    prepend-icon="mdi-camera"
                    label="Image"
                    @change="preViewImage($event)"
                ></v-file-input>
                <v-btn
                    large
                    text
                    outlined
                    color="green"
                    :loading="loading"
                    @click="submit"
                >
                    {{ isUpdate ? 'Update': 'Create' }}
                </v-btn>
                <v-row>
                    <v-col cols="12 mt-5">
                        <v-alert
                            dismissible
                            :value="$store.state.global.showMessage"
                            :type="$store.state.global.alertType">
                            {{$store.state.global.message}}
                        </v-alert>
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
        <v-col cols="6">
            <v-img :src="image.path"></v-img>
        </v-col>
    </v-row>

</template>
<script>
export default {
    props: {
        isUpdate:{
            required: true,
            type: Boolean
        },
    },
    data(){
        return{
            product:{},
            loading:false,
            image: {
                file: undefined,
                path: undefined
            },
        }
    },
    created(){
        if(this.isUpdate){
            this.$store.dispatch('products/getProduct', this.$route.params.slug)
                .then( ()=>{
                    this.product = this.$store.state.products.currentProduct.product_data
                   return this.$store.state.products.currentProduct.product_data.media[0].file_name
                })
                .then(imageName =>{
                   return fetch( this.$store.state.products.currentProduct.media,{
                        headers: {"Content-Type": "application/json"},
                        mode: 'no-cors',
                    })
                    .then(response=> response.blob())
                    .then(blob =>{
                        this.image.file =  new File([blob], imageName, blob)
                        this.image.path  =  this.$store.state.products.currentProduct.media
                    })
                })
        }else{
            this.product = { name:'', description:'',price:'',status: true}
        }
    },
    methods:{
        submit(){
            try{
                let formData = new FormData();
                formData.append('image', this.image.file)
                formData.append('name', this.product.name)
                formData.append('description', this.product.description)
                formData.append('price', this.product.price)
                formData.append('status', this.product.status ?'1':'0')
                formData.append('slug', this.product.slug)
                if(this.isUpdate){
                    formData.append('_method', 'PUT')
                    this.$store.dispatch('products/update',{slug: this.product.slug, product: formData})
                    .then(success=>{
                        if (success){
                            this.$router.push('/admin/products')
                        }
                    })
                }else{
                    this.$store.dispatch('products/create',{product: formData})
                    .then(success=>{
                        if (success){
                            this.$router.push('/admin/products')
                        }
                    })
                }

            }catch{

            }
        },
        preViewImage(event){
            return this.image.path = URL.createObjectURL(this.image.file);
        }
    }
}
</script>
