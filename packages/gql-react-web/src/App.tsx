import { useEffect, useState } from "react";
import useSWR from "swr";
import { request } from "graphql-request";
import axios from "axios";

const fetcher = (query: any) => request("/graphql2", query);

function App() {
  // use swr request
  // const { data = { articles: [] } }: { data: { articles: [] } } = useSWR(
  //   `
  //     {
  //       articles{
  //         id,
  //         title,
  //         content
  //       }
  //     }
  //   `,
  //   fetcher
  // );
  // const { articles = [] } = data;

  // use axios
  const [articles, setArticles] = useState([]);
  const handleQuery = async (id: string) => {
    try {
      const { data: original } = await axios({
        method: "POST",
        url: "http://localhost:4000/graphql2",
        data: {
          query: `
            query Articles {
              article(id: ${id}) {
                id
                title
                content
              }
            }
          `,
          variables: {
            id,
          },
        },
      });
      const { article }: { article: never } = original.data;
      setArticles([article]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { data: original } = await axios({
        method: "POST",
        url: "http://localhost:4000/graphql2",
        data: {
          query: `
            mutation Articles($id: ID!) {
              deleteArticle(id: $id) {
                success
              }
            }
          `,
          variables: {
            id,
          },
        },
      });
      const { deleteArticle }: { deleteArticle: any } = original.data;
      console.log(deleteArticle.success, "isSuccess");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (article: any) => {
    try {
      const { data: original } = await axios({
        method: "POST",
        url: "http://localhost:4000/graphql2",
        data: {
          query: `
            mutation Articles($article: createArticleInput) {
              createArticle(article: $article) {
                id
                title
                content
              }
            }
          `,
          variables: {
            article,
          },
        },
      });
      const { createArticle }: { createArticle: never } = original.data;
      setArticles([createArticle]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // handleQuery("2"); // query by id
    // handleDelete("2"); // delelte by id
    handleAdd({ title: "xxxxx", content: "yyyyy" }); // add new article
  }, []);

  return (
    <div className="App">
      {articles?.map((item: any) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.content}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default App;
