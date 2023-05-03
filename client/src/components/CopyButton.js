import React, { useState } from "react";

function CopyButton({ url }) {
  const [showTick, setShowTick] = useState(false);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(url);
    setShowTick(true);
    setTimeout(() => {
      setShowTick(false);
    }, 2000);
  };

  return (
    <button
      type="button"
      className="btn btn-secondary d-flex align-items-center justify-content-center"
      style={{ height: 40, width: 40 }}
      onClick={handleCopyClick}
    >
      {showTick ? (
        <i className="bi bi-check-circle"></i>
      ) : (
        <i className="bi bi-clipboard"></i>
      )}
    </button>
  );
}

export default CopyButton;
