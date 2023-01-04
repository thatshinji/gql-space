import { v4 as uuidv4 } from "uuid";
const articles = [
  { id: "1", title: "title1", content: "content1" },
  { id: "2", title: "title2", content: "content2" },
  { id: "3", title: "title3", content: "content3" },
];

// resolver
const rootValue = {
  eva: () => {
    return {
      name: "shinji",
      age: 14,
      isAdult: false,
      height: 170.45,
      id: 0,
      hobbies: [],
    };
  },
};

const rootValue2 = {
  articles: () => {
    return articles;
  },
  article: ({ id }) => {
    const article = articles.find((article) => article.id === id);
    article.id = id;
    return article;
  },
  createArticle: ({ article }) => {
    article.id = uuidv4();
    articles.push(article);
    return article;
  },
  updateArticle: ({ id, article: postArticle }) => {
    const article = articles.find((article) => article.id === id);
    article.title = postArticle.title;
    article.content = postArticle.content;
    return article;
  },
  deleteArticle: ({ id }) => {
    const idx = articles.find((article) => article.id === id);
    articles.splice(idx, 1);
    return {
      success: true,
    };
  },
};

export { rootValue, rootValue2 };
