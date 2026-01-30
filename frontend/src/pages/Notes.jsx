import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";

export default function Notes() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState({ title: "", content: "" });

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchNotes();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch {
      showToast("Failed to load notes", "error");
    } finally {
      setLoading(false);
    }
  };

  const saveNote = async () => {
    try {
      if (selected._id) {
        await axios.put(`${API}/api/notes/${selected._id}`, selected, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showToast("Note updated");
      } else {
        await axios.post(`${API}/api/notes`, selected, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showToast("Note created");
      }
      setModalOpen(false);
      setSelected({ title: "", content: "" });
      fetchNotes();
    } catch {
      showToast("Failed to save note", "error");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API}/api/notes/${deleteTarget}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("Note deleted");
      setDeleteTarget(null);
      fetchNotes();
    } catch {
      showToast("Delete failed", "error");
    }
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="text-2xl font-bold">Your Notes</h2>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search notes..."
              className="input input-bordered"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="btn btn-primary"
              onClick={() => {
                setSelected({ title: "", content: "" });
                setModalOpen(true);
              }}
            >
              + Add
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center mt-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center opacity-70 mt-20">
            No matching notes found 📝
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onClick={(note) => {
                  setSelected(note);
                  setModalOpen(true);
                }}
                onDelete={(id) => setDeleteTarget(id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">
              {selected._id ? "Edit Note" : "New Note"}
            </h3>

            <input
              className="input input-bordered w-full mb-3"
              placeholder="Title"
              value={selected.title}
              onChange={(e) =>
                setSelected({ ...selected, title: e.target.value })
              }
            />

            <textarea
              className="textarea textarea-bordered w-full h-40"
              placeholder="Content"
              value={selected.content}
              onChange={(e) =>
                setSelected({ ...selected, content: e.target.value })
              }
            />

            <div className="modal-action">
              <button className="btn" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveNote}>
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <dialog open className="modal modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete note?</h3>
            <p className="py-4">This action cannot be undone.</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Toast */}
      {toast && (
        <div className="toast toast-end">
          <div
            className={`alert ${
              toast.type === "error" ? "alert-error" : "alert-success"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}
