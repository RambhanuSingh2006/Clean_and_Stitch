export default function PageLayout({ children }) {
  return (
    <div className="app-bg">
      <div className="page-card">
        {children}
      </div>
    </div>
  );
}



