import React from "react";
import CodeBlock from "@theme-original/CodeBlock";

const ExecutionCount = ({ count }) => {
  // If count is not a number, return a [ ]
  let counterText = "[ ]:";
  if (typeof count === "number" || typeof count === "string") {
    counterText = `[${count}]:`;
  }
  return (
    <div
      style={{
        fontFamily:
          'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        color: "#a7a7a7",
        letterSpacing: "normal",
        lineHeight: "1rem",
        fontSize: "1rem",
        marginTop: "1rem",
        marginRight: "1rem",
        minWidth: "3rem",
        textAlign: "right",
        whiteSpace: "nowrap",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {counterText}
    </div>
  );
};

export default function CodeBlockWrapper(props) {
  if (!props.cell) {
    return <CodeBlock {...props} />;
  }

  console.log(props);

  return (
    <div style={{ display: "flex", alignItems: "flex-start", padding: "1rem" }}>
      <ExecutionCount count={props.executionCount} />
      <div style={{ flexGrow: 0, overflow: "auto" }}>
        <CodeBlock {...props} />
      </div>
    </div>
  );
}
