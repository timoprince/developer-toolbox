import {TableRow} from "@/global";

export interface Md5Row extends TableRow {
    plaintext: string;
    ciphertext: string;
    uppercase: boolean;
    short: boolean;
}

export type Md5RowField = Pick<Md5Row, "plaintext" | "ciphertext" | "uppercase" | "short">

export function defaultMd5RowField(): Md5RowField {
    return {
        plaintext: "",
        ciphertext: "",
        uppercase: false,
        short: false
    }
}