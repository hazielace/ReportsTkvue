<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit" class="login-button">Ingresar</button>
      <p v-if="authError" class="error">{{ authError }}</p>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
      authError: null,
    };
  },
  methods: {
    login() {
      const validEmail = "admin@admin.com";
      const validPassword = "contraseña123";
      
      this.authError = null;
      
      if (this.email === validEmail && this.password === validPassword) {
        localStorage.setItem("token", "tokenfake12345678910");
        localStorage.setItem("token_type", "bearer");
        localStorage.setItem("data", JSON.stringify({ name: "Admin", birth_date: "2002-10-07", email: "admin@admin.com" }));
        this.$router.push('/reports');
      } else {
        this.authError = "Email o contraseña incorrectos";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$primary-color: #FFBE12;
$hover-color: #e6a800;
$background-color: #f9f9f9;
$danger-color: #d10000;
$dark-color: #000000;
* {
  font-family: Arial, sans-serif;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: $background-color;
}

h2 {
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.login-form label {
  font-weight: bold;
  margin-bottom: 5px;
}

.login-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.login-button {
  background-color: $primary-color;
  color: $dark-color;
  border: none;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: $hover-color;
  }
}

.error {
  color: $danger-color;
  margin-top: 10px;
  text-align: center;
}
</style>