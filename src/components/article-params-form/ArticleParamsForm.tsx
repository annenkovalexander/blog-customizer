import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text/Text';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { FormEvent, MouseEvent, RefObject, useEffect, useRef, useState } from 'react';
import { ArcticleParamsFormType } from './types';
import { RadioGroup } from 'src/ui/radio-group';
import * as options from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = ({
	initialState,
	submitHandler,
	resetHandler,
}: ArcticleParamsFormType) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropDownOpen, setIsDropdownOpen] = useState(false);
	const [fontSizeOptionsIndex, setFontSizeOptionsIndex] = useState(
		initialState.fontSizeOptionsIndex
	);
	const [fontFamilyOptionsIndex, setFontFamilyOptionsIndex] = useState(
		initialState.fontFamilyOptionsIndex
	);
	const [fontColorOptionsIndex, setFontColorOptionsIndex] = useState(
		initialState.fontColorOptionsIndex
	);
	const [backgroundColorOptionsIndex, setBackgroundColorOptionsIndex] =
		useState(initialState.backgroundColorOptionsIndex);
	const [contentWidthOptionsIndex, setContentWidthOptionsIndex] = useState(
		initialState.contentWidthOptionsIndex
	);
	const handleFontSizeOptionsIndexChange = (value: options.OptionType) => {
		const index = options.fontSizeOptions.findIndex(
			(item: options.OptionType) => {
				return item.title === value.title;
			}
		);
		setFontSizeOptionsIndex(index);
		setIsDropdownOpen(true);
	};
	const handleFontFamilyOptionsChange = (selected: options.OptionType) => {
		const index = options.fontFamilyOptions.findIndex(
			(item: options.OptionType) => {
				return item.title === selected.title;
			}
		);
		setFontFamilyOptionsIndex(index);
		setIsDropdownOpen(true);
	};
	const handFontColorOptionsIndexChange = (selected: options.OptionType) => {
		const index = options.fontColors.findIndex((item: options.OptionType) => {
			return item.title === selected.title;
		});
		setFontColorOptionsIndex(index);
		setIsDropdownOpen(true);
	};
	const handleBackgroundColorOptionsChange = (selected: options.OptionType) => {
		const index = options.backgroundColors.findIndex(
			(item: options.OptionType) => {
				return item.title === selected.title;
			}
		);
		setBackgroundColorOptionsIndex(index);
		setIsDropdownOpen(true);
	};
	const handleContentWidthOptionsIndex = (selected: options.OptionType) => {
		const index = options.contentWidthArr.findIndex(
			(item: options.OptionType) => {
				return item.title === selected.title;
			}
		);
		setContentWidthOptionsIndex(index);
		setIsDropdownOpen(true);
	};
	const submitHandlerWithParameters = () => {
		const updatedSettings = {
			fontSizeOptionsIndex,
			fontFamilyOptionsIndex,
			fontColorOptionsIndex,
			backgroundColorOptionsIndex,
			contentWidthOptionsIndex
		};
		return submitHandler(updatedSettings);
	}
	const toggleIsOpen = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	const resentIndexesHandler = () => {
		setFontSizeOptionsIndex(0);
		setFontFamilyOptionsIndex(0);
		setFontColorOptionsIndex(0);
		setBackgroundColorOptionsIndex(0);
		setContentWidthOptionsIndex(0);
		resetHandler();
	};
	const onModalClose = () => setIsMenuOpen(false);
	const formRef = useRef(null) as RefObject<HTMLDivElement>;
	useEffect(() => {
		if (!isMenuOpen)
			return;
		const handleEscapePress = (event: KeyboardEvent) => {
			if (event.key === 'Escape') isMenuOpen && onModalClose();
		};
		const handleOutSidePress = (event: MouseEvent) => {
			if (
				!formRef.current?.contains(event?.target as Node) &&
				isMenuOpen &&
				!isDropDownOpen
			)
				onModalClose();
			setIsDropdownOpen(false);
		};
		document.addEventListener(
			'click',
			handleOutSidePress as unknown as EventListener
		);
		document.addEventListener('keydown', handleEscapePress);
		const submitOnEnter = (event: KeyboardEvent) => {
			if (event.key === 'Enter')
				submitHandlerWithParameters()(event as unknown as FormEvent);
		}
		document.addEventListener('keydown', submitOnEnter);
		return () => {
			document.removeEventListener('keydown', handleEscapePress);
			document.removeEventListener('keydown', submitOnEnter);
			document.removeEventListener(
				'click',
				handleOutSidePress as unknown as EventListener
			);
		};
	});
	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleIsOpen} />
			<aside
				className={clsx([styles.container, isMenuOpen && styles.containerOpen])}>
				<form className={styles.form} onSubmit={submitHandlerWithParameters()}>
					<Text weight={800} size={31} align='center' uppercase>
						Задайте параметры
					</Text>
					<Select
						options={options.fontFamilyOptions}
						selected={options.fontFamilyOptions[fontFamilyOptionsIndex]}
						onChange={handleFontFamilyOptionsChange}
						title={'Шрифт'}
					/>
					<RadioGroup
						name={'Размер шрифта'}
						options={options.fontSizeOptions}
						selected={options.fontSizeOptions[fontSizeOptionsIndex]}
						onChange={handleFontSizeOptionsIndexChange}
						title={'Размер шрифта'}></RadioGroup>
					<Select
						options={options.fontColors}
						selected={options.fontColors[fontColorOptionsIndex]}
						onChange={handFontColorOptionsIndexChange}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						options={options.fontColors}
						selected={options.backgroundColors[backgroundColorOptionsIndex]}
						onChange={handleBackgroundColorOptionsChange}
						title={'Цвет фона'}
					/>
					<Select
						options={options.contentWidthArr}
						selected={options.contentWidthArr[contentWidthOptionsIndex]}
						onChange={handleContentWidthOptionsIndex}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resentIndexesHandler}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
