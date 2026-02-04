import { VisualGenetics, BaseColor, DisplayColor, ColorResult } from '../types/visual-genetics.types';
export declare function calculateBaseColor(genetics: VisualGenetics): BaseColor;
export declare function getDisplayColor(genetics: VisualGenetics): DisplayColor;
export declare function formatGeneticCode(genetics: VisualGenetics): string;
export declare function calculateColor(genetics: VisualGenetics): ColorResult;
export declare function getColorName(displayColor: DisplayColor): string;
