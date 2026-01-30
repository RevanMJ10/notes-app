export default function NoteCard({ note, onClick, onDelete }) {
  const formattedTime = new Date(note.updatedAt).toLocaleString();

  return (
    <div
      className="card bg-base-100 shadow-md hover:shadow-lg cursor-pointer transition"
      onClick={() => onClick(note)}
    >
      <div className="card-body p-4">
        <h2 className="font-bold text-lg line-clamp-1">{note.title}</h2>

        <p className="text-sm opacity-80 line-clamp-4 whitespace-pre-line">
          {note.content}
        </p>

        <p className="text-xs opacity-60 mt-2">
          Updated: {formattedTime}
        </p>

        <div className="flex justify-end mt-3">
          <button
            className="btn btn-xs btn-error btn-outline"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
