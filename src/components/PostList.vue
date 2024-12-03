<template>
  <div class="post-list">
    <div class="post-cards">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <router-link :to="'/posts/' + post.id" class="post-title">
          <div class="post-icon">📝</div>
          <h3>{{ post.title }}</h3>
        </router-link>
      </div>
    </div>
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="pagination-button prev">
        <span class="arrow">⬅️</span> Previous
      </button>
      <div class="page-numbers">
        <button
          v-for="page in pageNumbers"
          :key="page"
          @click="changePage(page)"
          :class="{'active': page === currentPage}"
          class="pagination-button">
          {{ page }}
        </button>
      </div>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="pagination-button next">
        Next <span class="arrow">➡️</span>
      </button>
    </div>
    <div class="create">
      <router-link to="/create" class="create-link">New Post</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [], // 게시글 목록
      currentPage: 1, // 현재 페이지 번호
      totalPages: 1, // 총 페이지 수
      pageNumbers: [] // 페이지 번호 배열
    };
  },
  mounted() {
    this.fetchPosts(); // 컴포넌트가 마운트되면 게시글을 불러옵니다.
  },
  methods: {
    fetchPosts() {
      const apiUrl = `http://192.168.1.254/htdocs/getPost.php?page=${this.currentPage}`;
      axios.get(apiUrl)
        .then(response => {
          const data = response.data;
          this.posts = data.posts; // 현재 페이지에 해당하는 게시글 목록
          this.currentPage = data.currentPage; // 현재 페이지 번호
          this.totalPages = data.totalPages; // 총 페이지 수
          this.updatePageNumbers(); // 페이지 번호 업데이트
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
        });
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return; // 페이지 범위 체크
      this.currentPage = page; // 페이지 변경
      this.fetchPosts(); // 새로운 페이지에 맞는 게시글을 불러옵니다.
    },
    updatePageNumbers() {
      this.pageNumbers = [];
      for (let i = 1; i <= this.totalPages; i++) {
        this.pageNumbers.push(i); // 1부터 totalPages까지 페이지 번호 배열을 생성
      }
    }
  }
};
</script>




<style scoped>
.post-list {
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.post-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.post-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s;
}

.post-card:hover {
  transform: translateY(-5px);
}

.post-title {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.post-icon {
  margin-right: 10px;
  font-size: 1.5rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.pagination-button {
  background-color: rgba(69, 160, 73, 0.3);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 5px;
}

.pagination-button:disabled {
  background-color: rgba(69, 160, 73, 0.3);
  cursor: not-allowed;
}

.pagination-button:hover:not(:disabled) {
  background-color: rgba(69, 160, 73, 0.3);
}

.pagination-button.active {
  background-color: rgba(69, 160, 73, 0.3);
}

.arrow {
  font-size: 1.2rem;
}

.create-link {
  display: block;
  text-align: center;
  background-color: rgba(255, 0, 0, 0.29);
  color: white;
  padding: 15px 30px;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 30px;
}

.create-link:hover {
  background-color: rgba(255, 0, 0, 0.29);
}
</style>
