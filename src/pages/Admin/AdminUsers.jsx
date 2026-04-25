import { useState, useEffect } from 'react';
import { getAdminUsers, updateUserRole, deleteUser } from '../../services/UserService';
import { Loader2, User, Trash2, Shield, UserCheck } from 'lucide-react';

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAdminUsers();
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      console.error('Failed to update role:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Users</h1>
        <p className="text-zinc-400">Monitor who can access the store and admin workspace.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Joined</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center">
                          <User className="h-5 w-5 text-zinc-500" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-xs text-zinc-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                        {user.role === 'admin' ? <Shield className="h-3 w-3" /> : <UserCheck className="h-3 w-3" />}
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <select
                          className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs focus:border-yellow-500 outline-none"
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        >
                          <option value="user">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 text-zinc-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
