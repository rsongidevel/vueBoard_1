<template>
  <div id="app">
    <header>
      <h1 class="main-title">자유게시판</h1>
      <nav>
        <router-link to="/" class="nav-link">Home</router-link>
        <span>|</span>
        <router-link to="/create" class="nav-link">New Post</router-link>
      </nav>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <p>&copy; 2024 송률</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* 기본 레이아웃 설정 */
#app {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background: #f0f0f0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

header {
  background-color: rgba(255, 0, 0, 0.29); /* 트렌디한 주황색 */
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.main-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

nav {
  margin-top: 15px;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  margin: 0 15px;
  text-transform: uppercase;
}

nav a:hover {
  border-bottom: 2px solid white;
}

nav span {
  color: white;
  font-size: 1.2rem;
}

main {
  margin-top: 30px;
  flex-grow: 1;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 20px;
}

footer p {
  margin: 0;
}

@media (max-width: 600px) {
  .main-title {
    font-size: 2rem;
  }

  nav a {
    font-size: 1rem;
    margin: 0 10px;
  }
}
</style>
