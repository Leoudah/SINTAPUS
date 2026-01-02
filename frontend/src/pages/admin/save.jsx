import React from "react";

function StatCard({ title, value, percent }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <div className="text-sm text-gray-500">{percent}%</div>
    </div>
  );
}

function Applicant({ name, role }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">{name.charAt(0)}</div>
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-gray-500">{role}</div>
      </div>
    </div>
  );
}

export default function DashboardAdmin() {
  const stats = [
    { title: "Content Designers", value: 3, percent: 78 },
    { title: "Node.js Developers", value: 9, percent: 28 },
    { title: "Senior UI Designer", value: 1, percent: 0 },
    { title: "Marketing Managers", value: 2, percent: 45 },
  ];

  const applicants = [
    { name: "Lewis S. Cunningham", role: "Applied for UI Developer" },
    { name: "Danny Nelson", role: "Applied for Node.js Developer" },
    { name: "Jennifer Patterson", role: "Applied for Marketing Manager" },
    { name: "Timothy Watson", role: "Applied for UX Designer" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-2 bg-white rounded-xl p-4 h-[80vh] sticky top-6 shadow-sm">
          <div className="mb-6 text-xl font-bold">Impozitions</div>
          <nav className="flex flex-col gap-2 text-sm text-gray-600">
            <button className="text-left px-3 py-2 rounded-md bg-indigo-50 text-indigo-700 font-medium">Dashboard</button>
            <button className="text-left px-3 py-2 rounded-md hover:bg-gray-50">Recruitment</button>
            <button className="text-left px-3 py-2 rounded-md hover:bg-gray-50">Onboarding</button>
            <button className="text-left px-3 py-2 rounded-md hover:bg-gray-50">Recruitment tasks</button>
            <button className="text-left px-3 py-2 rounded-md hover:bg-gray-50">Calendar</button>
            <button className="text-left px-3 py-2 rounded-md hover:bg-gray-50">Settings</button>
          </nav>
          <div className="mt-auto pt-6">
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md">Start chat</button>
          </div>
        </aside>

        {/* Main content */}
        <main className="col-span-7">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <input className="border rounded-md px-3 py-1" placeholder="Search..." />
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
            </div>
          </header>

          <section className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2 bg-indigo-600 rounded-xl p-6 text-white flex items-center justify-between">
              <div>
                <div className="text-lg">Hello Katie!</div>
                <div className="mt-2 text-sm opacity-90">You have 16 new applications. It is a lot of work for today! So let's start 🙂</div>
              </div>
              <div className="w-36 h-24 bg-indigo-500 rounded-lg flex items-center justify-center">👩‍💻</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium">March 2020</div>
                <div className="text-xs text-gray-400">•</div>
              </div>
              <div className="h-36 bg-gray-50 rounded-md flex items-center justify-center text-gray-400">Calendar</div>
            </div>
          </section>

          <section className="mb-6">
            <div className="grid grid-cols-4 gap-4">
              {stats.map((s) => (
                <StatCard key={s.title} title={s.title} value={s.value} percent={s.percent} />
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Recruitment progress</h2>
              <button className="text-sm text-indigo-600">See all</button>
            </div>
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500 text-xs">
                <tr>
                  <th className="pb-2">Full name</th>
                  <th className="pb-2">Position</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3">John Doe</td>
                  <td>UI Designer</td>
                  <td className="text-sm text-gray-600">Tech interview</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3">Ella Clinton</td>
                  <td>Content designer</td>
                  <td className="text-sm text-gray-600">Task</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3">Mike Tyler</td>
                  <td>Node.js Developer</td>
                  <td className="text-sm text-gray-600">Resume review</td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>

        {/* Right column */}
        <aside className="col-span-3">
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium">New Applicants</div>
              <button className="text-sm text-indigo-600">see all</button>
            </div>
            <div>
              {applicants.map((a) => (
                <Applicant key={a.name} name={a.name} role={a.role} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="font-medium mb-3">Support 24/7</div>
            <div className="text-sm text-gray-600">Contact us anytime</div>
            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md">Start chat</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
