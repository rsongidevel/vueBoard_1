<template>
  <div class="post-form">
    <h2 class="form-title">{{ post.id ? '게시물 수정' : '새 게시물 작성' }}</h2>

    <!-- Form for creating/editing a post -->
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="title" class="form-label">제목</label>
        <input type="text" id="title" v-model="post.title" class="form-input" placeholder="게시물 제목을 입력하세요" required />
      </div>

      <div class="form-group">
        <label for="body" class="form-label">내용</label>
        <textarea id="body" v-model="post.body" class="form-textarea" placeholder="게시물 내용을 입력하세요" required></textarea>
      </div>

      <button type="submit" class="form-submit-btn">{{ post.id ? '수정하기' : '작성하기' }}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    };
  },
  mounted() {
    const postId = this.$route.params.id;
    if (postId) {
      // If there's an ID in the URL, fetch the post to edit
      axios.get(`http://192.168.1.254/htdocs/detailPost.php?id=${postId}`)
        .then(response => {
          if (response.data.post) {
            this.post = response.data.post;
          } else {
            alert('게시물이 존재하지 않습니다.');
          }
        })
        .catch(error => {
          console.error('Error fetching post:', error);
        });
    }
  },
  methods: {
    submitForm() {
      const postId = this.$route.params.id;

      // POST to the same createPost.php for both create and edit
      axios.post('http://192.168.1.254/htdocs/createPost.php', {
        id: postId,  // If editing, pass the ID
        title: this.post.title,
        body: this.post.body
      })
        .then(response => {
          if (response.data.success) {
            alert(postId ? '게시물이 수정되었습니다.' : '새 게시물이 작성되었습니다.');
            this.$router.push('/');
          } else {
            alert('게시물 저장에 실패했습니다.');
          }
        })
        .catch(error => {
          console.error('Error submitting post:', error);
          alert('저장 중 오류가 발생했습니다.');
        });
    }
  }
};
</script>

<style scoped>
.post-form {
  max-width: 700px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 8px;
  display: block;
}

.form-input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  border-color: #4CAF50;
}

.form-textarea {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
  transition: border-color 0.3s ease;
  min-height: 150px;
}

.form-textarea:focus {
  border-color: #4CAF50;
}

.form-submit-btn {
  padding: 12px 25px;
  background-color: #4CAF50;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

.form-submit-btn:hover {
  background-color: #45a049;
}

@media (max-width: 600px) {
  .form-title {
    font-size: 1.5rem;
  }

  .form-input,
  .form-textarea,
  .form-submit-btn {
    font-size: 1rem;
    padding: 10px;
  }
}
</style>
