import { MdNoEncryptionGmailerrorred } from 'react-icons/md';

interface IErrorModal {
  typeOfIcon: string;
  msg: string;
}

export const ErrorModal = (params: IErrorModal) => {
  return (
    <div className="sm:flex sm:items-start">
      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
        {params.typeOfIcon === 'auth' ? (
          <MdNoEncryptionGmailerrorred className="w-32 h-32 text-red-600 mx-auto" />
        ) : (
          <svg
            className="w-32 h-32 text-red-600 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        )}
      </div>
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <div className="mt-2">
          <p className="text-sm leading-5 text-gray-500">{params.msg}</p>
        </div>
      </div>
    </div>
  );
};
