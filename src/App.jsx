import { useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutDashboard,
  Search,
  Bookmark,
  FileText,
  User,
  GraduationCap,
  Bell,
  Menu,
  X,
  ArrowUpRight,
  IndianRupee,
  Clock,
  CheckCircle,
  TrendingUp,
  Sparkles,
  SlidersHorizontal,
  CalendarDays,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import "./App.css";

const DEFAULT_PROFILE = {
  name: "Student",
  course: "Diploma in Computer Technology",
  state: "Maharashtra",
  marks: "75",
  income: "150000",
};

const ALLOWED_STATUSES = [
  "Planning",
  "Documents Pending",
  "Submitted",
  "Approved",
  "Rejected",
];

function readStoredArray(key) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function readStoredProfile() {
  try {
    const value = JSON.parse(
      window.localStorage.getItem("grantly-profile") || "null",
    );
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return DEFAULT_PROFILE;
    }

    return {
      name:
        typeof value.name === "string"
          ? value.name.slice(0, 60)
          : DEFAULT_PROFILE.name,
      course:
        typeof value.course === "string"
          ? value.course.slice(0, 80)
          : DEFAULT_PROFILE.course,
      state:
        typeof value.state === "string"
          ? value.state.slice(0, 60)
          : DEFAULT_PROFILE.state,
      marks: String(value.marks ?? DEFAULT_PROFILE.marks),
      income: String(value.income ?? DEFAULT_PROFILE.income),
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function writeStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The app remains usable if browser storage is unavailable or full.
  }
}

function cleanText(value, maxLength = 80) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").slice(0, maxLength);
}

const scholarshipData = [
  {
    id: 1,
    name: "National Scholarship Scheme",
    provider: "Government of India",
    amount: 25000,
    deadline: "30 Nov 2026",
    category: "Merit Based",
    match: 95,
    description:
      "A sample scholarship opportunity for students pursuing higher education. Check official eligibility and application details before applying.",
    eligibility: [
      "Currently enrolled in a recognized institution",
      "Meet the required academic performance criteria",
      "Submit the required supporting documents",
    ],
  },
  {
    id: 2,
    name: "Post Matric Scholarship",
    provider: "State Government",
    amount: 15000,
    deadline: "15 Dec 2026",
    category: "Need Based",
    match: 88,
    description:
      "A sample financial assistance opportunity intended to support eligible students with their educational expenses.",
    eligibility: [
      "Currently studying after Class 10",
      "Meet the applicable family income criteria",
      "Provide valid academic and identity documents",
    ],
  },
  {
    id: 3,
    name: "Future Leaders Scholarship",
    provider: "Education Foundation",
    amount: 40000,
    deadline: "20 Dec 2026",
    category: "Merit Based",
    match: 82,
    description:
      "A sample merit-focused scholarship for students who demonstrate academic commitment and leadership potential.",
    eligibility: [
      "Currently enrolled as a student",
      "Meet the academic requirements",
      "Complete the application form",
    ],
  },
  {
    id: 4,
    name: "Digital Learning Grant",
    provider: "Student Support Foundation",
    amount: 10000,
    deadline: "28 Dec 2026",
    category: "Technology",
    match: 90,
    description:
      "A sample grant designed to help students access digital learning resources and educational technology.",
    eligibility: [
      "Currently pursuing an educational course",
      "Demonstrate a need for learning resources",
      "Submit the required documents",
    ],
  },
  {
    id: 5,
    name: "Women in Education Award",
    provider: "Education Foundation",
    amount: 30000,
    deadline: "10 Jan 2027",
    category: "Special Category",
    match: 78,
    description:
      "A sample educational support opportunity intended for eligible students under its specific award criteria.",
    eligibility: [
      "Meet the award's applicant criteria",
      "Currently enrolled in an educational institution",
      "Submit the required documents",
    ],
  },
  {
    id: 6,
    name: "Technical Education Support",
    provider: "Skills Development Trust",
    amount: 20000,
    deadline: "25 Jan 2027",
    category: "Technology",
    match: 93,
    description:
      "A sample support grant for students pursuing technical and skill-based education.",
    eligibility: [
      "Enrolled in a technical education course",
      "Meet the academic requirements",
      "Provide valid enrollment proof",
    ],
  },
];

const navigation = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Discover", icon: Search },
  { name: "Saved Scholarships", icon: Bookmark },
  { name: "My Applications", icon: FileText },
  { name: "My Profile", icon: User },
];

function formatAmount(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function ScholarshipCard({ item, saved, onSave, onDetails }) {
  return (
    <article className="scholarship-card">
      <div className="card-top">
        <div className="scholarship-icon">
          <GraduationCap />
        </div>

        <span className="match-badge">{item.match}% Match</span>
      </div>

      <span className="category">{item.category}</span>

      <h3>{item.name}</h3>
      <p className="provider">{item.provider}</p>

      <div className="card-divider" />

      <div className="scholarship-info">
        <div>
          <span>Scholarship amount</span>
          <strong>{formatAmount(item.amount)}</strong>
        </div>

        <div>
          <span>Application deadline</span>
          <strong>
            <Clock size={14} /> {item.deadline}
          </strong>
        </div>
      </div>

      <div className="card-actions">
        <button
          className="card-button"
          type="button"
          onClick={() => onDetails(item)}
        >
          View Details <ArrowUpRight size={17} />
        </button>

        <button
          type="button"
          className={`save-button ${saved ? "saved" : ""}`}
          onClick={() => onSave(item.id)}
          aria-label={saved ? "Remove saved scholarship" : "Save scholarship"}
          title={saved ? "Remove from saved" : "Save scholarship"}
        >
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
    </article>
  );
}

const fundingChartData = [
  { category: "Merit", funding: 65000 },
  { category: "Need", funding: 15000 },
  { category: "Technology", funding: 30000 },
  { category: "Special", funding: 30000 },
];

const categoryChartData = [
  { name: "Merit Based", value: 2 },
  { name: "Need Based", value: 1 },
  { name: "Technology", value: 2 },
  { name: "Special Category", value: 1 },
];

const chartColors = ["#8064e8", "#5595ed", "#37ad76", "#e99a4e"];

function AnalyticsSection() {
  return (
    <section className="analytics-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">VISUALIZE OPPORTUNITIES</p>
          <h2>Scholarship Analytics</h2>
        </div>
        <span className="analytics-label">Demo insights</span>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-card-heading">
            <div>
              <h3>Funding by Category</h3>
              <p>Sample scholarship amounts</p>
            </div>
            <IndianRupee size={20} />
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={fundingChartData}
                margin={{ top: 10, right: 8, left: -15, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eeeaf5"
                />
                <XAxis
                  dataKey="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#858297", fontSize: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#858297", fontSize: 10 }}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [
                    `₹${Number(value).toLocaleString("en-IN")}`,
                    "Funding",
                  ]}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #eeeaf5",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="funding"
                  fill="#8064e8"
                  radius={[7, 7, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-heading">
            <div>
              <h3>Opportunity Distribution</h3>
              <p>Sample opportunities by category</p>
            </div>
            <TrendingUp size={20} />
          </div>

          <div className="chart-container pie-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={chartColors[index % chartColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);

  const [savedIds, setSavedIds] = useState(() =>
    readStoredArray("grantly-saved").filter((id) =>
      scholarshipData.some((item) => item.id === id),
    ),
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const modalRef = useRef(null);

  const [applications, setApplications] = useState(() =>
    readStoredArray("grantly-applications")
      .filter(
        (application) =>
          application &&
          scholarshipData.some((item) => item.id === application.id) &&
          ALLOWED_STATUSES.includes(application.status),
      )
      .map((application) => {
        const scholarship = scholarshipData.find(
          (item) => item.id === application.id,
        );
        return {
          id: scholarship.id,
          name: scholarship.name,
          provider: scholarship.provider,
          amount: scholarship.amount,
          status: application.status,
        };
      }),
  );

  const [profile, setProfile] = useState(readStoredProfile);

  useEffect(() => {
    writeStoredValue("grantly-saved", savedIds);
  }, [savedIds]);

  useEffect(() => {
    writeStoredValue("grantly-applications", applications);
  }, [applications]);

  useEffect(() => {
    writeStoredValue("grantly-profile", profile);
  }, [profile]);

  useEffect(() => {
    if (!selectedScholarship) return undefined;

    const previousFocus = document.activeElement;
    const modal = modalRef.current;
    const focusableSelector =
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    modal?.querySelector(".modal-close")?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedScholarship(null);
        return;
      }

      if (event.key === "Tab" && modal) {
        const focusable = [...modal.querySelectorAll(focusableSelector)];
        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [selectedScholarship]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const toggleSave = (id) => {
    setSavedIds((previous) =>
      previous.includes(id)
        ? previous.filter((savedId) => savedId !== id)
        : [...previous, id],
    );
  };

  const applyForScholarship = (item) => {
    if (applications.some((application) => application.id === item.id)) {
      alert("This scholarship is already in your application tracker.");
      return;
    }

    setApplications((previous) => [
      ...previous,
      {
        id: item.id,
        name: item.name,
        provider: item.provider,
        amount: item.amount,
        status: "Planning",
      },
    ]);

    setSelectedScholarship(null);
    setActivePage("My Applications");
  };

  const filteredScholarships = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase("en-IN");

    return scholarshipData
      .filter((item) => {
        const matchesSearch =
          item.name.toLocaleLowerCase("en-IN").includes(normalizedSearch) ||
          item.provider.toLocaleLowerCase("en-IN").includes(normalizedSearch);

        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "amount") return b.amount - a.amount;
        if (sortBy === "deadline") {
          const parseDeadline = (value) =>
            new Date(`${value.slice(0, 6)} ${value.slice(7)}`).getTime();
          return parseDeadline(a.deadline) - parseDeadline(b.deadline);
        }
        return b.match - a.match;
      });
  }, [searchTerm, selectedCategory, sortBy]);

  const savedScholarships = useMemo(
    () => scholarshipData.filter((item) => savedIds.includes(item.id)),
    [savedIds],
  );

  const totalFunding = scholarshipData.reduce(
    (total, item) => total + item.amount,
    0,
  );

  const renderScholarshipList = (items) => (
    <section className="scholarship-grid">
      {items.length > 0 ? (
        items.map((item) => (
          <ScholarshipCard
            key={item.id}
            item={item}
            saved={savedIds.includes(item.id)}
            onSave={toggleSave}
            onDetails={setSelectedScholarship}
          />
        ))
      ) : (
        <div className="empty-state">
          <Search size={35} />
          <h3>No scholarships found</h3>
          <p>Try changing your search or category filter.</p>
        </div>
      )}
    </section>
  );

  return (
    <div className="app">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <GraduationCap size={25} />
          </div>

          <span>GRANTLY</span>

          <button
            type="button"
            aria-label="Close navigation menu"
            className="close-menu"
            onClick={() => setMenuOpen(false)}
          >
            <X />
          </button>
        </div>

        <div className="sidebar-label">MENU</div>

        <nav>
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.name}
                aria-current={activePage === item.name ? "page" : undefined}
                className={`nav-item ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => {
                  setActivePage(item.name);
                  setMenuOpen(false);
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>

                {item.name === "Saved Scholarships" && savedIds.length > 0 && (
                  <span className="nav-count">{savedIds.length}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <Sparkles size={22} />
            <h4>Your future matters.</h4>
            <p>Discover opportunities that can shape your education.</p>
          </div>

          <p className="sidebar-footer">GRANTLY © 2026</p>
        </div>
      </aside>

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)} />
      )}

      <main className="main-content">
        <header className="topbar">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>

          <div>
            <p className="topbar-subtitle">YOUR SCHOLARSHIP SPACE</p>
            <h2>{activePage}</h2>
          </div>

          <button
            type="button"
            className="notification-button"
            aria-label="Notifications (demo)"
            title="Notifications (demo)"
            disabled
          >
            <Bell size={20} />
            <span />
          </button>
        </header>

        {/* OVERVIEW */}

        {activePage === "Overview" && (
          <>
            <section className="welcome-section">
              <div>
                <p className="eyebrow">YOUR EDUCATION JOURNEY</p>
                <h1>Welcome back, {profile.name || "Student"}! 👋</h1>
                <p>Your next opportunity could be just one click away.</p>
              </div>

              <button
                type="button"
                className="primary-button"
                onClick={() => setActivePage("Discover")}
              >
                Explore Scholarships <ArrowUpRight size={18} />
              </button>
            </section>

            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon purple">
                  <IndianRupee />
                </div>
                <p>Available Funding</p>
                <h2>{formatAmount(totalFunding)}</h2>
                <span>Across sample opportunities</span>
              </div>

              <div className="stat-card">
                <div className="stat-icon blue">
                  <Bookmark />
                </div>
                <p>Saved Scholarships</p>
                <h2>{savedIds.length.toString().padStart(2, "0")}</h2>
                <span>Opportunities bookmarked</span>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">
                  <FileText />
                </div>
                <p>Applications</p>
                <h2>{applications.length.toString().padStart(2, "0")}</h2>
                <span>Applications being tracked</span>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">
                  <TrendingUp />
                </div>
                <p>Profile Completion</p>
                <h2>100%</h2>
                <span>Demo profile information</span>
              </div>
            </section>

            <AnalyticsSection />

            <section className="section-heading">
              <div>
                <p className="eyebrow">HANDPICKED FOR YOU</p>
                <h2>Recommended Scholarships</h2>
              </div>

              <button
                type="button"
                className="text-button"
                onClick={() => setActivePage("Discover")}
              >
                View all <ArrowUpRight size={16} />
              </button>
            </section>

            {renderScholarshipList(scholarshipData.slice(0, 3))}

            <section className="bottom-grid">
              <div className="panel">
                <div className="panel-heading">
                  <h3>Application Progress</h3>
                  <span className="status-pill">Your tracker</span>
                </div>

                <div className="progress-item">
                  <div>
                    <span>Scholarships saved</span>
                    <strong>{savedIds.length}</strong>
                  </div>
                  <div className="progress-track">
                    <div
                      style={{
                        width: `${Math.min(savedIds.length * 20, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="progress-item">
                  <div>
                    <span>Applications tracked</span>
                    <strong>{applications.length}</strong>
                  </div>
                  <div className="progress-track">
                    <div
                      style={{
                        width: `${Math.min(applications.length * 20, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="panel deadline-panel">
                <div className="panel-heading">
                  <h3>Upcoming Deadlines</h3>
                  <Clock size={19} />
                </div>

                <div className="deadline-item">
                  <div className="deadline-date">
                    <strong>30</strong>
                    <span>NOV</span>
                  </div>
                  <div>
                    <strong>National Scholarship</strong>
                    <p>Sample deadline</p>
                  </div>
                </div>

                <div className="deadline-item">
                  <div className="deadline-date">
                    <strong>15</strong>
                    <span>DEC</span>
                  </div>
                  <div>
                    <strong>Post Matric Scholarship</strong>
                    <p>Sample deadline</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* DISCOVER */}

        {activePage === "Discover" && (
          <section className="page-section">
            <div className="page-intro">
              <p className="eyebrow">FIND YOUR OPPORTUNITY</p>
              <h1>Discover Scholarships</h1>
              <p>Explore funding opportunities for your education.</p>
            </div>

            <div className="discover-toolbar">
              <div className="search-box">
                <Search size={19} />
                <input
                  type="search"
                  aria-label="Search scholarships or providers"
                  maxLength={80}
                  placeholder="Search scholarships or providers..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <div className="filter-control">
                <SlidersHorizontal size={17} />
                <select
                  aria-label="Filter by scholarship category"
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Merit Based">Merit Based</option>
                  <option value="Need Based">Need Based</option>
                  <option value="Technology">Technology</option>
                  <option value="Special Category">Special Category</option>
                </select>
              </div>

              <select
                aria-label="Sort scholarships"
                className="sort-control"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="amount">Highest Amount</option>
                <option value="deadline">Deadline</option>
              </select>
            </div>

            <div className="results-heading">
              <strong>{filteredScholarships.length} opportunities found</strong>
              <span>Sample scholarship database</span>
            </div>

            {renderScholarshipList(filteredScholarships)}
          </section>
        )}

        {/* SAVED SCHOLARSHIPS */}

        {activePage === "Saved Scholarships" && (
          <section className="page-section">
            <div className="page-intro">
              <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
              <h1>Saved Scholarships</h1>
              <p>Keep track of opportunities you want to explore.</p>
            </div>

            <div className="results-heading">
              <strong>{savedScholarships.length} saved opportunities</strong>
              <span>Stored on this device</span>
            </div>

            {savedScholarships.length > 0 ? (
              renderScholarshipList(savedScholarships)
            ) : (
              <div className="empty-state">
                <Bookmark size={38} />
                <h3>No saved scholarships yet</h3>
                <p>
                  Explore scholarships and click the bookmark icon to save one.
                </p>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => setActivePage("Discover")}
                >
                  Discover Scholarships <ArrowUpRight size={17} />
                </button>
              </div>
            )}
          </section>
        )}

        {/* APPLICATIONS */}

        {activePage === "My Applications" && (
          <section className="page-section">
            <div className="page-intro">
              <p className="eyebrow">KEEP EVERYTHING ORGANIZED</p>
              <h1>My Applications</h1>
              <p>Track the scholarships you plan to apply for.</p>
            </div>

            {applications.length === 0 ? (
              <div className="empty-state">
                <FileText size={38} />
                <h3>No applications tracked yet</h3>
                <p>Open a scholarship and select Add to Application Tracker.</p>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => setActivePage("Discover")}
                >
                  Find Scholarships <ArrowUpRight size={17} />
                </button>
              </div>
            ) : (
              <div className="application-list">
                {applications.map((item) => (
                  <div className="application-card" key={item.id}>
                    <div className="scholarship-icon">
                      <GraduationCap />
                    </div>

                    <div className="application-details">
                      <h3>{item.name}</h3>
                      <p>{item.provider}</p>
                      <strong>{formatAmount(item.amount)}</strong>
                    </div>

                    <select
                      aria-label={`Application status for ${item.name}`}
                      value={item.status}
                      onChange={(event) =>
                        setApplications((previous) =>
                          previous.map((application) =>
                            application.id === item.id
                              ? { ...application, status: event.target.value }
                              : application,
                          ),
                        )
                      }
                    >
                      <option>Planning</option>
                      <option>Documents Pending</option>
                      <option>Submitted</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>

                    <button
                      type="button"
                      className="remove-button"
                      aria-label={`Remove ${item.name} from application tracker`}
                      onClick={() =>
                        setApplications((previous) =>
                          previous.filter(
                            (application) => application.id !== item.id,
                          ),
                        )
                      }
                    >
                      <X size={17} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* PROFILE */}

        {activePage === "My Profile" && (
          <section className="page-section">
            <div className="page-intro">
              <p className="eyebrow">YOUR STUDENT INFORMATION</p>
              <h1>My Profile</h1>
              <p>
                Update your details to help organize scholarship opportunities.
              </p>
            </div>

            <form
              className="profile-form"
              onSubmit={(event) => {
                event.preventDefault();
                const marks = Number(profile.marks);
                const income = Number(profile.income);
                if (
                  !profile.name.trim() ||
                  !profile.course.trim() ||
                  !profile.state.trim() ||
                  !Number.isFinite(marks) ||
                  marks < 0 ||
                  marks > 100 ||
                  !Number.isFinite(income) ||
                  income < 0
                ) {
                  alert("Please enter valid profile details.");
                  return;
                }
                setProfile((previous) => ({
                  ...previous,
                  name: previous.name.trim(),
                  course: previous.course.trim(),
                  state: previous.state.trim(),
                  marks: String(marks),
                  income: String(income),
                }));
                alert("Your profile has been saved on this device.");
              }}
            >
              <div className="profile-avatar">
                <User size={34} />
              </div>

              <div className="form-group">
                <label htmlFor="profile-name">Full Name</label>
                <input
                  id="profile-name"
                  required
                  maxLength={60}
                  autoComplete="name"
                  value={profile.name}
                  onChange={(event) =>
                    setProfile((previous) => ({
                      ...previous,
                      name: cleanText(event.target.value, 60),
                    }))
                  }
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile-course">Course / Education</label>
                <input
                  id="profile-course"
                  required
                  maxLength={80}
                  value={profile.course}
                  onChange={(event) =>
                    setProfile((previous) => ({
                      ...previous,
                      course: cleanText(event.target.value, 80),
                    }))
                  }
                  placeholder="Enter your course"
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile-state">State</label>
                <input
                  id="profile-state"
                  required
                  maxLength={60}
                  value={profile.state}
                  onChange={(event) =>
                    setProfile((previous) => ({
                      ...previous,
                      state: cleanText(event.target.value, 60),
                    }))
                  }
                  placeholder="Enter your state"
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile-marks">Academic Marks (%)</label>
                <input
                  id="profile-marks"
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  max="100"
                  value={profile.marks}
                  onChange={(event) =>
                    setProfile((previous) => ({
                      ...previous,
                      marks: event.target.value,
                    }))
                  }
                  placeholder="Enter your marks"
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile-income">Annual Family Income (₹)</label>
                <input
                  id="profile-income"
                  type="number"
                  required
                  step="1"
                  min="0"
                  max="1000000000"
                  value={profile.income}
                  onChange={(event) =>
                    setProfile((previous) => ({
                      ...previous,
                      income: event.target.value,
                    }))
                  }
                  placeholder="Enter annual income"
                />
              </div>

              <button type="submit" className="primary-button">
                <CheckCircle size={17} /> Save Profile
              </button>
            </form>
          </section>
        )}

        <footer className="main-footer">
          Built with purpose. Designed for opportunity.
          <strong>GRANTLY</strong>
        </footer>
      </main>

      {/* SCHOLARSHIP DETAILS MODAL */}

      {selectedScholarship && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedScholarship(null)}
        >
          <div
            className="scholarship-modal"
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="scholarship-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close scholarship details"
              className="modal-close"
              onClick={() => setSelectedScholarship(null)}
            >
              <X size={20} />
            </button>

            <div className="modal-icon">
              <GraduationCap size={28} />
            </div>

            <span className="category">{selectedScholarship.category}</span>

            <h2 id="scholarship-modal-title">{selectedScholarship.name}</h2>

            <p className="provider">{selectedScholarship.provider}</p>

            <div className="modal-amount">
              <span>Sample scholarship amount</span>
              <strong>{formatAmount(selectedScholarship.amount)}</strong>
            </div>

            <p className="modal-description">
              {selectedScholarship.description}
            </p>

            <h3>Eligibility checklist</h3>

            <div className="eligibility-list">
              {selectedScholarship.eligibility.map((condition) => (
                <div key={condition}>
                  <CheckCircle size={17} />
                  <span>{condition}</span>
                </div>
              ))}
            </div>

            <div className="modal-deadline">
              <CalendarDays size={18} />
              <span>
                Sample deadline: <strong>{selectedScholarship.deadline}</strong>
              </span>
            </div>

            <div className="modal-notice">
              Demo information only. Verify the official scheme, eligibility,
              deadline and application website before applying.
            </div>

            <button
              type="button"
              className="primary-button modal-apply"
              onClick={() => applyForScholarship(selectedScholarship)}
            >
              Add to Application Tracker <ArrowUpRight size={17} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
