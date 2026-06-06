/**
 * Server-rendered layout skeleton — visible immediately on page load before
 * JS hydrates. Uses only CSS variables from globals.css (no Ant Design needed).
 * Replaced seamlessly by MainLayout once React mounts.
 */
export default function LayoutSkeleton() {
  return (
    <div className="skeleton-shell" aria-hidden="true">
      {/* Sidebar */}
      <div className="skeleton-sidebar">
        <div className="skeleton-logo" />
        <div className="skeleton-menu">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-menu-item">
              <div className="skeleton-menu-icon" />
              <div className="skeleton-menu-label" />
            </div>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="skeleton-main">
        {/* Header */}
        <div className="skeleton-header">
          <div className="skeleton-header-left">
            <div className="skeleton-icon-btn" />
          </div>
          <div className="skeleton-header-right">
            <div className="skeleton-icon-btn" />
            <div className="skeleton-theme-btn" />
            <div className="skeleton-user" />
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="skeleton-breadcrumb">
          <div className="skeleton-breadcrumb-item" />
        </div>

        {/* Content */}
        <div className="skeleton-content">
          <div className="skeleton-pulse" style={{ height: 120, borderRadius: 8, marginBottom: 16 }} />
          <div className="skeleton-pulse" style={{ height: 400, borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );
}
