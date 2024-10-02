"use client";

import DynamicsGuage from './components/DynamicsGauge';
import { useState } from 'react';

const embedCode =
  '<iframe width="350" height="375" allow="microphone" src="https://dynamics-detector.honeydoodat.com/embed"></iframe>';

export default function Home() {
  const [codeCopied, setCodeCopied] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 w-3/4 items-center sm:items-start">
        <h1 className="flex flex-row w-full justify-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Dynamics Detector
        </h1>
        <div className="flex flex-row w-full justify-center">
          <DynamicsGuage />
        </div>
        <h3>Use the following code to embed this widget into your app:</h3>
        <div className="flex w-full">
          <input
            type="text"
            readOnly={true}
            value={embedCode}
            className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <span className="inline-flex items-center text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-gray-300 border-s-0 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(embedCode);
                setCodeCopied(true);
                setTimeout(() => setCodeCopied(false), 3000);
              }}
              className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Copy embed code</span>
            </button>
          </span>
        </div>
        <div
          className="p-4 w-full text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
          style={{ visibility: codeCopied ? "visible" : "hidden" }}
        >
          <span className="font-medium">Embed code copied!</span>
        </div>
      </main>
      <script
        defer
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="honeydoodat"
        data-description="Support me on Buy me a coffee!"
        data-message="Hey 👋 thanks for visiting! If you like this free site, buy me a coffee!"
        data-color="#5F7FFF"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
      />
    </div>
  );
}
