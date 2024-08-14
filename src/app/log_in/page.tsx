'use client';
import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { logIn } from '@/lib/http';
import { useRouter } from 'next/navigation';
import { CgSpinner } from 'react-icons/cg';
import { ErrorModal } from '@/components/ErrorModal';
import { labelsErrorModal } from '@/constants';
import { VscArrowLeft } from 'react-icons/vsc';

const SignInForm: FC = () => {
  const router = useRouter();
  const [loginValue, setLoginValue] = useState<string>('');
  const [isLoginTouched, setIsLoginTouched] = useState<boolean>(false);

  const [passValue, setPassValue] = useState<string>('');
  const [isPassTouched, setIsPassTouched] = useState<boolean>(false);

  const [loginUser, setLoginUser] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [isErrorModal, setErrorModal] = useState<boolean>(false);
  const [msgOfError, setMsgOfError] = useState<string>('');

  const isValid = loginValue.trim().length > 0;
  const hasError = !isValid && isLoginTouched;

  const isPassValid = passValue.trim().length > 0;
  const isWrongPass = passValue.trim().length < 8;
  const hasPassError =
    (!isPassValid && isPassTouched) || (isWrongPass && isPassTouched);

  const passClass = `w-full rounded-md pl-10 text-sm ${
    hasPassError
      ? 'bg-red-100'
      : 'border-gray-300 focus:border-green-500 focus:ring-blue-500 bg-cyan-200'
  }`;

  const loginClass = `w-full rounded-md pl-10 text-sm ${
    hasError ? 'bg-red-100' : 'border-gray-300 focus:ring-blue-500 bg-cyan-200'
  }`;

  useEffect(() => {
    const refreshToken = localStorage.getItem('token');
    if (refreshToken) {
      router.push('/');
    }
  }, []);

  const doSteps = (msg: string) => {
    setLoginUser(false);
    setMsgOfError(msg);
    setErrorModal(true);
  };

  useEffect(() => {
    if (loginUser && !hasError && !hasPassError) {
      setLoading(true);
      (async () => {
        try {
          const data = await logIn({ loginValue, passValue, action: 'logIn' });
          if (typeof data !== 'string' && data.token) {
            localStorage.setItem('token', data.token);
            window.location.reload();
          }
          if (typeof data === 'string') {
            doSteps(data);
          }
          return data;
        } catch {
          doSteps(labelsErrorModal.logInError);
        }
      })();
      setLoading(false);
    }
  }, [loginUser]);

  const handleErrorModal = () => {
    setLoginUser(false);
    setErrorModal(false);
  };

  return (
    <div>
      <button className="flex justify-start items-center bg-cyan-400 hover:bg-cyan-700 text-white rounded py-1 px-2 mt-5">
        <VscArrowLeft />
        <Link href="/">Back</Link>
      </button>
      <div className="min-h-screen bg-pink bg-fixed bg-bottom bg-no-repeat">
        <main className="flex flex-col justify-center p-6 pb-12">
          <div className="mx-auto max-w-md">
            <svg
              className="mx-auto h-12 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:mt-6 sm:text-3xl">
              Log In Your Account
            </h2>
          </div>
          <div className="mx-auto mt-6 w-full max-w-md rounded-xl bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:mt-10 sm:p-10 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Login
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={e => setLoginValue(e.target.value)}
                  onBlur={() => setIsLoginTouched(true)}
                  required
                  className={loginClass}
                  placeholder="your login"
                />
              </div>
              {hasError && (
                <div className="flex justify-center">
                  <p className="mt-1 text-sm text-red-500">
                    Username is required.
                  </p>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={passClass}
                  onChange={e => setPassValue(e.target.value)}
                  onBlur={() => setIsPassTouched(true)}
                  minLength={8}
                  placeholder="Minimum 8 characters"
                />
              </div>
              {hasPassError && !isPassValid && (
                <div className="flex justify-center">
                  <p className="mt-1 text-sm text-red-500">
                    Password is required.
                  </p>
                </div>
              )}
              {hasPassError && isPassValid && isWrongPass && (
                <div className="flex justify-center">
                  <p className="mt-1 text-sm text-red-500">
                    Minimum 8 characters.
                  </p>
                </div>
              )}
            </div>

            <div>
              {isLoading ? (
                <button className="flex items-center justify-center rounded-md w-full bg-green-600 py-2 px-4 font-semibold text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled">
                  <CgSpinner className="animate-spin text-pink-700 h-5 w-5 mr-3" />
                  Log In
                </button>
              ) : (
                <button
                  onClick={() => setLoginUser(true)}
                  className="flex items-center justify-center rounded-md w-full bg-green-600 py-2 px-4 font-semibold text-white shadow-lg transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Log In
                </button>
              )}
            </div>
            <div className="mt-6 flex items-center justify-center">
              <Link
                href="/sign_in"
                className="text-sm font-medium text-green-600 hover:text-green-300"
              >
                Not have an account yet?
              </Link>
            </div>
          </div>
        </main>

        {isErrorModal ? (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <ErrorModal typeOfIcon={''} msg={msgOfError} />
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      onClick={() => handleErrorModal()}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      {labelsErrorModal.closebtn}
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SignInForm;
