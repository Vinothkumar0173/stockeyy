import { useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("stockeyy-profile")) || {
        name: "Vinoth Kumar",
        email: "vinoth@example.com",
        role: "Administrator",
        phone: ""
      };
    } catch {
      return {
        name: "Vinoth Kumar",
        email: "vinoth@example.com",
        role: "Administrator",
        phone: ""
      };
    }
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!profile.name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    localStorage.setItem("stockeyy-profile", JSON.stringify(profile));
    setMessage("Profile saved successfully!");
  }

  return (
    <div className="page">
      <div className="section-heading">
        <div>
          <h2>My Profile</h2>
          <p>Manage your account information.</p>
        </div>
      </div>

      <section className="content-card form-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.name.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2>{profile.name || "Your Name"}</h2>
            <p>{profile.role}</p>
          </div>
        </div>

        {message && <p className="notice" role="status">{message}</p>}

        <form className="product-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email Address
            <input
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone Number
            <input
              name="phone"
              type="tel"
              value={profile.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            Role
            <input
              name="role"
              value={profile.role}
              onChange={handleChange}
              required
            />
          </label>

          <div className="form-actions full-width">
            <button type="submit" className="primary-button">Save Profile</button>
          </div>
        </form>
      </section>
    </div>
  );
}