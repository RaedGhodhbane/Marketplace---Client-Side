import { Article } from './../../core/models/article';
import { ArticleService } from './../../core/services/article.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  queryParams: any;
  constructor(private route: ActivatedRoute, private service: ArticleService) { }

  articles: any[] = [];
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.queryParams = { ...params.keys, ...params };
      this.search(this.queryParams)
    })
    console.log(this.queryParams)
  }
  search(query: any) {
    if (query.params.category == 'all') {
      this.service.getArticles().subscribe(data => {
        // console.log(data)
        this.articles = data.map(article => {
          // console.log(article.payload.doc.data());
          return {

            uid: article.payload.doc.id,

            ...article.payload.doc.data() as Article
          }

        })
        this.articles = this.articles.filter(data => {
          // console.log(data.nom)
          // console.log(query.params.searchText)
          console.log(data.nom.includes(query.params.searchText))
          return data.nom.toLowerCase().includes(query.params.searchText)
        })
        console.log(this.articles)
      })
    }
    else {
      this.service.getArticles().subscribe(data => {
        // console.log(data)
        this.articles = data.map(article => {
          // console.log(article.payload.doc.data());
          return {

            uid: article.payload.doc.id,

            ...article.payload.doc.data() as Article
          }

        })
        this.articles = this.articles.filter(data => {
          console.log(data);
          // console.log(data.nom)
          // console.log(query.params.searchText)
          console.log(data.nom.includes(query.params.searchText))
          return data.nom.toLowerCase().includes(query.params.searchText) && data.id_category == query.params.category
        })
        console.log(this.articles)
      })
    }
  }

}
