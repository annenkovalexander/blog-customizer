import { FormEvent, FormEventHandler } from "react";

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
	) => (event: FormEvent) => void;
	resetHandler: () => void;
	initialState: ArticleOptionsIndexType;
};
