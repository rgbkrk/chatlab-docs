import React from "react";
import CodeBlock from "@theme-original/CodeBlock";

import { InputBlock } from "@site/src/components/cell";

export default function CodeBlockWrapper(props) {
  if (props.mediaType == "text/plain") {
    return <pre>{props.children}</pre>;
  }

  if (!props.cell) {
    return <CodeBlock {...props} />;
  }

  return (
    <InputBlock count={props.executionCount}>
      <CodeBlock {...props} />
    </InputBlock>
  );
}
