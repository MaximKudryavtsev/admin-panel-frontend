import { EBlockTypes } from "../entities";
import { ReactHTML } from "react";
import { get } from "lodash";
import { Description } from "./description";
import { FactBlock } from "./facts-block";
import { PreviewQuoteBlock } from "./quote";
import { PreviewBlueLineList } from "./preview-blue-line-list";
import { PreviewBlog } from "./preview-blog";
import { ClientsLogoPreview } from "./clients-logo-preview";
import { PreviewFeedbackBlock } from "./preview-feedback-block";
import { PreviewTeam } from "./preview-team";
import { PreviewMainAchievements } from "./preview-main-achievements";
import { PreviewBestAchievements } from "./preview-best-achievements";
import { PreviewAchievementBlock } from "./preview-achievement-block";
import { PreviewImageAndList } from "./preview-image-and-list";
import { PreviewAddressList } from "./preview-address-list";
import { PreviewContactList } from "./preview-contact-list";

const blockList = {
    [EBlockTypes.DESCRIPTION]: Description,
    [EBlockTypes.FACTS]: FactBlock,
    [EBlockTypes.QUOTE]: PreviewQuoteBlock,
    [EBlockTypes.BLUE_LINES_LIST]: PreviewBlueLineList,
    [EBlockTypes.BLOG]: PreviewBlog,
    [EBlockTypes.CLIENTS_LOGO]: ClientsLogoPreview,
    [EBlockTypes.FEEDBACK]: PreviewFeedbackBlock,
    [EBlockTypes.TEAM]: PreviewTeam,
    [EBlockTypes.MAIN_ACHIEVEMENTS]: PreviewMainAchievements,
    [EBlockTypes.BEST_ACHIEVEMENTS]: PreviewBestAchievements,
    [EBlockTypes.ACHIEVEMENTS]: PreviewAchievementBlock,
    [EBlockTypes.IMAGE_AND_LIST]: PreviewImageAndList,
    [EBlockTypes.ADDRESS_LIST]: PreviewAddressList,
    [EBlockTypes.CONTACT_LIST]: PreviewContactList,
    "default": undefined
};

export function getPreviewBlock(name: string): keyof ReactHTML {
    return get(blockList, name) || get(blockList, "default");
}
