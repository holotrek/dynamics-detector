"use client";

import DynamicsGuage from '../components/DynamicsGauge';

export default function Embed() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DynamicsGuage />
      </main>
    </div>
  );
}
