import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { ArcticleParamsFormType } from './types';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export const ArticleParamsForm = ({isOpen, toggleIsOpen, clickOutside}: ArcticleParamsFormType) => {
	return (
		<div onClick={clickOutside}>
			<ArrowButton isOpen={isOpen} onClick={toggleIsOpen} />
			<aside className={clsx([styles.container, isOpen && styles.containerOpen])}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
