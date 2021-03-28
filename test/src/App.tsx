import {
  VertoProvider,
  Button,
  Loading,
  Input,
  Select,
  Tooltip,
  Card,
  Spacer,
  Page
} from "@verto/ui";
import { useState } from "react";
import "./styles.sass";

export default function App() {
  const [theme, setTheme] = useState<"Light" | "Dark">("Light");

  return (
    <VertoProvider theme={theme}>
      <Page>
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
        <Select label="Small" small filled>
          <option value="test">Test</option>
          <option value="test2">Test 2</option>
        </Select>
        <Spacer y={1} />
        <Tooltip text="Test tooltip">
          <p style={{ margin: 0 }}>Hello</p>
        </Tooltip>
        <Spacer y={1} />
        <Tooltip text="Test tooltip" position="right">
          <p style={{ margin: 0 }}>Side</p>
        </Tooltip>
        <Spacer y={1} />
        <Tooltip text="Test tooltip" position="right" arrow>
          <p style={{ margin: 0 }}>With arrow</p>
        </Tooltip>
        <Card>
          <Input
            label="Address"
            placeholder="Your address"
            style={{ width: "calc(100% - 6px)" }}
          />
          <Spacer y={1} />
          <Input
            label="You send"
            inlineLabel="VRT"
            type="number"
            placeholder="10000"
            style={{ width: "calc(100% - 6px)" }}
          />
          <Spacer y={1} />
          <Button style={{ width: "100%" }}>Send</Button>
        </Card>
        <Spacer y={1} />
        <Card.Order
          type="sell"
          orderID="WE5dJ4BenAiBbjs8zs8EWAsOo33gjwadsfa7ntxVLVc"
          status="success"
          timestamp={new Date()}
        />
        <Spacer y={1} />
        <Card.ArtActivity
          type="buy"
          avatar="https://th8ta.org/marton.jpeg"
          usertag="martonlederer"
          timestamp={new Date()}
          price={{ usd: 1204.768548, ar: 300.43256424 }}
          orderID="WE5dJ4BenAiBbjs8zs8EWAsOo33gjwadsfa7ntxVLVc"
        />
      </Page>
    </VertoProvider>
  );
}
