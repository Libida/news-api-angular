import {globalArticles} from './globalArticles';
import {userData} from './user';
import {Article} from './../news/article';
import {User} from '../user';
import {Articles} from '../news/articles';

export function getGlobalArticles() {
  const articles: Articles = globalArticles;

  return articles;
}

export function getGlobalArticle() {
  const article: Article = globalArticles.articles[3];

  return article;
}

export function getUser() {
  const userDataOutcome: User = userData;

  return userDataOutcome;
}
