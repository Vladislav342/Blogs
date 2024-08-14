'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getToken, removeToken } from '@/lib/http';
import { labelsErrorModal } from '@/constants';

const MainHeader = () => {
  const router = useRouter();
  const [auth, setAuth] = useState<boolean>(false);
  const [isLogOut, setLogOut] = useState<boolean>(false);

  useEffect(() => {
    if (isLogOut) {
      localStorage.removeItem('token');
      (async (): Promise<string> => {
        try {
          const data = await removeToken();
          setAuth(false);
          if (data) {
            window.location.reload();
          }
          return data;
        } catch {
          throw new Error(labelsErrorModal.logOutError);
        }
      })();
    }
  }, [isLogOut]);

  useEffect(() => {
    (async (): Promise<string> => {
      try {
        const data = await getToken();
        if (data) {
          setAuth(true);
          router.refresh();
        }
        return data;
      } catch {
        throw new Error(labelsErrorModal.noToken);
      }
    })();
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-500  to-green-100 from-cyan-500 flex justify-between items-center px-4 h-20 mb-4">
      <div>
        <i className="uppercase text-white tracking-wide font-bold text-3xl">
          UA News
        </i>
      </div>
      {auth ? (
        <div className="flex justify-center items-center gap-3">
          <button
            className="bg-transparent bg-yellow-500 hover:bg-amber-300 text-blue-700 text-white font-semibold hover:text-white py-1 px-1 border border-yellow-500 hover:border-transparent rounded cursor-pointer"
            onClick={() => setLogOut(true)}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-3">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded cursor-pointer">
            <Link href="/log_in">Log In</Link>
          </button>
          <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-1 px-1 border border-green-500 hover:border-transparent rounded cursor-pointer">
            <Link href="/sign_in">Sign In</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default MainHeader;
