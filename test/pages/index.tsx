import {
  Button,
  Loading,
  Input,
  Select,
  Tooltip,
  Card,
  Spacer,
  Page,
  Avatar,
  useToasts,
  Modal,
  useModal,
  Popover,
  useTheme
} from "@verto/ui";

export default function Home() {
  const { setToast } = useToasts();
  const exampleModal = useModal();
  const theme = useTheme();

  return (
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
          usertag: "martonlederer",
          name: "Marton Lederer"
        }}
        timestamp={new Date()}
        price={{ usd: 1204.768548, ar: 300.43256424 }}
        orderID="WE5dJ4BenAiBbjs8zs8EWAsOo33gjwadsfa7ntxVLVc"
      />
      <Spacer y={1} />
      <Card.SwapSell
        user={{
          avatar: "https://th8ta.org/marton.jpeg",
          usertag: "martonlederer",
          name: "Marton Lederer"
        }}
        selling={{ quantity: 20000, ticker: "VRT" }}
        rate={1.3}
        filled={300}
        orderID="WE5dJ4BenAiBbjs8zs8EWAsOo33gjwadsfa7ntxVLVc"
      />
      <Spacer y={1} />
      <Card.Trade
        type="sell"
        from={{
          amount: 20000,
          ticker: "VRT"
        }}
        to="AR"
        timestamp={new Date()}
        status="success"
        orderID="test"
        cancel={() => {}}
      />
      <Spacer y={1} />
      <Card.Balance
        logo={{ light: "https://verto.exchange/logo_light.svg" }}
        name="Verto"
        ticker="VRT"
        balance={173089}
        id="usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A"
      />
      <Spacer y={1} />
      <Card.OrderStep
        title="PST Transfer - 1 ARDRIVE"
        id="b_CM3puemQhU_-afQvELADUGzDDIOcUATb21VeO0spo"
        matchID="kVNUPg0_sMFkTK_Mb-nIsjeDpGymPjBn8VHrP1MChT8"
        link=""
      />
      <Spacer y={1} />
      <Card.TradingPost
        status="online"
        address="dxGmt44SZenqmHa-_IEl8AmuejgITs4pB3oe-xUR36A"
        balance={12.9534432}
        vrtStake={843050}
      />
      <Spacer y={1} />
      <div className="flex-container">
        <Card.Bits
          quantity={23}
          priceAr={12.65}
          priceUSD={92.22}
          style={{ width: "45%" }}
        />
        <Card.Bits
          quantity={23}
          priceAr={12.65}
          priceUSD={92.22}
          style={{ width: "45%" }}
        />
      </div>
      <Spacer y={1} />
      <Card.Collection
        name="ArConf"
        images={[
          "https://arweave.net/pMdQXi8saSApwMG2KoT8SDeGDVkNi8N65MLFY0MyOK8",
          "/art.png",
          "https://s4azauhk5umrkvprhkuknbxg2f5j2whgrv7euch6d7mrsgxlfosq.arweave.net/lwGQUOrtGRVV8Tqopobm0XqdWOaNfkoI_h_ZGRrrK6U"
        ]}
        userData={{
          avatar: "https://th8ta.org/marton.jpeg",
          name: "Marton Lederer",
          usertag: "martonlederer"
        }}
      />
      <Spacer y={1} />
      <div style={{ display: "flex" }}>
        <Card.Asset
          name="Test"
          userData={{
            avatar: "https://th8ta.org/marton.jpeg",
            name: "Marton Lederer",
            usertag: "martonlederer"
          }}
          price={125}
          image="/art.png"
        />
        <Spacer x={1} />
        <Card.Asset
          name="Verto"
          ticker="VRT"
          price={125}
          image="https://verto.exchange/logo_dark.svg"
        />
      </div>
      <Spacer y={1} />
      <div
        style={{
          padding: "1em",
          backgroundColor:
            theme === "Dark"
              ? "var(--lighter-background-color)"
              : "var(--foreground-color)",
          display: "flex"
        }}
      >
        <Card.Asset
          name="ArCoNFT-01 Edition 63"
          userData={{
            avatar: "https://th8ta.org/marton.jpeg",
            name: "Marton Lederer",
            usertag: "martonlederer"
          }}
          price={125}
          image="/art.png"
          reverse
        />
        <Spacer x={1} />
        <Card.Asset
          name="Verto"
          ticker="VRT"
          price={125}
          image="https://verto.exchange/logo_light.svg"
          reverse
        />
      </div>
      <Spacer y={1} />
      <Card.AssetClear image="/art.png" />
      <Spacer y={1} />
      <Avatar
        avatar="https://th8ta.org/marton.jpeg"
        usertag="martonlederer"
        name="Marton Lederer"
        notification
        href=""
      />
      <Spacer y={1} />
      <Avatar
        avatar="https://th8ta.org/marton.jpeg"
        usertag="martonlederer"
        name="Marton Lederer"
        notification
        href=""
        left
      />
      <Spacer y={1} />
      <Avatar
        avatar="https://th8ta.org/marton.jpeg"
        usertag="martonlederer"
        name="Marton Lederer"
        size="large"
      />
      <Spacer y={1} />
      <Avatar
        avatar="https://th8ta.org/marton.jpeg"
        usertag="martonlederer"
        name="Marton Lederer"
        size="large-inline"
      />
      <Spacer y={1} />
      <Button
        onClick={() =>
          setToast({
            title: "Test title",
            description: "This is a test text",
            duration: 5000
          })
        }
      >
        Show toast
      </Button>
      <Spacer y={1} />
      <Button onClick={() => exampleModal.setState(true)}>Show modal</Button>
      <Modal {...exampleModal.bindings}>
        <Modal.Title>List new token</Modal.Title>
        <Input
          label="You send"
          inlineLabel="VRT"
          type="text"
          placeholder="Type here..."
          leftInlineLabel
          matchPattern={/.{5}/}
          style={{ width: "100%" }}
        />
        <Spacer y={1.8} />
        <p
          style={{
            textAlign: "justify",
            color: "var(--light-text)",
            margin: 0,
            fontSize: "1.1em",
            fontWeight: 500
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          nihil, incidunt eos sunt, ad accusamus rem quam vero neque obcaecati
          consequatur. Recusandae eaque tempore non placeat repellendus quaerat
          excepturi quidem!
        </p>
        <Spacer y={1.8} />
        <Button
          small
          onClick={() => exampleModal.setState(false)}
          style={{ margin: "0 auto" }}
        >
          Submit
        </Button>
      </Modal>
      <Popover
        content={
          <>
            <h1>test</h1> <img src="/art.png" width={120} />
          </>
        }
        closeOnClick
      >
        <p>Popover</p>
      </Popover>
      <Spacer y={1} />
      <Popover
        content={
          <>
            <h1>test</h1> <img src="/art.png" width={120} />
          </>
        }
        mode="hover"
      >
        <p>Popover (on hover)</p>
      </Popover>
    </Page>
  );
}
