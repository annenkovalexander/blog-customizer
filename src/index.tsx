import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { ArticleOptionsIndexType } from './components/article-params-form/types';
import { ArticleCustomSettingsType } from './components/article/types';
import * as options from 'src/constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

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
		(submitedValues: ArticleOptionsIndexType) => (event: SubmitEvent) => {
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
			className={clsx(styles.main)}
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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
