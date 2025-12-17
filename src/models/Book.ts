export interface Book {
	id: string;

	// Información básica
	title: string;
	authors?: string[];
	publishedDate?: string;
	publishedYear?: number;
	description?: string;
	categories?: string[];

	// Información técnica
	pageCount?: number;
	language?: string;
	isbn?: string;

	// URLs e imágenes
	previewLink?: string;
	infoLink?: string;
	thumbnail?: string;
	imageLinks?: {
		smallThumbnail?: string;
		thumbnail?: string;
	};

	// Otros
	publisher?: string;
	industryIdentifiers?: Array<{
		type: string;
		identifier: string;
	}>;

	// Datos de búsqueda (metadatos)
	searchRelevance?: number;
}

export interface GoogleBooksResponse {
	kind: string;
	totalItems: number;
	items?: GoogleBookItem[];
}

export interface GoogleBookItem {
	kind: string;
	id: string; // TODO: ver si aparece como volumeId en otra parte
	etag: string;
	selfLink: string;
	volumeInfo: {
		title: string;
		authors?: string[];
		publisher?: string;
		publishedDate?: string;
		description?: string;
		industryIdentifiers?: Array<{
			type: string;
			identifier: string;
		}>;
		readingModes?: {
			text: boolean;
			image: boolean;
		};
		pageCount?: number;
		printedPageCount?: number;
		dimensions?: {
			height?: string;
			width?: string;
			thickness?: string;
		};
		printType?: string;
		categories?: string[];
		maturityRating?: string;
		allowAnonLogging?: boolean;
		contentVersion?: string;
		panelizationSummary?: {
			containsEpubBubbles: boolean;
			containsImageBubbles: boolean;
		};
		imageLinks?: {
			smallThumbnail?: string;
			thumbnail?: string;
		};
		language?: string;
		previewLink?: string;
		infoLink?: string;
		canonicalVolumeLink?: string;
	};
	saleInfo?: {
		country: string;
		saleability: string;
		isEbook?: boolean;
		listPrice?: {
			amount: number;
			currencyCode: string;
		};
		retailPrice?: {
			amount: number;
			currencyCode: string;
		};
	};
	accessInfo?: {
		country: string;
		viewability: string;
		embeddable: boolean;
		publicDomain: boolean;
		textToSpeechPermission: string;
		epub?: {
			isAvailable: boolean;
			acsTokenLink?: string;
		};
		pdf?: {
			isAvailable: boolean;
			acsTokenLink?: string;
		};
		webReaderLink?: string;
	};
}

/**
 * Helper para convertir GoogleBookItem a Book
 */
export function convertGoogleBookToBook(item: GoogleBookItem): Book {
	const volumeInfo = item.volumeInfo;

	let publishedYear: number | undefined;
	if (volumeInfo.publishedDate) {
		const yearMatch = volumeInfo.publishedDate.match(/^\d{4}/);
		if (yearMatch) {
			publishedYear = parseInt(yearMatch[0], 10);
		}
	}

	return {
		id: item.id,
		title: volumeInfo.title,
		authors: volumeInfo.authors,
		publishedDate: volumeInfo.publishedDate,
		publishedYear,
		description: volumeInfo.description,
		categories: volumeInfo.categories,
		pageCount: volumeInfo.pageCount,
		language: volumeInfo.language,
		isbn: volumeInfo.industryIdentifiers?.find((id) => id.type === "ISBN_13" || id.type === "ISBN_10")?.identifier,
		previewLink: volumeInfo.previewLink,
		infoLink: volumeInfo.infoLink,
		thumbnail: volumeInfo.imageLinks?.thumbnail,
		imageLinks: volumeInfo.imageLinks,
		publisher: volumeInfo.publisher,
		industryIdentifiers: volumeInfo.industryIdentifiers,
	};
}
