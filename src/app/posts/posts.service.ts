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
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  delPost(index: number){
    this.posts.splice(index, 1);
    this.postsUpdated.next([...this.posts]);
  }

  editPost(newTitle: string, newContent: string, index: number, callback){
    console.log(newContent);
    console.log(newTitle);
    let newPost= {id: null, title: newTitle, content: newContent};
    this.posts.splice(index, 1, newPost);
    // console.log(this.posts.toString);
    this.postsUpdated.next([...this.posts]);
    callback();
  }
}
