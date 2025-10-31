import React from "react";

export default function LoadingPlaceholder({ text = "Loading..." }: { text?: string }) {
  return <div className="py-8 text-center text-gray-500">{text}</div>;
}
