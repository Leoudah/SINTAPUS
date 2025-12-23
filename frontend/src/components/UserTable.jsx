export default function UserTable({ users }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id_user} className="border-t">
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">{user.is_verified}</td>
              <td className="px-4 py-2 text-center">
                <button className="px-3 py-1 bg-green-600 text-white rounded mr-2">
                  Verify
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded">
                  Deny
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
