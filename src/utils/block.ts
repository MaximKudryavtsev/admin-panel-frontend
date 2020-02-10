import { IBlock, TImageBlock } from "../entities";
import { omit, set } from "lodash";
import * as uuid from "uuid";

export function getBlockDataWithFiles<T, P>(data: Partial<IBlock<TImageBlock<T, P>>>) {
    if (data.data) {
        set(
            data,
            "data.blocks",
            data.data.blocks?.map((item) => {
                item.id = item.id ? item.id : uuid.v4();
                if (item.file) {
                    set(data, `${item.id}`, item.file);
                }
                return omit(item, ["file"]);
            }),
        );
    }
    return data;
}
