"use client";

import dynamic from 'next/dynamic';
import { defaultTickLabels } from 'react-gauge-component/dist/lib/GaugeComponent/types/Tick';
import { defaultValueLabel } from 'react-gauge-component/dist/lib/GaugeComponent/types/Labels';
import { useCallback, useEffect, useState } from 'react';
import { useDetectDynamics } from '../../hooks/useDetectDynamics';
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

export default function DynamicsGuage() {
  const { beginListening, dynamicStream } = useDetectDynamics();
  const [value, setValue] = useState(0);
  const [error, setError] = useState<string>();

  useEffect(() => {
    try {
      beginListening(navigator);
    } catch (err: any) {
      setError(err.toString());
    }

    const sub = dynamicStream.subscribe(
      (val) => {
        setValue(val);
      },
      (err: any) => setError(err.toString())
    );
    return () => {
      sub.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDynamic = useCallback((val: number) => {
    if (val < 12) {
      return "\uE52B";
    } else if (val < 24) {
      return "\uE520";
    } else if (val < 36) {
      return "\uE52C";
    } else if (val < 48) {
      return "\uE52D";
    } else if (val < 60) {
      return "\uE522";
    } else {
      return "\uE52F";
    }
  }, []);

  const _musicFontStyle = {
    fontFamily: "var(--font-bravura-text)",
  };
  const _valLabelBase = defaultValueLabel.style;
  const _tickLabelBase = defaultTickLabels.defaultTickValueConfig?.style;

  return !!error ? (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span className="font-medium">Error:</span>
      Unable to listen to microphone.
    </div>
  ) : (
    <GaugeComponent
      value={value}
      minValue={0}
      maxValue={72}
      type="radial"
      labels={{
        valueLabel: {
          formatTextValue: getDynamic,
          style: { ..._valLabelBase, ..._musicFontStyle },
        },
        tickLabels: {
          type: "inner",
          ticks: [
            { value: 0, valueConfig: { formatTextValue: () => "" } },
            { value: 6, valueConfig: { formatTextValue: () => "\uE52B" } },
            { value: 18, valueConfig: { formatTextValue: () => "\uE520" } },
            { value: 30, valueConfig: { formatTextValue: () => "\uE52C" } },
            { value: 42, valueConfig: { formatTextValue: () => "\uE52D" } },
            { value: 54, valueConfig: { formatTextValue: () => "\uE522" } },
            { value: 66, valueConfig: { formatTextValue: () => "\uE52F" } },
            { value: 72, valueConfig: { formatTextValue: () => "" } },
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
        animationDelay: 0,
      }}
    />
  );
}
