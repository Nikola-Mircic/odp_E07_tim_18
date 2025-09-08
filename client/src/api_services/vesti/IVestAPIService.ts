import type { VestDto } from "../../models/vesti/VestDto";
import type { ApiResponse } from "../../types/common/ApiResponse";

export interface IVestApiService {
	getVesti(): Promise<ApiResponse<VestDto[]>>;

  /**
   * Vraca vest sa datim ID-jem
   * @param id - id trazene vesti
   */
	getById(id: number): Promise<ApiResponse<VestDto>>;

  /**
   * Vraca vesti slicne onoj ciji je ```id``` prosledjen
   * @param id - id vesti za koju trazimo slicne
   */
	getSlicneVesti(id: number): Promise<ApiResponse<VestDto[]>>;
}