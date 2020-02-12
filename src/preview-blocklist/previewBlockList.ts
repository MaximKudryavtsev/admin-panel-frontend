import { EBlockTypes } from "../entities";
import { ReactHTML } from "react";
import { get } from "lodash";
import { Description } from "./description";
import { FactBlock } from "./facts-block";
import { PreviewQuoteBlock } from "./quote";
import { PreviewBlueLineList } from "./preview-blue-line-list";
import { PreviewBlog } from "./preview-blog";

const blockList = {
    [EBlockTypes.DESCRIPTION]: Description,
    [EBlockTypes.FACTS]: FactBlock,
    [EBlockTypes.QUOTE]: PreviewQuoteBlock,
    [EBlockTypes.BLUE_LINES_LIST]: PreviewBlueLineList,
    [EBlockTypes.BLOG]: PreviewBlog,
    "default": undefined
};

export function getPreviewBlock(name: string): keyof ReactHTML {
    return get(blockList, name) || get(blockList, "default");
}
