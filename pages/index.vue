<template>
  <div>
    <AuthPage />
  </div>
</template>

<script>
import AuthPage from "../components/AuthPage.vue";
export default {
  middleware: "isAuthenticated",
  components: { AuthPage },
};
</script>
