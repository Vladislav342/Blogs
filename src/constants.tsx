export const labelsForPopupModal = {
  editingLabel: 'Editing the Blog',
  editinMsg: 'Your blog was successfully edited !',
  creatingLabel: 'Creating a new Blog',
  creatingMsg: 'Your blog was successfully added !',
  deletingLabel: 'Deleting the Blog',
  deletingMsg: 'Your blog was successfully removed !',
} as const;

export const labelsAskModal = {
  askMsg: 'Are you sure you want to delete this blog?',
  btnYes: "Yes, I'm sure",
  btnNo: 'No, cancel',
} as const;

export const labelsErrorModal = {
  authError: 'Session timed out! Please, log in. ',
  editBlogError: 'Failed to edit blog!',
  creatNewBlog: 'Failed to creat a new blog!',
  removeBlog: 'Failed to remove the blog!',
  getBlogsError: 'Failed to get blogs!',
  logInError: 'Failed to log in!',
  signInError: 'Failed to sign in!',
  closebtn: 'Close',
  wrongPass: 'Please, check you passwords.',
  noToken: 'Failed to get Token. Please, log in.',
  logOutError: 'Failed to log out.',
} as const;

export const labels = {
  title: 'UA News',
} as const;
