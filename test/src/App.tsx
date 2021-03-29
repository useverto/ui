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
        <Spacer y={1} />
        <Button type="outlined">Outlined</Button>
        <Spacer y={1} />
        <Button type="secondary">Secondary</Button>
        <Spacer y={1} />
        <Button disabled>Disabled</Button>
        <Spacer y={1} />
        <Button small>Small</Button>
        <Spacer y={1} />
        <Button type="outlined" small>
          Small outlined
        </Button>
        <Spacer y={1} />
        <Button loading>Outlined</Button>
        <Spacer y={1} />
        <Loading.Spinner />
        <Spacer y={1} />
        <Loading.Skeleton />
        <Spacer y={1} />
        <Input
          label="You send"
          inlineLabel="VRT"
          type="number"
          placeholder="10000"
        />
        <Spacer y={1} />
        <Input
          label="You send"
          inlineLabel="VRT"
          type="text"
          placeholder="Type here..."
          leftInlineLabel
          matchPattern={/.{5}/}
        />
        <Spacer y={1} />
        <Input label="Amount" type="number" placeholder="10000" currency="$" />
        <Spacer y={1} />
        <Select label="Choose something">
          <option value="test">Test</option>
          <option value="test2">Test 2</option>
        </Select>
        <Spacer y={1} />
        <Select label="Filled input" filled>
          <option value="test">Test</option>
          <option value="test2">Test 2</option>
        </Select>
        <Spacer y={1} />
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
        <Spacer y={1} />
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
          user={{
            avatar: "https://th8ta.org/marton.jpeg",
            usertag: "martonlederer"
          }}
          timestamp={new Date()}
          price={{ usd: 1204.768548, ar: 300.43256424 }}
          orderID="WE5dJ4BenAiBbjs8zs8EWAsOo33gjwadsfa7ntxVLVc"
        />
        <Spacer y={1} />
        <Card.SwapSell
          user={{
            avatar: "https://th8ta.org/marton.jpeg",
            usertag: "martonlederer"
          }}
          selling={{ quantity: 20000, ticker: "VRT" }}
          rate={1.3}
          filled={300}
          orderID="WE5dJ4BenAiBbjs8zs8EWAsOo33gjwadsfa7ntxVLVc"
        />
      </Page>
    </VertoProvider>
  );
}
