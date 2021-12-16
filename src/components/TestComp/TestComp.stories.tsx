import { storiesOf } from "@storybook/react";
import TestComp from "./index";

storiesOf("TestComp", module).add("With Text", () => {
  return <TestComp text="Hello World" />;
});
