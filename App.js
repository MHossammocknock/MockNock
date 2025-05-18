import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const dummyItems = [
  { id: 1, title: "Used Bicycle", description: "Mountain bike, good condition", category: "Sports", condition: "Used", image: "https://via.placeholder.com/150" },
  { id: 2, title: "Old Laptop", description: "Still works, good for basic tasks", category: "Electronics", condition: "Like New", image: "https://via.placeholder.com/150" },
  { id: 3, title: "Books Collection", description: "Fiction and non-fiction, around 20 books", category: "Books", condition: "Used", image: "https://via.placeholder.com/150" },
];

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Exchange Portal - Demo</h1>
      {!user ? (
        <div style={{ border: "1px solid #ccc", padding: "16px", maxWidth: "400px" }}>
          <h2>{isRegistering ? "Register" : "Login"}</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
          <button onClick={handleAuth}>{isRegistering ? "Register" : "Login"}</button>
          <p onClick={() => setIsRegistering(!isRegistering)} style={{ color: "blue", cursor: "pointer" }}>
            {isRegistering ? "Already have an account? Login" : "Don’t have an account? Register"}
          </p>
        </div>
      ) : (
        <div>
          <p>Logged in as: <strong>{user.email}</strong></p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
        {dummyItems.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ccc", padding: "16px", width: "200px" }}>
            <img src={item.image} alt={item.title} style={{ width: "100%", height: "100px", objectFit: "cover" }} />
            <h3>{item.title}</h3>
            <p>{item.category} - {item.condition}</p>
            <p>{item.description}</p>
            <button onClick={() => {
              if (!user) {
                alert("Please login to propose an exchange.");
                return;
              }
              setSelectedItem(item);
            }}>Propose Exchange</button>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#00000080", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "300px" }}>
            <h2>Propose Exchange</h2>
            <p>You are proposing an exchange for: <strong>{selectedItem.title}</strong></p>
            <textarea rows="4" placeholder="Describe your offer..." style={{ width: "100%" }}></textarea>
            <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setSelectedItem(null)}>Cancel</button>
              <button onClick={() => { alert("Proposal submitted!"); setSelectedItem(null); }}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
