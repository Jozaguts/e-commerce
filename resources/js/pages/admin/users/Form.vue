<template>
    <v-form>
        <v-text-field
            autocomplete="name"
            label="Name"
            v-model="user.name"
        >
        </v-text-field>
        <v-text-field
            autocomplete="username"
            label="Email"
            v-model="user.email"
        >
        </v-text-field>
        <v-text-field
            autocomplete="current-password"
            v-model="user.password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="password"
            hint="At least 8 characters"
            counter
            @click:append="show = !show"
        ></v-text-field>
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
</template>

<script>
export default {
    name: "Form",
    props: {
        isUpdate:{
            required: true,
            type: Boolean
        },
    },
    data() {
      return {
          user:{},
          loading: false,
          show:false,
          alert: {
              message: '',
              type: 'success',
              show: false
          },
          rules: {
              required: value => !!value || 'Required.',
              emailMatch: () => (`The email and password you entered don't match`),
          },
      }
    },
    methods:{
       async submit() {
            try{
                this.loading = true
                if(this.isUpdate) {
                  let response = await  this.$store.dispatch('users/update', this.user )
                }
                else {
                    this.$store.dispatch('users/create',this.user).then( response => {
                      if(response.success) {
                          this.loading = false
                          this.user = {}
                          this.alert = response.alert
                          setTimeout(()=>{
                              this.$router.push('/admin/users')
                          },1000)
                      }else{
                          this.loading = false
                          this.alert = response.alert
                      }
                    })
                }
            }catch(e){
                console.error(e.message)
            }
            finally {
                this.loading = false
            }
        }
    },
    mounted(){
        if(this.isUpdate){
            this.$store.dispatch('users/getUser', this.$route.params.id)
            .then(()=>{
                this.user = this.$store.state.users.user
            })
        }else{
            this.user = { name:'',email:''}
        }
    },
    beforeDestroy() {
        this.user = { name:'',email:'',password:''}
    }
}
</script>

<style scoped>

</style>
