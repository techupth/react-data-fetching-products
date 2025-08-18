import { useEffect, useState } from "react";
import { api } from "./api";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      
      const list = Array.isArray(res.data) ? res.data : res.data?.data;
      setProducts(list || []);
      setError("");
    } catch (err) {
      setError("โหลดข้อมูลไม่สำเร็จ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      
      setProducts(prev => prev.filter(p => p.id !== id));
      
      
    } catch (err) {
      alert("ลบไม่สำเร็จ ลองใหม่อีกครั้ง");
      console.error(err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  if (loading) return <div style={{padding:20}}>กำลังโหลด...</div>;
  if (error)   return <div style={{padding:20, color:"crimson"}}>{error}</div>;

  return (
    <div style={{ maxWidth: 1000, margin:"0 auto", padding:24 }}>
      <h1>Products</h1>
      {products.length === 0 ? (
        <div>ไม่พบสินค้า</div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:16 }}>
          {products.map(p => (
            <div key={p.id} style={{ position:"relative", border:"1px solid #eee", borderRadius:12, overflow:"hidden" }}>
              <button
                onClick={() => handleDelete(p.id)}
                title="ลบรายการนี้"
                style={{ position:"absolute", right:8, top:8, width:28, height:28, borderRadius:999, border:"1px solid #eee", background:"#fff", cursor:"pointer" }}
              >
                ×
              </button>
              <img src={p.image} alt={p.name} style={{ width:"100%", aspectRatio:"1/1", objectFit:"cover", background:"#f5f5f5" }} />
              <div style={{ padding:12 }}>
                <div style={{ fontWeight:700 }}>{p.name}</div>
                <div style={{ fontWeight:700 }}>${Number(p.price).toFixed(2)}</div>
                <p style={{ margin:0, opacity:.8 }}>{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


const styles = {
  page:  { maxWidth: 1000, margin: "0 auto", padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" },
  title: { margin: "0 0 16px", fontSize: 28, fontWeight: 800 },
  grid:  { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 },
  card:  { position: "relative", background: "#fff", border: "1px solid #eee", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 8px rgba(0,0,0,.06)" },
  closeBtn: { position: "absolute", right: 8, top: 8, width: 28, height: 28, borderRadius: 999, border: "1px solid #eee", cursor: "pointer", background: "#fff", lineHeight: "26px", fontSize: 18 },
  image: { width: "100%", aspectRatio: "1/1", objectFit: "cover", background: "#f5f5f5" },
  info:  { padding: 12, display: "flex", flexDirection: "column", gap: 6 },
  name:  { fontWeight: 700, fontSize: 16 },
  price: { fontWeight: 700 },
  desc:  { margin: 0, fontSize: 13, color: "#555" },
};

