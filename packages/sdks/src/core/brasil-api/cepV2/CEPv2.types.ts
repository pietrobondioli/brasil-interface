/**
 * Coordinates
 * @example {
 *   "longitude": "-49.0629788",
 *   "latitude": "-26.9244749"
 * }
 */
export type Coordinates = {
	longitude: string;
	latitude: string;
};

/**
 * Location
 * @example {
 *   "type": "Point",
 *   "coordinates": {
 *     "longitude": "-49.0629788",
 *     "latitude": "-26.9244749"
 *   }
 * }
 */
export type Location = {
	type: string;
	coordinates: unknown;
};

/**
 * Address
 * @example {
 *   "cep": "89010025",
 *   "state": "SC",
 *   "city": "Blumenau",
 *   "neighborhood": "Centro",
 *   "street": "Rua Doutor Luiz de Freitas Melro",
 *   "service": "viacep",
 *   "location": {
 *     "type": "Point",
 *     "coordinates": {
 *       "longitude": "-49.0629788",
 *       "latitude": "-26.9244749"
 *     }
 *   }
 * }
 */
export type AddressV2 = {
	cep: string;
	state: string;
	city: string;
	neighborhood: string;
	street: string;
	service: string;
	location: unknown;
};

/**
 * CepError.
 * @example {
 *   "name": "CepPromiseError",
 *   "message": "Todos os serviços de CEP retornaram erro.",
 *   "type": "service_error",
 *   "errors": [
 *     {
 *       "name": "ServiceError",
 *       "message": "CEP INVÁLIDO",
 *       "service": "correios"
 *     },
 *     {
 *       "name": "ServiceError",
 *       "message": "CEP não encontrado na base do ViaCEP.",
 *       "service": "viacep"
 *     }
 *   ]
 * }
 */
export type CepError = {
	name: string;
	message: string;
	type: string;
	errors: Error[];
};

/**
 * Error
 * @example {
 *   "name": "ServiceError",
 *   "message": "CEP INVÁLIDO",
 *   "service": "correios"
 * }
 */
export type Error = {
	name: string;
	message: string;
	service: string;
};
