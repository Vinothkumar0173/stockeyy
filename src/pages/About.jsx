export default function About() {
  const features = [
    {
      icon: "📦",
      title: "Stock Management",
      description: "Add, update, search, and remove products while keeping track of quantities."
    },
    {
      icon: "🧾",
      title: "Billing",
      description: "Prepare bills, calculate totals, and review previous sales."
    },
    {
      icon: "👥",
      title: "Customer Records",
      description: "Maintain customer names, email addresses, and phone numbers."
    },
    {
      icon: "📊",
      title: "Dashboard",
      description: "See product counts, stock value, low-stock alerts, and sales totals."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Use the application on desktops, tablets, and mobile devices."
    },
    {
      icon: "🔎",
      title: "Easy Navigation",
      description: "Find pages and products quickly using menus, search, and filters."
    }
  ];

  return (
    <div className="page">
      <section className="welcome-banner">
        <div>
          <p className="eyebrow">ABOUT THE PROJECT</p>
          <h2>Meet Stockeyy ✨</h2>
          <p>A simple way to manage products, stock, customers, and bills.</p>
        </div>
        <div className="banner-art">📦</div>
      </section>

      <section className="content-card">
        <h2>Our Goal</h2>
        <p style={{ color: "#78859a", fontSize: 13, lineHeight: 1.9 }}>
          Stockeyy is a frontend project designed to make everyday stock
          management easier. It brings product tracking, customer records,
          billing, and a business overview into one clean interface.
        </p>
      </section>

      <div className="section-heading">
        <div>
          <h2>Application Features</h2>
          <p>Everything you need in one workspace.</p>
        </div>
      </div>

      <section className="info-grid">
        {features.map((feature) => (
          <article className="info-card" key={feature.title}>
            <span>{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>

      <section className="content-card">
        <h2>Built with React</h2>
        <p style={{ color: "#78859a", fontSize: 13, lineHeight: 1.9 }}>
          This project demonstrates reusable components, page navigation,
          forms, shared application data, list rendering, filtering, and
          responsive styling.
        </p>
        <p style={{ color: "#78859a", fontSize: 12 }}>
          Training Project · Stockeyy · 2026
        </p>
      </section>
    </div>
  );
}