import { storiesOf } from "@storybook/react";
import { Spinner, Skeleton } from ".";

storiesOf("Loading", module).add("Spinner", () => {
  return <Spinner />;
});

storiesOf("Loading", module).add("Skeleton", () => {
  return <Skeleton />;
});
