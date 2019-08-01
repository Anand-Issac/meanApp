import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "./../post.model";
import { PostsService } from "./../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  deleteStatus : boolean = false;
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {
    console.log("initial construct");
    let btn = document.getElementById("deleteButton");
    //btn.addEventListener("click", (e:Event) => this.onDeletePost());
  }

  ngOnInit() {

    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDeletePost(index: number) {
    console.log("hello there");
    this.postsService.delPost(index);
  }

  onEditPost(){

  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
