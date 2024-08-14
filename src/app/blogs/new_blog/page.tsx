'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { VscArrowLeft } from 'react-icons/vsc';
import { useRouter } from 'next/navigation';
import { labelsForPopupModal, labelsErrorModal } from '@/constants';
import { PopupModal } from '@/components/PopupModal';
import { ErrorModal } from '@/components/ErrorModal';
import { createBlog } from '@/lib/http';

const BlogPosts = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const [create, setCreate] = useState(false);
  const [isErrorModal, setErrorModal] = useState<boolean>(false);
  const [typeOfError, setTypeOfError] = useState<string>('');
  const [msgOfError, setMsgOfError] = useState<string>('');

  const doSteps = (msg: string) => {
    setErrorModal(true);
    setMsgOfError(msg);
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem('token');
    if (!refreshToken) {
      router.push('/');
    }
  });

  useEffect(() => {
    if (create) {
      let day = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      let date = `${year}-${month}-${day}`;

      (async () => {
        try {
          const data = await createBlog({ title, content, date });
          if (data === "You're not authorized !") {
            localStorage.removeItem('token');
            setTypeOfError('auth');
            doSteps(labelsErrorModal.authError);
          }
          if (typeof data === 'string' && data !== "You're not authorized !") {
            doSteps(data);
          }
          if (typeof data !== 'string') {
            setShowModal(true);
          }
          return data;
        } catch {
          setCreate(false);
          doSteps(labelsErrorModal.creatNewBlog);
        }
      })();
    }
  }, [create]);

  const handle = () => {
    setShowModal(false);
    router.push('/');
  };

  const handleErrorModal = () => {
    setErrorModal(false);
    setTypeOfError('');
    setMsgOfError('');
    window.location.reload();
  };

  return (
    <div>
      <button className="flex justify-start items-center bg-cyan-400 hover:bg-cyan-700 text-white rounded py-1 px-2">
        <VscArrowLeft />
        <Link href="/" className="">
          Back
        </Link>
      </button>
      <div className="grid grid-cols-1 gap-4 place-items-center h-56">
        <h1 className="my-10">New BLog</h1>
        <form className="w-9/12">
          <div className="flex items-center border-b border-teal-500 py-2 w-full">
            <input
              onChange={e => setTitle(e.target.value)}
              className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="relative mt-6 border border-indigo-600 data-twe-input-wrapper-init">
            <textarea
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none "
              id="exampleFormControlTextarea1"
              rows={4}
              placeholder="Content"
              onChange={e => setContent(e.target.value)}
            ></textarea>
          </div>
        </form>
        <button
          className="mt-10 bg-pink-400 hover:bg-pink-500 text-white rounded py-1 px-2"
          onClick={() => setCreate(true)}
        >
          Create New Blog
        </button>
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
                title={labelsForPopupModal.creatingLabel}
                msg={labelsForPopupModal.creatingMsg}
              />
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    onClick={() => handle()}
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
  );
};

export default BlogPosts;
