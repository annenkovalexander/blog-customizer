import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import { ArticleOptionsIndexType } from '../article-params-form/types';
import clsx from 'clsx';
import { useState, CSSProperties, FormEventHandler, FormEvent } from 'react';
import { ArticleCustomSettingsType } from '../article/types';

import * as options from 'src/constants/articleProps';
import styles from '../../styles/index.module.scss';


const App = () => {
	const initialState: ArticleOptionsIndexType = {
		fontSizeOptionsIndex: 0,
		fontFamilyOptionsIndex: 0,
		fontColorOptionsIndex: 0,
		backgroundColorOptionsIndex: 0,
		contentWidthOptionsIndex: 0,
	};

	const [articleCustomSettings, changeArticleCustomSettings] =
		useState<ArticleCustomSettingsType['articleCustomSettings']>(
			defaultArticleState
		);

	const submitHandler =
		(submitedValues: ArticleOptionsIndexType) => (event: FormEvent) => {
			event.preventDefault();
			const settingsObject: ArticleCustomSettingsType['articleCustomSettings'] =
				{
					fontFamilyOption:
						options.fontFamilyOptions[submitedValues.fontFamilyOptionsIndex],
					fontSizeOption:
						options.fontSizeOptions[submitedValues.fontSizeOptionsIndex],
					fontColor: options.fontColors[submitedValues.fontColorOptionsIndex],
					backgroundColor:
						options.backgroundColors[
							submitedValues.backgroundColorOptionsIndex
						],
					contentWidth:
						options.contentWidthArr[submitedValues.contentWidthOptionsIndex],
				};
			changeArticleCustomSettings(settingsObject);
		};

	const resetHandler = () => {
		changeArticleCustomSettings(defaultArticleState);
	};


	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleCustomSettings.fontFamilyOption.title,
					'--font-size': articleCustomSettings.fontSizeOption.value,
					'--font-color': articleCustomSettings.fontColor.value,
					'--container-width': articleCustomSettings.contentWidth.value,
					'--bg-color': articleCustomSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialState={initialState}
				submitHandler={submitHandler}
				resetHandler={resetHandler}
			/>
			<Article />
		</main>
	);
};

export default App;