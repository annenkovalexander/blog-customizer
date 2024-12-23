export type ArticleOptionsIndexType = {
	fontSizeOptionsIndex: number;
	fontFamilyOptionsIndex: number;
	fontColorOptionsIndex: number;
	backgroundColorOptionsIndex: number;
	contentWidthOptionsIndex: number;
};

export type ArcticleParamsFormType = {
	submitHandler: (
		values: ArticleOptionsIndexType
	) => (event: SubmitEvent) => void;
	resetHandler: () => void;
	initialState: ArticleOptionsIndexType;
};
