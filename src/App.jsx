import { useEffect, useState } from "react";
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
  Heart,
  SlidersHorizontal,
  CalendarDays,
  MapPin,
  Building2,
  ExternalLink,
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
        <button className="card-button" onClick={() => onDetails(item)}>
          View Details <ArrowUpRight size={17} />
        </button>

        <button
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

  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("grantly-saved")) || [];
    } catch {
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const [applications, setApplications] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("grantly-applications")) || [];
    } catch {
      return [];
    }
  });

  const [profile, setProfile] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("grantly-profile")) || {
          name: "Student",
          course: "Diploma in Computer Technology",
          state: "Maharashtra",
          marks: "75",
          income: "150000",
        }
      );
    } catch {
      return {
        name: "Student",
        course: "Diploma in Computer Technology",
        state: "Maharashtra",
        marks: "75",
        income: "150000",
      };
    }
  });

  useEffect(() => {
    localStorage.setItem("grantly-saved", JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem("grantly-applications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem("grantly-profile", JSON.stringify(profile));
  }, [profile]);

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

  const filteredScholarships = scholarshipData
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provider.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      if (sortBy === "deadline") {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return b.match - a.match;
    });

  const savedScholarships = scholarshipData.filter((item) =>
    savedIds.includes(item.id),
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

          <button className="close-menu" onClick={() => setMenuOpen(false)}>
            <X />
          </button>
        </div>

        <div className="sidebar-label">MENU</div>

        <nav>
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
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
          <button className="mobile-menu" onClick={() => setMenuOpen(true)}>
            <Menu />
          </button>

          <div>
            <p className="topbar-subtitle">YOUR SCHOLARSHIP SPACE</p>
            <h2>{activePage}</h2>
          </div>

          <button className="notification-button">
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
                  type="text"
                  placeholder="Search scholarships or providers..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <div className="filter-control">
                <SlidersHorizontal size={17} />
                <select
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
                      className="remove-button"
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
                alert("Your profile has been saved on this device.");
              }}
            >
              <div className="profile-avatar">
                <User size={34} />
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  value={profile.name}
                  onChange={(event) =>
                    setProfile({ ...profile, name: event.target.value })
                  }
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Course / Education</label>
                <input
                  value={profile.course}
                  onChange={(event) =>
                    setProfile({ ...profile, course: event.target.value })
                  }
                  placeholder="Enter your course"
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  value={profile.state}
                  onChange={(event) =>
                    setProfile({ ...profile, state: event.target.value })
                  }
                  placeholder="Enter your state"
                />
              </div>

              <div className="form-group">
                <label>Academic Marks (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={profile.marks}
                  onChange={(event) =>
                    setProfile({ ...profile, marks: event.target.value })
                  }
                  placeholder="Enter your marks"
                />
              </div>

              <div className="form-group">
                <label>Annual Family Income (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={profile.income}
                  onChange={(event) =>
                    setProfile({ ...profile, income: event.target.value })
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
          onClick={() => setSelectedScholarship(null)}
        >
          <div
            className="scholarship-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedScholarship(null)}
            >
              <X size={20} />
            </button>

            <div className="modal-icon">
              <GraduationCap size={28} />
            </div>

            <span className="category">{selectedScholarship.category}</span>

            <h2>{selectedScholarship.name}</h2>

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
