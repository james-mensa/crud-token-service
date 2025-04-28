import { TokenType } from "@packages/utils";
import { SelectItems } from "./types";

export const tokenOptions: SelectItems[] = Object.entries(TokenType).map(([label, value]) => ({
    value,
    label,
}));