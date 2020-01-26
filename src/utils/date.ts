import moment from "moment";

export function formatData(date: Date | string, format: string) {
    return moment(date).format(format)
}
