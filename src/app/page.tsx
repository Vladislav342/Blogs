'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData, removeBlog } from '@/lib/http';
import { PostDataDto } from '@/types/PostDataDto';
import { PopupModal } from '@/components/PopupModal';
import {
  labelsForPopupModal,
  labelsAskModal,
  labelsErrorModal,
  labels,
} from '@/constants';
import { BsTrash } from 'react-icons/bs';
import { ErrorModal } from '@/components/ErrorModal';
import { formatFullDate } from '@/common/utils';
import { ImSpinner9 } from 'react-icons/im';

export default function Posts() {
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const [isShowAskModal, setShowAskModal] = useState<boolean>(false);
  const [isRemove, setRemove] = useState<boolean>(false);
  const [isErrorModal, setErrorModal] = useState<boolean>(false);
  const [typeOfError, setTypeOfError] = useState<string>('');
  const [msgOfError, setMsgOfError] = useState<string>('');
  const [posts, setPosts] = useState<PostDataDto[]>([]);
  const [auth, setAuth] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  let [search, setSearch] = useState<string>('');

  const styleClass = auth ? 'flex w-90 h-100' : 'flex w-90 h-100';
  const styleClass2 = auth ? 'flex flex-col w-4/5' : 'flex flex-col';

  useEffect(() => {
    (async () => {
      try {
        const data = await getSortedPostsData();
        setPosts(data);
      } catch {
        setMsgOfError(labelsErrorModal.getBlogsError);
        setErrorModal(true);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (isRemove && id) {
      (async () => {
        try {
          const data = await removeBlog(id);
          if (data === "You're not authorized !") {
            localStorage.removeItem('token');
            setTypeOfError('auth');
            setMsgOfError(labelsErrorModal.authError);
            setErrorModal(true);
          }
          if (data !== "You're not authorized !") {
            setShowModal(true);
          }
        } catch {
          setMsgOfError(labelsErrorModal.removeBlog);
          setErrorModal(true);
        }
      })();
      setId('');
    }
  }, [isRemove]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getSortedPostsData();
        let filteredData = data.filter(item =>
          item.title.toLowerCase().includes(search.toLowerCase()),
        );
        setPosts(filteredData);
      } catch {
        setErrorModal(true);
        setMsgOfError(labelsErrorModal.removeBlog);
      } finally {
        setLoading(false);
      }
    })();
  }, [search]);

  useEffect(() => {
    const refreshToken = localStorage.getItem('token');
    refreshToken ? setAuth(true) : setAuth(false);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    window.location.reload();
  };

  const handleCLoseAskModal = (action: string) => {
    if (action === 'remove') {
      setRemove(true);
    }
    setShowAskModal(false);
  };

  const handleErrorModal = () => {
    setErrorModal(false);
    setTypeOfError('');
    window.location.reload();
  };

  return (
    <div>
      <Head>
        <title>{labels.title}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      <div className="container mx-auto bg-white-100 w-screen max-h-screen mr-10 overscroll-x-none">
        <div>
          <div className="flex justify-center items-center">
            <form className="w-full max-w-sm">
              <div className="flex items-center border-b border-teal-500 py-2">
                <input
                  onChange={e => setSearch(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Search"
                />
              </div>
            </form>
            {auth ? (
              <button className="mx-4 bg-pink-400 hover:bg-pink-500 text-white rounded py-1 px-2">
                <Link href="/blogs/new_blog">Add New Blog</Link>
              </button>
            ) : null}
          </div>
          <div className="flex justify-center items-center overflow-hidden">
            <div className={styleClass}>
              <ul className="flex-autoflex-auto">
                {loading && (
                  <ImSpinner9 className="h-20 w-40 mt-32 mx-auto text-green-300 animate-spin"></ImSpinner9>
                )}
                {!loading ? (
                  posts.length ? (
                    posts.map(({ _id, title, date }) => (
                      <li key={_id} className="my-10 mx-160 flex">
                        <div className={styleClass2}>
                          <span className="text-xs">
                            {formatFullDate(date)}
                          </span>
                          <Link
                            href={`/${_id}`}
                            className="font-normal text-lg hover:underline items-center hover:text-blue-400"
                          >
                            {title}
                          </Link>
                        </div>
                        <div>
                          {auth ? (
                            <button className="mx-4 bg-lime-300 hover:bg-lime-600 text-white rounded py-1 px-2">
                              <Link href={`/blogs/edit_blog/${_id}`}>
                                {'Edit'}
                              </Link>
                            </button>
                          ) : null}
                          {auth ? (
                            <button
                              className="bg-sky-300 hover:bg-sky-600 text-white rounded py-1 px-2"
                              onClick={() => {
                                setId(_id || '');
                                setShowAskModal(true);
                              }}
                            >
                              Delete
                            </button>
                          ) : null}
                        </div>
                        <hr />
                      </li>
                    ))
                  ) : (
                    <h1 className="mt-48">{'No Blogs'}</h1>
                  )
                ) : null}
              </ul>
            </div>
          </div>
        </div>
        {isShowModal ? (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <PopupModal
                  title={labelsForPopupModal.deletingLabel}
                  msg={labelsForPopupModal.deletingMsg}
                />
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      onClick={() => handleClose()}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Apply
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {isShowAskModal ? (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <BsTrash className="w-32 h-32 text-red-600 mx-auto" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="mt-2">
                      <p className="text-sm leading-5 text-gray-500">
                        {labelsAskModal.askMsg}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      onClick={() => handleCLoseAskModal('remove')}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      {labelsAskModal.btnYes}
                    </button>
                  </span>
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      onClick={() => handleCLoseAskModal('close')}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      {labelsAskModal.btnNo}
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {isErrorModal ? (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <ErrorModal typeOfIcon={typeOfError} msg={msgOfError} />
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
}
