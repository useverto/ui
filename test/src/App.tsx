import {
  VertoProvider,
  Button,
  Loading,
  Input,
  useInput,
  Select
} from "@verto/ui";
import { useEffect } from "react";
import { useState } from "react";
import "./styles.sass";

export default function App() {
  const [theme, setTheme] = useState<"Light" | "Dark">("Light");

  return (
    <VertoProvider theme={theme}>
      <Button>Filled</Button>
      <Button type="outlined">Outlined</Button>
      <Button type="secondary">Secondary</Button>
      <Button disabled>Disabled</Button>
      <Button small>Small</Button>
      <Button type="outlined" small>
        Small outlined
      </Button>
      <Button loading>Outlined</Button>
      <Loading.Spinner />
      <Loading.Skeleton />
      <Input
        label="You send"
        inlineLabel="VRT"
        type="number"
        placeholder="10000"
      />
      <Input
        label="You send"
        inlineLabel="VRT"
        type="text"
        placeholder="Type here..."
        leftInlineLabel
        matchPattern={/.{5}/}
      />
      <Input label="Amount" type="number" placeholder="10000" currency="$" />
      <Select label="Choose something">
        <option value="test">Test</option>
        <option value="test2">Test 2</option>
      </Select>
      <Select label="Filled input" filled>
        <option value="test">Test</option>
        <option value="test2">Test 2</option>
      </Select>
    </VertoProvider>
  );
}
