import { EBlockTypes } from "../entities";
import { FactsBlock } from "./facts";
import { get } from "lodash";
import { ReactHTML } from "react";
import { QuoteBlock } from "./quote";
import { ContactsBlock } from "./contacts";
import { BlogBlock } from "./blog";
import { Description } from "./description";
import { BlueLinesList } from "./blue-lines-list";
import { FeedbackBlock } from "./feedback-block";
import { ClientsLogo } from "./clients-logo";
import { MainAchievementsBlock } from "./main-achievements-block";
import { BestAchievementBlock } from "./best-achievement-block";

const blockList = {
    [EBlockTypes.FACTS]: FactsBlock,
    [EBlockTypes.QUOTE]: QuoteBlock,
    [EBlockTypes.CONTACTS]: ContactsBlock,
    [EBlockTypes.BLOG]: BlogBlock,
    [EBlockTypes.DESCRIPTION]: Description,
    [EBlockTypes.BLUE_LINES_LIST]: BlueLinesList,
    [EBlockTypes.FEEDBACK]: FeedbackBlock,
    [EBlockTypes.CLIENTS_LOGO]: ClientsLogo,
    [EBlockTypes.MAIN_ACHIEVEMENTS]: MainAchievementsBlock,
    [EBlockTypes.BEST_ACHIEVEMENTS]: BestAchievementBlock,
    "default": undefined
};

export function getBlock(name: string): keyof ReactHTML {
    return get(blockList, name) || get(blockList, "default");
}
