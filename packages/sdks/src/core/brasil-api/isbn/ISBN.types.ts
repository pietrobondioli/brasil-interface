/**
 * Dimensions
 * @example {
 *   "width": 17.5,
 *   "height": 25.7,
 *   "unit": "CENTIMETER"
 * }
 */
export type Dimensions = {
	width: number;
	height: number;

	/** @enum {string} */
	unit: "CENTIMETER" | "INCH";
};

/**
 * Price
 * @example {
 *   "currency": "BRL",
 *   "amount": 104
 * }
 */
export type Price = {
	/** @description Código ISO 4217 */
	currency: string;
	amount: number;
};

/**
 * ISBN Info
 * @example {
 *   "isbn": "9788545702870",
 *   "title": "Akira",
 *   "subtitle": null,
 *   "authors": [
 *     "KATSUHIRO OTOMO",
 *     "DRIK SADA",
 *     "CASSIUS MEDAUAR",
 *     "MARCELO DEL GRECO",
 *     "DENIS TAKATA"
 *   ],
 *   "publisher": "Japorama Editora e Comunicação",
 *   "synopsis": "Um dos marcos da ficção científica oriental que revolucionou a chegada dos mangás e da cultura pop japonesa no Ocidente retorna em uma nova edição especial. Após atropelar uma criança de aparência estranha, Tetsuo Shima (o melhor amigo de Kaneda), começa a sentir algumas reações anormais. Isso acaba chamando a atenção do governo que está projetando diversas experiências secretas e acabam sequestrando Tetsuo. Nesta aventura cheia de ficção, Kaneda entra em cena para salvar o amigo, enquanto uma terrível e monstruosa entidade ameaça despertar.",
 *   "dimensions": {
 *     "width": 17.5,
 *     "height": 25.7,
 *     "unit": "CENTIMETER"
 *   },
 *   "year": 2017,
 *   "format": "PHYSICAL",
 *   "page_count": 364,
 *   "subjects": [
 *     "Cartoons; caricaturas e quadrinhos",
 *     "mangá",
 *     "motocicleta",
 *     "gangue",
 *     "Delinquência"
 *   ],
 *   "location": "SÃO PAULO, SP",
 *   "retail_price": null,
 *   "cover_url": null,
 *   "provider": "cbl"
 * }
 */
export type ISBNInfo = {
	isbn: string;
	title: string;
	subtitle?: string;
	authors?: string[];
	publisher?: string;
	synopsis?: string;
	dimensions?: Dimensions;
	year?: number;

	/** @enum {string} */
	format?: "PHYSICAL" | "DIGITAL";
	page_count?: number;
	subjects?: string[];
	location?: string;
	retail_price?: Price;

	/** Format: uri */
	cover_url?: string;

	/** @enum {string} */
	provider: "cbl" | "mercado-editorial" | "open-library" | "google-books";
};
