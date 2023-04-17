import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { AuthService } from 'src/app/services/auth.service';
import { BlogPostService } from 'src/app/services/blog.post.service';
import BlogPost from 'src/app/shared/interfaces/blog-post';

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit, OnDestroy {
  username: string;

  public blogPosts: BlogPost[] | null = null;

  

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private blogPostService: BlogPostService) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    // fech product entity from back-end service
    this.username = this.authService.getUserName();
    this.getAllBlogPosts();
  }

  /**
 * function for feching all blog posts.
 *
 * @return collection of blog posts
 * @throws error when required params are not valid or link not found by relation name
 */
  getAllBlogPosts() {
    this.blogPostService.getCollection().subscribe({
      next: (collection: ResourceCollection<BlogPost>) => {
        const blogPostResult: Array<BlogPost> = collection.resources;
        this.blogPosts = blogPostResult;
        console.log(this.blogPosts)
      },
      error: (error: HttpErrorResponse) => { console.log(error.message); }
    });
  }

  openBlogPost(blogPostId: number): void {

  }

}