"use strict";
/**
 * Equestrian Legacy - Shared Module
 * Core game logic for genetics, training, and mental state
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// ========== TYPES ==========
__exportStar(require("./types/genetics.types"), exports);
__exportStar(require("./types/mental-state.types"), exports);
__exportStar(require("./types/training.types"), exports);
__exportStar(require("./types/horse.types"), exports);
__exportStar(require("./types/visual-genetics.types"), exports);
// ========== GENETICS ==========
__exportStar(require("./genetics/breeding"), exports);
__exportStar(require("./genetics/phenotype"), exports);
// ========== VISUAL GENETICS ==========
__exportStar(require("./visual-genetics/color-calculator"), exports);
__exportStar(require("./visual-genetics/color-generator"), exports);
__exportStar(require("./visual-genetics/color-breeding"), exports);
// ========== SKILLS ==========
__exportStar(require("./skills/skill-definitions"), exports);
__exportStar(require("./skills/skill-validation"), exports);
// ========== TRAINING ==========
__exportStar(require("./training/training-formula"), exports);
__exportStar(require("./training/mood-system"), exports);
__exportStar(require("./training/satisfaction-system"), exports);
