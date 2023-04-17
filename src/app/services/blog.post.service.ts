import { Injectable } from "@angular/core";
import { HateoasResourceOperation, HateoasResourceService, ResourceCollection, PagedResourceCollection } from "@lagoshny/ngx-hateoas-client";
import { Observable } from "rxjs";
import BlogPost from "../shared/interfaces/blog-post";

@Injectable({
    providedIn: 'root'
})
export class BlogPostService extends HateoasResourceOperation<BlogPost>{

    constructor(private resourceHateoasService: HateoasResourceService) {
        super(BlogPost);
    }
    public getBlogPostById(id: number): Observable<BlogPost> {
        return this.resourceHateoasService.getResource(BlogPost, id);
    }
    public getBlogPostBySearchQuery(searchQuery: string): Observable<BlogPost> {
        return this.resourceHateoasService.getResource(BlogPost, searchQuery);
    }
    public getBlogPostProjections(): Observable<ResourceCollection<BlogPost>> {
        return this.resourceHateoasService.getCollection(BlogPost);
    }

    public getPagedBlogPosts(): Observable<PagedResourceCollection<BlogPost>> {
        return this.resourceHateoasService.getPage(BlogPost);
    }

    public searchBlogPosts(searchQuery: string): Observable<ResourceCollection<BlogPost>> {
        return this.resourceHateoasService.searchCollection(BlogPost, searchQuery);
    }

    public searchPagedBlogPosts(searchQuery: string): Observable<PagedResourceCollection<BlogPost>> {
        return this.resourceHateoasService.searchPage(BlogPost, searchQuery);
    }

}