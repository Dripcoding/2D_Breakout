// game modes
import {IMode} from "./modules/mode";

export enum GAME_MODES {
	VERY_EASY = 'Very Easy',
	EASY = 'Easy',
	MEDIUM = 'Medium',
	HARD = 'Hard',
	VERY_HARD = 'Very Hard',
	MARATHON = 'Marathon'
}

export const modes: {[index: string]: IMode} = {
	[GAME_MODES.VERY_EASY]: {
		dx: 1.5,
		dy: -1.5,
		lives: 5,
		maxDx: 2,
		maxDy: -2,
		name: 'veryEasy',
	},
	[GAME_MODES.EASY]: {
		dx: 2,
		dy: -2,
		lives: 5,
		maxDx: 2.5,
		maxDy: -2.5,
		name: 'easy',
	},
	[GAME_MODES.MEDIUM]: {
		dx: 2.5,
		dy: -2.5,
		lives: 4,
		maxDx: 3,
		maxDy: -3,
		name: 'medium',
	},
	[GAME_MODES.HARD]: {
		dx: 3,
		dy: -3,
		lives: 3,
		maxDx: 3.5,
		maxDy: -3.5,
		name: 'hard',
	},
	[GAME_MODES.VERY_HARD]: {
		dx: 3.5,
		dy: -3.5,
		lives: 4,
		maxDx: 4,
		maxDy: -4,
		name: 'veryHard',
	},
	[GAME_MODES.MARATHON]: {
		dx: 1,
		dy: -1,
		lives: 10,
		maxDx: 3,
		maxDy: -3,
		name: 'marathon',
	}
}

// modals
export const aboutModalLink = document.querySelector<HTMLAnchorElement>(
	'#aboutModalLink'
)
export const controlsModalLink = document.querySelector<HTMLAnchorElement>(
	'#controlsModalLink'
)
export const gameModeSelect = document.querySelector<HTMLSelectElement>(
	'#gameModeSelect'
)
export const settingsModalLink = document.querySelector<HTMLAnchorElement>(
	'#settingsModalLink'
)
export const gameEndModalTitle = document.querySelector<HTMLDivElement>(
	'#gameEndModalTitle'
)
export const gameEndModalBody = document.querySelector<HTMLDivElement>(
	'#gameEndModalBody'
)

// tool bar controls
export const playBtn = document.querySelector<HTMLButtonElement>('#playBtn')
export const pauseBtn = document.querySelector<HTMLButtonElement>('#pauseBtn')
export const resetBtn = document.querySelector<HTMLButtonElement>('#resetBtn')

export interface ITheme {
	navBarStyle: string
	navBarLinkStyle?: string
	modalHeaderStyle: string
	modalBodyStyle: string
	bodyStyle: string
	buttonStyle: string
	tableHeaderStyle: string
}

// themes
const pastelDefault: ITheme = {
	navBarStyle: 'background-color: #1976d2 !important',
	navBarLinkStyle: 'color: #eee',
	modalHeaderStyle: 'background-color: #dc004e !important',
	modalBodyStyle: 'background-color: #272c34',
	bodyStyle: 'background-color: #272c34',
	buttonStyle:
		'background-color: #dc004e !important; border-color: #dc004e !important',
	tableHeaderStyle: 'background-color: #dc004e',
}

const pastelOne: ITheme = {
	navBarStyle: 'background-color: #2a9d8fff !important',
	modalHeaderStyle: 'background-color: #e76f51ff !important',
	modalBodyStyle: 'background-color: #264653ff',
	bodyStyle: 'background-color: #264653ff',
	buttonStyle:
		'background-color: #e76f51ff !important; border-color: #e76f51ff !important',
	tableHeaderStyle: 'background-color: #e76f51ff',
}

const pastelTwo: ITheme = {
	navBarStyle: 'background-color: #a8dadcff !important',
	navBarLinkStyle: 'color: #000 !important',
	modalHeaderStyle: 'background-color: #e63946ff !important',
	modalBodyStyle: 'background-color: #1d3557ff',
	bodyStyle: 'background-color: #1d3557ff',
	buttonStyle:
		'background-color: #e63946ff !important; border-color: #e63946ff !important',
	tableHeaderStyle: 'background-color: #e63946ff',
}

const pastelThree: ITheme = {
	navBarStyle: 'background-color: #fcbf49ff !important',
	navBarLinkStyle: 'color: #000 !important',
	modalHeaderStyle: 'background-color: #d62828ff !important',
	modalBodyStyle: 'background-color: #003049ff',
	bodyStyle: 'background-color: #003049ff',
	buttonStyle:
		'background-color: #d62828ff !important; border-color: #d62828ff',
	tableHeaderStyle: 'background-color: #d62828ff',
}

export interface IPastelDict {
	pastelOneRadio: ITheme
	pastelTwoRadio: ITheme
	pastelThreeRadio: ITheme
	pastelDefaultRadio: ITheme
}

export const pastelDict: IPastelDict = {
	pastelOneRadio: pastelOne,
	pastelTwoRadio: pastelTwo,
	pastelThreeRadio: pastelThree,
	pastelDefaultRadio: pastelDefault,
}

// theme inputs
export const pastelOneRadio = document.querySelector<HTMLInputElement>(
	'#pastelOneRadio'
)
export const pastelTwoRadio = document.querySelector<HTMLInputElement>(
	'#pastelTwoRadio'
)
export const pastelThreeRadio = document.querySelector<HTMLInputElement>(
	'#pastelThreeRadio'
)
export const pastelDefaultRadio = document.querySelector<HTMLInputElement>(
	'#pastelDefaultRadio'
)

// ball color select
export const ballColorSelect = document.querySelector<HTMLSelectElement>(
	'#ballColorSelect'
)
