<template>
    <v-form>
        <v-container>
            <v-row  class="mt-16">
                    <v-col cols="6" offset="3">
                        <v-text-field
                            v-model="credentials.email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6" offset="3">
                        <v-text-field
                            v-model="credentials.password"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show ? 'text' : 'password'"
                            name="input-10-1"
                            label="password"
                            hint="At least 8 characters"
                            counter
                            @click:append="show = !show"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" offset="3" class="text-center">
                    <v-btn block  color="green" @click="login" >
                        login
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6" offset="3">
                    <v-alert
                        :value="$store.state.global.error"
                        dismissible
                        type="error"
                        close-text="Close Alert"
                        color="deep-danger accent-4"
                    >
                        {{$store.state.global.message}}
                    </v-alert>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            show:false,
            credentials:{
                email:'',
                password:'',
            },
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                emailMatch: () => (`The email and password you entered don't match`),
            },
        }
    },
    methods:{
       async login() {
           try{
                let success  = await this.$store.dispatch('auth/login', this.credentials)
                    if (success) this.$router.push({name: 'admin'})
           }catch(error) {
               console.error(error)
           }
        }
    }
    }
</script>
