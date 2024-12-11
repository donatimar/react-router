import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <h1 className="mb-5">LISTA DEI POST</h1>
      <div className="row">
        {posts.map((post) => (
          <div className="col-12 col-sm-6 col-md-4" key={post.id}>
            <div className="card" style={{ width: "100%", maxWidth: "300px" }}>
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Post Image"
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
                <Link to={`/posts/${post.id}`} className="btn btn-primary mt-3">
                  Leggi di più
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
