import React from "react";

const EmailInput = ({ email, setEmail }) => {
  return (
    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Correo Electrónico
      </label>
      <input
        type="email"
        className="form-control"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
  );
};

export default EmailInput;
