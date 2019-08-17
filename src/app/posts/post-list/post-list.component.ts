import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "./../post.model";
import { PostsService } from "./../posts.service";
import { NgForm } from "@angular/forms";


@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  deleteStatus : boolean = false;
  postActiveStatus: boolean = true;
  editStatus : boolean = false;
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {
  }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  onEditPost(){
    this.postActiveStatus = false;
    this.editStatus = true;
  }

  onFinishSavePost(editForm: NgForm, index: number){

    console.log(index);
    this.postsService.editPost(editForm.value.newTitle, editForm.value.newContent, index, function() {console.log("returned")});
    console.log("after returned");
    this.postActiveStatus = true;
    this.editStatus = false;
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
