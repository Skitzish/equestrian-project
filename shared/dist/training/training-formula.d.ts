/**
 * Training Formula
 * Implementation of the complete training formula
 */
import { Horse } from '../types/horse.types';
import { Trainer, SessionDuration, TrainingResult } from '../types/training.types';
/**
 * Apply training session to a horse
 *
 * Formula: SV = FM * (((BTV - PTM) * TSM) * (((Tr + PV) * MM) + BM))
 */
export declare function applyTraining(horse: Horse, skillId: string, duration: SessionDuration, trainer: Trainer): TrainingResult;
