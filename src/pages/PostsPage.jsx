import { useState, useEffect } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recupero i post dall'API Express
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel recupero dei dati");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Errore:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container py-5">Caricamento in corso</div>;
  }

  return (
    <div className="container py-5">
      <h1>Lista dei post</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
