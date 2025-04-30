import React from "react";

const PasswordInput = ({ password, setPassword }) => {
  return (
    <div className="mb-3">
      <label htmlFor="password" className="form-label">
        Contraseña
      </label>
      <input
        type="password"
        className="form-control"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
  );
};

export default PasswordInput;
