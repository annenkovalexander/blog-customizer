import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect, useRef, MouseEventHandler, SyntheticEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	}
	const articleFormRef = useRef(null);
	const clickOutside = (event: SyntheticEvent) => {
		console.log("event", event.target);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm isOpen={isOpen} toggleIsOpen={toggleIsOpen} clickOutside={clickOutside}/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
