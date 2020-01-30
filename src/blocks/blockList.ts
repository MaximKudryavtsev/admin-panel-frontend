import { EBlockTypes } from "../entities";
import { FactsBlock } from "./facts";
import { get } from "lodash";
import { ReactHTML } from "react";
import { QuoteBlock } from "./quote";
import { ContactsBlock } from "./contacts";

const blockList = {
    [EBlockTypes.FACTS]: FactsBlock,
    [EBlockTypes.QUOTE]: QuoteBlock,
    [EBlockTypes.CONTACTS]: ContactsBlock,
    "default": null
};

export function getBlock(name: string): keyof ReactHTML {
    return get(blockList, name) || get(blockList, "default");
}
