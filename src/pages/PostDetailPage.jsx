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
      <h1 className="mb-5">Dettaglio del Post</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-6 col-md-4">
          <div className="card" style={{ width: "100%", maxWidth: "300px" }}>
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Post Image"
            />
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.content}</p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary mt-3">Leggi di più</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
