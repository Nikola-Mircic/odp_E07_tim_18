import type { VestDto } from "../../models/vesti/VestDto";
import type { ApiResponse } from "../../types/common/ApiResponse";

export interface IVestApiService {
	/**
	 * Vraca vesti sortirane po vremenu, sa indeksima iz opseka [startIndex, endIndex)
	 * @param startIndex
	 * @param endIndex
	 */
	getNajnovije(
		startIndex: number,
		endIndex: number
	): Promise<ApiResponse<VestDto[]>>;

	/**
	 * Vraca vesti sortirane po broju pregleda, sa indeksima iz opseka [startIndex, endIndex)
	 * @param startIndex
	 * @param endIndex
	 */
	getNajpopularnije(
		startIndex: number,
		endIndex: number
	): Promise<ApiResponse<VestDto[]>>;

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