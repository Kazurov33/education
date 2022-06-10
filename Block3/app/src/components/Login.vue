<template>
  <div class="q-pa-lg fixed-center" style="min-width: 30%">
    <div class="q-pa-lg" style="min-width: 40%; background: white">
      <q-form @submit="onSubmit" class="q-gutter-sm">
        <p style="font-size: 20px"><b>Welcome</b></p>
        <div class="form-group">
          <q-banner rounded v-if="message" class="text-white bg-red">
            {{ message }}
          </q-banner>
        </div>
        <p><b>Login</b></p>
        <q-input
          outlined
          v-model="user.Login"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'The field is required']"
        />
        <p><b>Password</b></p>
        <q-input
          outlined
          v-model="user.Password"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'The field is required',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div>
          <q-btn
            label="Login"
            type="submit"
            color="primary"
            class="full-width"
            :loading="loading"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: { Login: null, Password: null },
      loading: false,
      message: "",
      isPwd: true,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },

  methods: {
    onSubmit() {
      if (this.user.Login && this.user.Password) {
        this.loading = true;
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push({ name: "Home" });
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style scoped>
a {
  color: gray;
}
</style>
