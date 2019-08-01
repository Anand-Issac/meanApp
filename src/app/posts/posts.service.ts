import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
    let post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

  delPost(index: number){
    this.posts.splice(index, 1);
    this.postsUpdated.next([...this.posts]);
  }

}
