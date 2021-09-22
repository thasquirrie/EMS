import { Link } from 'react-router-dom';

/* This example requires Tailwind CSS v2.0+ */
export default function NotApprovedPage() {
  const clickHandler = () => {
    localStorage.removeItem('userInfo');
  };

  return (
    <div className='min-h-screen pt-16 pb-12 flex flex-col bg-white'>
      <main className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex-shrink-0 flex justify-center'>
          <a href='/' className='inline-flex'>
            <span className='sr-only'>Workflow</span>
            {/* <img
              className='h-12 w-auto'
              src='https://tailwindui.com/img/logos/workflow-mark.svg?color=blue&shade=600'
              alt=''
            /> */}
            <h2 className='font-bold text-blue-700 text-3xl'>EMS</h2>
          </a>
        </div>
        <div className='py-16'>
          <div className='text-center'>
            <p className='text-sm font-semibold text-blue-600 uppercase tracking-wide'>
              403 error
            </p>
            <h1 className='mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
              Not Approved
            </h1>
            <p className='mt-2 text-base text-gray-500'>
              Your registration has not been approved yet. Please wait for
              approval
            </p>
            <div className='mt-6'>
              <Link
                to='/'
                className='text-base font-medium text-blue-600 hover:text-blue-500'
                onClick={clickHandler}
              >
                Go back home<span aria-hidden='true'> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className='flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <nav className='flex justify-center space-x-4'>
          <Link
            to='#'
            className='text-sm font-medium text-gray-500 hover:text-gray-600'
          >
            Contact Support
          </Link>
          <span
            className='inline-block border-l border-gray-300'
            aria-hidden='true'
          />
          {/* <a
            href='#'
            className='text-sm font-medium text-gray-500 hover:text-gray-600'
          >
            Status
          </a>
          <span
            className='inline-block border-l border-gray-300'
            aria-hidden='true'
          />
          <a
            href='#'
            className='text-sm font-medium text-gray-500 hover:text-gray-600'
          >
            Twitter
          </a> */}
        </nav>
      </footer>
    </div>
  );
}
