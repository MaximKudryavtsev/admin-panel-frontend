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

const blockList = {
    [EBlockTypes.DESCRIPTION]: Description,
    [EBlockTypes.FACTS]: FactBlock,
    [EBlockTypes.QUOTE]: PreviewQuoteBlock,
    [EBlockTypes.BLUE_LINES_LIST]: PreviewBlueLineList,
    [EBlockTypes.BLOG]: PreviewBlog,
    [EBlockTypes.CLIENTS_LOGO]: ClientsLogoPreview,
    [EBlockTypes.FEEDBACK]: PreviewFeedbackBlock,
    "default": undefined
};

export function getPreviewBlock(name: string): keyof ReactHTML {
    return get(blockList, name) || get(blockList, "default");
}
