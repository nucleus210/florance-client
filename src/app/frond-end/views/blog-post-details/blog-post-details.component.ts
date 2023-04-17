import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BlogPostService } from 'src/app/services/blog.post.service';
import BlogPost from 'src/app/shared/interfaces/blog-post';

@Component({
  selector: 'blog-post-details',
  templateUrl: './blog-post-details.component.html',
  styleUrls: ['./blog-post-details.component.css']
})
export class BlogPostDetailsComponent implements OnInit, OnDestroy {
  username: string;
  blogPostId: number;

  public blogPost: BlogPost | null = null;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private blogPostService: BlogPostService) { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    // Add param observer to route
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.blogPostId = +params.get('id');
      console.log(this.blogPostId)
    });
    // fech product entity from back-end service
    this.username = this.authService.getUserName();

  }


  getBlogPostById(blogPostId: number) {
    this.blogPostService.getBlogPostById(blogPostId).subscribe({
      next: (blogPostResult: BlogPost) => {
        // update active blog post obj
        this.blogPost = blogPostResult;
        //update card items span text
        console.log(this.blogPost);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }

}