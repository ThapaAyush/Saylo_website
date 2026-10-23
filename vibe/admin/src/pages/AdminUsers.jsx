import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi';
import { Users, ShieldAlert, CheckCircle, Ban, Check } from 'lucide-react';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsersAndReports = async () => {
    setLoading(true);
    try {
      const [u, rep] = await Promise.all([
        adminApi.getUsers(),
        adminApi.getReports(),
      ]);
      setUsers(u || []);
      setReports(rep || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAndReports();
  }, []);

  const handleToggleBlock = async (userId) => {
    try {
      const res = await adminApi.toggleBlockUser(userId);
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, isBlocked: res.isBlocked } : u));
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolveReport = async (reportId, status) => {
    try {
      await adminApi.updateReport(reportId, status);
      setReports(prev => prev.map(r => r._id === reportId ? { ...r, status } : r));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 p-6 sm:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-2 border-b border-white/5">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <span>USER OPS & MODERATION QUEUE</span>
          <span className="text-xl">🛡️</span>
        </h1>
        <p className="text-xs text-[#A1A1AA] mt-0.5">
          Learner accounts, activity progress, and trust & safety reporting queue.
        </p>
      </div>

      {/* Safety & Moderation Queue */}
      <div className="p-6 bg-[#111113] rounded-3xl border border-white/8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Safety Reports Queue ({reports.filter(r => r.status === 'pending').length} Pending)</span>
          </h2>
        </div>

        {reports.length === 0 ? (
          <p className="text-xs text-[#71717A] py-2">No active reports. Community is healthy ✨</p>
        ) : (
          <div className="space-y-2">
            {reports.map((r) => (
              <div
                key={r._id}
                className="p-3.5 bg-[#18181B] rounded-2xl border border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">
                    Reported {r.contentType}:
                  </span>
                  <p className="font-semibold text-white mt-0.5">Reason: "{r.reason}"</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${r.status === 'pending' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    {r.status}
                  </span>
                  {r.status === 'pending' && (
                    <button
                      onClick={() => handleResolveReport(r._id, 'reviewed')}
                      className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium"
                    >
                      Dismiss / Resolve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Users Roster Table */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">
          Registered Learners ({users.length})
        </h2>

        <div className="overflow-x-auto rounded-3xl border border-white/8 bg-[#111113]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#18181B] text-[#A1A1AA] uppercase tracking-wider font-mono text-[10px] border-b border-white/5">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Level & XP</th>
                <th className="p-4">Streak</th>
                <th className="p-4">Interests</th>
                <th className="p-4 text-right">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#E4E4E7]">
              {users.map((u) => {
                const profile = u.profile;
                return (
                  <tr key={u._id} className="hover:bg-white/2 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl select-none">{u.avatar || '⚡'}</span>
                        <div>
                          <span className="font-bold text-white block">{u.displayName || u.username}</span>
                          <span className="text-[10px] text-[#A1A1AA] font-mono">{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-[#8B5CF6]/20 text-[#A78BFA]' : 'bg-white/5 text-[#A1A1AA]'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 font-mono">
                      <span className="text-white font-bold">Lvl {profile?.levelNumber || 1}</span>
                      <span className="text-[#A1A1AA] text-[10px] block">{profile?.totalXp || 0} XP</span>
                    </td>
                    <td className="p-4 font-mono font-bold text-orange-400">
                      🔥 {profile?.streakCount || 1}d
                    </td>
                    <td className="p-4 text-[#A1A1AA]">
                      {profile?.interests?.slice(0, 2).join(', ') || 'General'}
                    </td>
                    <td className="p-4 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleToggleBlock(u._id)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${u.isBlocked ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' : 'bg-white/5 hover:bg-white/10 text-zinc-300'}`}
                        >
                          {u.isBlocked ? 'Unblock' : 'Suspend'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
