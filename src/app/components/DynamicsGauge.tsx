"use client";

import dynamic from 'next/dynamic';
import { defaultTickLabels } from 'react-gauge-component/dist/lib/GaugeComponent/types/Tick';
import { defaultValueLabel } from 'react-gauge-component/dist/lib/GaugeComponent/types/Labels';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDetectDynamics } from '../../hooks/useDetectDynamics';
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

export default function DynamicsGuage() {
  const { beginListening, dynamicStream } = useDetectDynamics();
  const [increment, setIncrement] = useState<number>();
  const [value, setValue] = useState(0);
  const [error, setError] = useState<string>();
  const lastTimeChanged = useRef<number>(new Date().getTime());

  useEffect(() => {
    try {
      beginListening(navigator);
    } catch (err: any) {
      setError(err.toString());
    }

    const sub = dynamicStream.subscribe({
      next: (val) => {
        const time = new Date().getTime();
        if (
          Math.abs(val - value) > 6 ||
          time - lastTimeChanged.current > 1000
        ) {
          setValue(val);
          lastTimeChanged.current = new Date().getTime();
        }
      },
      error: (err: any) => setError(err.toString()),
    });
    return () => {
      sub.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const inc = +(localStorage.getItem("increment") ?? 10);
    setIncrement(inc);
  }, []);

  const changeIncrement = useCallback((val: number) => {
    setIncrement(val);
    localStorage.setItem("increment", JSON.stringify(val));
  }, []);

  const getDynamic = useCallback(
    (val: number) => {
      if (!increment) {
        return "";
      }

      if (val < increment) {
        return "\uE52B";
      } else if (val < increment * 2) {
        return "\uE520";
      } else if (val < increment * 3) {
        return "\uE52C";
      } else if (val < increment * 4) {
        return "\uE52D";
      } else if (val < increment * 5) {
        return "\uE522";
      } else {
        return "\uE52F";
      }
    },
    [increment]
  );

  const _musicFontStyle = {
    fontFamily: "var(--font-bravura-text)",
  };
  const _valLabelBase = defaultValueLabel.style;
  const _tickLabelBase = defaultTickLabels.defaultTickValueConfig?.style;

  const _tickStart = (increment ?? 10) / 2;
  const _lastTick = _tickStart * 2 + (increment ?? 10) * 5;

  return !increment ? (
    <></>
  ) : !!error ? (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span className="font-medium">Error:</span>
      Unable to listen to microphone.
    </div>
  ) : (
    <div className="flex flex-col m-2">
      <div className="relative mb-6">
        <label
          htmlFor="default-range"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Adjust for voicing:
        </label>
        <input
          id="default-range"
          type="range"
          min={5}
          max={15}
          value={increment}
          onChange={(e) => changeIncrement(+e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
          Softer
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
          Louder
        </span>
      </div>

      <GaugeComponent
        value={value}
        minValue={0}
        maxValue={_lastTick}
        type="radial"
        labels={{
          valueLabel: {
            formatTextValue: getDynamic,
            style: { ..._valLabelBase, ..._musicFontStyle, scale: 2 },
          },
          tickLabels: {
            type: "inner",
            ticks: [
              { value: 0, valueConfig: { formatTextValue: () => "" } },
              {
                value: _tickStart,
                valueConfig: { formatTextValue: () => "\uE52B" },
              },
              {
                value: _tickStart + increment,
                valueConfig: { formatTextValue: () => "\uE520" },
              },
              {
                value: _tickStart + increment * 2,
                valueConfig: { formatTextValue: () => "\uE52C" },
              },
              {
                value: _tickStart + increment * 3,
                valueConfig: { formatTextValue: () => "\uE52D" },
              },
              {
                value: _tickStart + increment * 4,
                valueConfig: { formatTextValue: () => "\uE522" },
              },
              {
                value: _tickStart + increment * 5,
                valueConfig: { formatTextValue: () => "\uE52F" },
              },
              { value: _lastTick, valueConfig: { formatTextValue: () => "" } },
            ].map((x) => ({
              ...x,
              valueConfig: {
                ...x.valueConfig,
                style: { ..._tickLabelBase, ..._musicFontStyle },
              },
            })),
          },
        }}
        arc={{
          colorArray: ["#5BE12C", "#EA4228"],
          subArcs: [
            { length: 0.166 },
            { length: 0.166 },
            { length: 0.166 },
            { length: 0.166 },
            { length: 0.166 },
            { length: 0.166 },
          ],
          padding: 0.02,
          width: 0.3,
        }}
        pointer={{
          elastic: true,
          animationDelay: 100,
        }}
      />
    </div>
  );
}
