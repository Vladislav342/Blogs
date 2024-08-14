interface IPopupModal {
  title: string;
  msg: string;
}

export const PopupModal = (params: IPopupModal) => {
  return (
    <div className="sm:flex sm:items-start">
      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
        <svg
          className="h-6 w-6 text-green-600"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {params.title}
        </h3>
        <div className="mt-2">
          <p className="text-sm leading-5 text-gray-500">{params.msg}</p>
        </div>
      </div>
    </div>
  );
};
