'use client';

import React, { useState, useEffect } from 'react';
import { userService, UserProfile } from '@/services/userService';
import { showToast } from '@/utils/toast';
import styles from '@/styles/userprofile.module.css';

interface UserProfileProps {
  onClose: () => void;
}

export default function UserProfileComponent({ onClose }: UserProfileProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfile(data);
        setFormData({ username: data.username, bio: data.bio || '' });
      } catch (err) {
        showToast('Failed to load profile', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      const updated = await userService.updateProfile(formData);
      setProfile(updated);
      setIsEditing(false);
      showToast('Profile updated successfully', 'success');
    } catch (err) {
      showToast('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.content}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {profile && (
          <>
            <div className={styles.header}>
              <h2>{profile.username}</h2>
              <span className={styles.role}>{profile.role}</span>
            </div>

            {isEditing ? (
              <form className={styles.form}>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className={styles.input}
                />
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Write a short bio..."
                  className={styles.textarea}
                  rows={4}
                />
                <div className={styles.actions}>
                  <button type="button" onClick={handleSave} className={styles.saveBtn}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.info}>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
                {profile.bio && <p><strong>Bio:</strong> {profile.bio}</p>}

                {profile.stats && (
                  <div className={styles.stats}>
                    {profile.stats.totalBooks && (
                      <div className={styles.stat}>
                        <span className={styles.statLabel}>Books Published</span>
                        <span className={styles.statValue}>{profile.stats.totalBooks}</span>
                      </div>
                    )}
                    {profile.stats.totalPurchases && (
                      <div className={styles.stat}>
                        <span className={styles.statLabel}>Books Purchased</span>
                        <span className={styles.statValue}>{profile.stats.totalPurchases}</span>
                      </div>
                    )}
                    {profile.stats.totalReviews && (
                      <div className={styles.stat}>
                        <span className={styles.statLabel}>Reviews Written</span>
                        <span className={styles.statValue}>{profile.stats.totalReviews}</span>
                      </div>
                    )}
                  </div>
                )}

                <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
