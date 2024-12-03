<template>
  <div class="post-detail">
    <h2 class="post-title">{{ post.title }}</h2>
    <hr class="divider" />
    <p class="post-body">{{ post.body }}</p>
    <div class="post-actions">
      <router-link to="/" class="action-btn back-btn">🏠 Home</router-link>
      <router-link :to="`/edit/${post.id}`" class="action-btn edit-btn">✏️ Edit</router-link>
      <button @click="deletePost" class="action-btn delete-btn">🗑️ Delete</button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      post: {}
    };
  },
  mounted() {
    const postId = this.$route.params.id;
    axios.get(`http://192.168.1.254/htdocs/detailPost.php?id=${postId}`)
      .then(response => {
        if (response.data.post) {
          this.post = response.data.post;
        } else {
          console.error('Post not found');
        }
      })
      .catch(error => {
        console.error('Error loading post:', error);
      });
  },
  methods: {
    deletePost() {
      const postId = this.$route.params.id;

      axios.post('http://192.168.1.254/htdocs/deletePost.php', { id: postId })
        .then(response => {
          if (response.data.success) {
            alert('게시물이 삭제되었습니다.');
            this.$router.push('/');
          } else {
            alert('게시물 삭제에 실패했습니다.');
          }
        })
        .catch(error => {
          console.error('Error deleting post:', error);
          alert('게시물 삭제 중 오류가 발생했습니다.');
        });
    }
  }
};
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.post-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.divider {
  border: none;
  height: 2px;
  background-color: #e0e0e0;
  margin-bottom: 20px;
}

.post-body {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 30px;
}

.post-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.action-btn {
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 1.1rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.action-btn:hover {
  transform: scale(1.05);
}

.back-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  text-decoration: none;
}

.back-btn:hover {
  background-color: #45a049;
}

.edit-btn {
  background-color: #FF6F61;
  color: white;
  border: none;
  text-decoration: none;
}

.edit-btn:hover {
  background-color: #ff5a4a;
}

.delete-btn {
  background-color: #FF6347;
  color: white;
  border: none;
}

.delete-btn:hover {
  background-color: #e5533c;
}

@media (max-width: 600px) {
  .post-title {
    font-size: 1.5rem;
  }

  .post-body {
    font-size: 1rem;
  }

  .action-btn {
    padding: 10px 15px;
    font-size: 1rem;
  }
}
</style>
