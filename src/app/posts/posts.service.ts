import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { stringify } from '@angular/compiler/src/util';

@Injectable({providedIn: 'root'})
export class PostsService {


  private posts: Post[] = [];
  private postsUpdated = new Subject <Post[]> ();

  constructor(private http: HttpClient) {} //Injects http client to variable http
  
  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts"
      )
      .subscribe(postData => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { _id: null, title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post._id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post._id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  editPost(newTitle: string, newContent: string, index: number, callback){
    console.log(newContent);
    console.log(newTitle);
    let newPost= {id: null, title: newTitle, content: newContent};
    //this.posts.splice(index, 1, newPost);
    // console.log(this.posts.toString);
    this.postsUpdated.next([...this.posts]);
    callback();
  }
}
