'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import UserProfile from './UserProfile';
import styles from '@/styles/navbar.module.css';

export default function Navbar() {
  const { role, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <Link href="/home" className={styles.logo}>
            📚 BookStore
          </Link>

          <div className={styles.menu}>
            {role ? (
              <>
                <Link href="/explore" className={styles.link}>
                  Explore
                </Link>

                {role === 'reader' && (
                  <>
                    <Link href="/wishlist" className={styles.link}>
                      ♡ Wishlist
                    </Link>
                    <Link href="/purchases" className={styles.link}>
                      📥 Purchases
                    </Link>
                  </>
                )}

                {role === 'author' && (
                  <>
                    <Link href="/addbook" className={styles.link}>
                      ➕ Add Book
                    </Link>
                    <Link href="/dashboard" className={styles.link}>
                      📊 Dashboard
                    </Link>
                    <Link href="/analytics" className={styles.link}>
                      📈 Analytics
                    </Link>
                  </>
                )}

                <div className={styles.userSection}>
                  <button
                    className={styles.profileBtn}
                    onClick={() => setShowProfile(true)}
                    title="Profile"
                  >
                    👤
                  </button>
                  <span className={styles.userRole}>{role}</span>
                  <button onClick={logout} className={styles.logoutBtn}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link href="/" className={styles.link}>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
    </>
  );
}

