export default function Modal({ title, children, onClose }){
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <h3>{title}</h3>
        <div className="form">{children}</div>
        <div className="actions">
        </div>
      </div>
    </div>
  );
}