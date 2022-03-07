import { ComponentMeta, ComponentStory } from "@storybook/react";
import { m } from "framer-motion";
import Card from "./index";

const storyConfig = {
  title: "Card",
  component: Card
} as ComponentMeta<typeof Card>;

/**
 * Default Card story
 */

const DefaultTemplate = (args) => (
  <Card {...args}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, nostrum
    ad non nisi reprehenderit dolorem quae ex aspernatur fuga repellendus
    asperiores totam sapiente excepturi, repudiandae incidunt quis explicabo,
    officiis tempora.
  </Card>
);

export const DefaultCard: ComponentStory<typeof Card> = DefaultTemplate.bind(
  {}
);

/**
 * ArtActivity Card story
 */

const ArtActivityTemplate = (args) => <Card.ArtActivity {...args} />;

export const ArtActivity: ComponentStory<typeof Card.ArtActivity> =
  ArtActivityTemplate.bind({});

ArtActivity.args = {
  type: "buy",
  user: {
    name: "John Doe",
    usertag: "johndoe",
    avatar: undefined,
    displaytag: undefined
  },
  timestamp: new Date(),
  price: {
    ar: 1,
    usd: 45.5
  },
  orderID: "51wzIpR0dN5chkVuiMyeBRqvlrORhUNxDuETOIx2VKk"
};

ArtActivity.argTypes = {
  timestamp: {
    control: {
      type: "date"
    }
  },
  type: {
    options: ["buy", "sell", "list"],
    control: {
      type: "radio"
    }
  }
};

/**
 * Asset Card story
 */

const AssetTemplate = (args) => <Card.Asset {...args} />;

export const ArtAsset: ComponentStory<typeof Card.Asset> = AssetTemplate.bind(
  {}
);

ArtAsset.args = {
  name: "Asset name",
  price: 12.23,
  // Credit: https://www.verto.exchange/space/deXX5M_oTr02soT217ZYH1WjotUadFbAb48JddyYmf4
  // Articulate.eth
  image:
    "https://oxs5pzgp5bhl2nvsqt3npnsyd5k2hiwvdj2fnqdpr4exlxeyth7a.arweave.net/deXX5M_oTr02soT217ZYH1WjotUadFbAb48JddyYmf4",
  userData: {
    name: "John Doe",
    usertag: "johndoe",
    avatar: undefined,
    displaytag: undefined
  },
  reverse: false
};

const ClearAssetTemplate = (args) => <Card.AssetClear {...args} />;

export const ClearAsset: ComponentStory<typeof Card.AssetClear> =
  ClearAssetTemplate.bind({});

ClearAsset.args = ArtAsset.args;

export const TokenAsset: ComponentStory<typeof Card.Asset> = AssetTemplate.bind(
  {}
);

TokenAsset.args = {
  name: "ArDrive",
  ticker: "ARDRIVE",
  price: 12.23,
  image:
    "https://wtpc7bpgogwaei5ie7n3g4ydovsnpa6gx7t3evbxfivahc5qv5mq.arweave.net/tN4vheZxrAIjqCfbs3MDdWTXg8a_57JUNyoqA4uwr1k",
  reverse: false
};

/**
 * Balance Card story
 */

const BalanceTemplate = (args) => <Card.Balance {...args} />;

export const Balance: ComponentStory<typeof Card.Balance> =
  BalanceTemplate.bind({});

Balance.args = {
  logo: {
    light:
      "https://wtpc7bpgogwaei5ie7n3g4ydovsnpa6gx7t3evbxfivahc5qv5mq.arweave.net/tN4vheZxrAIjqCfbs3MDdWTXg8a_57JUNyoqA4uwr1k",
    dark: undefined
  },
  name: "ArDrive",
  ticker: "ARDRIVE",
  balance: 20033233,
  id: "-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ"
};

/**
 * Bits Card story
 */

const BitsTemplate = (args) => <Card.Bits {...args} />;

export const Bits: ComponentStory<typeof Card.Bits> = BitsTemplate.bind({});

Bits.args = {
  quantity: 20,
  price: {
    usd: 10.23,
    ticker: "VRT",
    qty: 20
  }
};

/**
 * Collection Card story
 */

const CollectionTemplate = (args) => <Card.Collection {...args} />;

export const Collection: ComponentStory<typeof Card.Collection> =
  CollectionTemplate.bind({});

// Credits: https://www.verto.exchange/space/GirFtyB_PI4oQXhEFrHZLpFUqincHrDdDxPaQ1M8r00
// Articulate.eth
Collection.args = {
  name: "Paperbark",
  images: [
    "https://arweave.net/Cu0FeGOQXmVFOfP4Fbpqdvy2dccDKlxi42ZFbGdCheA",
    "https://arweave.net/jKPlhtYF-by5eLJkNjTn97gVCLW_MAuDqxaypn2f6Lo",
    "https://arweave.net/D2o7h18f0GdfsSmpahb-TLbc1xhutrimwH7In0g5lmA"
  ],
  userData: {
    name: "John Doe",
    usertag: "johndoe",
    avatar: undefined,
    displaytag: undefined
  }
};

/**
 * Trade Card story
 */

const TradeTemplate = (args) => <Card.Trade {...args} />;

export const Trade: ComponentStory<typeof Card.Trade> = TradeTemplate.bind({});

Trade.args = {
  orderID: "-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ",
  from: {
    amount: 1000,
    ticker: "VRT"
  },
  to: "ARDRIVE",
  timestamp: new Date(),
  status: "success"
};

Trade.argTypes = {
  timestamp: {
    control: {
      type: "date"
    }
  },
  status: {
    options: ["success", "pending", "error"],
    control: {
      type: "radio"
    }
  }
};

export default storyConfig;
