import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel recupero dei dettagli");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data.post);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Errore:", error);
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return <div className="container py-5">Caricamento in corso</div>;
  }

  if (!post) {
    return <div className="container py-5">Post non trovato</div>;
  }

  return (
    <div className="container py-5">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
