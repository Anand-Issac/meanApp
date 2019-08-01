import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { stringify } from '@angular/compiler/src/util';

@Injectable({providedIn: 'root'})
export class PostsService {


  private posts: Post[] = [];
  private postsUpdated = new Subject <Post[]> ();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    console.log("adding post");
    let post: Post = {title: title, content: content, newTitle: null, newContent: null};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

  delPost(index: number){
    this.posts.splice(index, 1);
    this.postsUpdated.next([...this.posts]);
  }

  editPost(newTitle: string, newContent: string, index: number, callback){
    console.log(newContent);
    console.log(newTitle);
    let newPost= {title: newTitle, content: newContent, newTitle: null, newContent:null };
    this.posts.splice(index, 1, newPost);
    // console.log(this.posts.toString);
    this.postsUpdated.next([...this.posts]);
    callback();
  }
}
