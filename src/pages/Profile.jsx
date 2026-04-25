import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { User, Mail, Shield, Save, Loader2, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/userService';
import { Button } from '../components/ui/Button';

export function Profile() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedUser = await updateProfile(formData);
      setUser(updatedUser);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Profile | Home Gym Store</title>
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <User className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" /> Full Name
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing || isSubmitting}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email Address
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing || isSubmitting}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors disabled:opacity-50"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row gap-4">
                {!isEditing ? (
                  <Button type="button" onClick={() => setIsEditing(true)} className="flex-1">
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)} disabled={isSubmitting}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </form>
          </div>

          <div className="mt-8 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-yellow-500" /> Account Security
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              You are currently logged in. Your role is: <span className="text-yellow-500 font-semibold uppercase">{user?.role}</span>
            </p>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <Key className="h-4 w-4" /> Change Password
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
