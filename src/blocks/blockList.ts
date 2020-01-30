import { EBlockTypes } from "../entities";
import { FactsBlock } from "./facts";
import { get } from "lodash";
import { ReactHTML } from "react";
import { QuoteBlock } from "./quote";
import { ContactsBlock } from "./contacts";
import { BlogBlock } from "./blog";
import { Description } from "./description";

const blockList = {
    [EBlockTypes.FACTS]: FactsBlock,
    [EBlockTypes.QUOTE]: QuoteBlock,
    [EBlockTypes.CONTACTS]: ContactsBlock,
    [EBlockTypes.BLOG]: BlogBlock,
    [EBlockTypes.DESCRIPTION]: Description,
    "default": undefined
};

export function getBlock(name: string): keyof ReactHTML {
    return get(blockList, name) || get(blockList, "default");
}
