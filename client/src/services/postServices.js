import http from "./httpServices";

class PostService {
  async createPost(data) {
    const res = await http.post("api/posts", data);
    return res.data.data;
  }
  async myStory() {
    const res = await http.get("api/story/myStory");
    return res.data.data;
  }
  async addStory(data) {
    const res = await http.post("api/story/addStory", data);
    return res.data.data;
  }
  async deleteStory(data) {
    //body {storyId:"_id"}
    const res = await http.post("api/story/delete", data);
    return res.data.data;
  }  
  async updateAudience(data) {
    //body {postId,audience}
    const res = await http.post("api/post_audience", data);
    return res.data.data;
  }
  
}

export const postService = new PostService();
