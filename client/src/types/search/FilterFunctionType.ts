import type { VestDto } from "../../models/vesti/VestDto";

export type FilterFunctionType = (vesti: VestDto[]) => VestDto[];