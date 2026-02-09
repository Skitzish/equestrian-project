export type ShoulderSlopeAllele = 'i' | 'm' | 'u';
export type ShoulderSlopeGene = [
    ShoulderSlopeAllele,
    ShoulderSlopeAllele,
    ShoulderSlopeAllele,
    ShoulderSlopeAllele,
    ShoulderSlopeAllele,
    ShoulderSlopeAllele,
    ShoulderSlopeAllele,
    ShoulderSlopeAllele
];
export type ShoulderAngleAllele = 'c' | 'm' | 'o';
export type ShoulderAngleGene = [
    ShoulderAngleAllele,
    ShoulderAngleAllele,
    ShoulderAngleAllele,
    ShoulderAngleAllele,
    ShoulderAngleAllele,
    ShoulderAngleAllele,
    ShoulderAngleAllele,
    ShoulderAngleAllele
];
export type HumerusLengthAllele = 's' | 'm' | 'l';
export type HumerusLengthGene = [
    HumerusLengthAllele,
    HumerusLengthAllele,
    HumerusLengthAllele,
    HumerusLengthAllele,
    HumerusLengthAllele,
    HumerusLengthAllele
];
export type FemurLengthAllele = 's' | 'm' | 'l';
export type FemurLengthGene = [FemurLengthAllele, FemurLengthAllele];
export type TibiaLengthAllele = 's' | 'm' | 'l';
export type TibiaLengthGene = [TibiaLengthAllele, TibiaLengthAllele];
export type WitherHeightAllele = 'l' | 'm' | 'h';
export type WitherHeightGene = [
    WitherHeightAllele,
    WitherHeightAllele,
    WitherHeightAllele,
    WitherHeightAllele
];
export type NeckLengthAllele = 's' | 'm' | 'l';
export type NeckLengthGene = [
    NeckLengthAllele,
    NeckLengthAllele,
    NeckLengthAllele,
    NeckLengthAllele
];
export type CroupAngleAllele = 'f' | 'm' | 's';
export type CroupAngleGene = [
    CroupAngleAllele,
    CroupAngleAllele,
    CroupAngleAllele,
    CroupAngleAllele,
    CroupAngleAllele,
    CroupAngleAllele,
    CroupAngleAllele,
    CroupAngleAllele
];
export type PasternAngleAllele = 'i' | 'm' | 'u';
export type PasternAngleGene = [
    PasternAngleAllele,
    PasternAngleAllele,
    PasternAngleAllele,
    PasternAngleAllele,
    PasternAngleAllele,
    PasternAngleAllele,
    PasternAngleAllele,
    PasternAngleAllele
];
export type ChestWidthAllele = 'n' | 'm' | 'w';
export type ChestWidthGene = [
    ChestWidthAllele,
    ChestWidthAllele,
    ChestWidthAllele,
    ChestWidthAllele
];
export interface ConformationGenetics {
    shoulderSlope: [
        ShoulderSlopeAllele,
        ShoulderSlopeAllele,
        ShoulderSlopeAllele,
        ShoulderSlopeAllele,
        ShoulderSlopeAllele,
        ShoulderSlopeAllele,
        ShoulderSlopeAllele,
        ShoulderSlopeAllele
    ];
    shoulderAngle: [
        ShoulderAngleAllele,
        ShoulderAngleAllele,
        ShoulderAngleAllele,
        ShoulderAngleAllele,
        ShoulderAngleAllele,
        ShoulderAngleAllele,
        ShoulderAngleAllele,
        ShoulderAngleAllele
    ];
    humerusLength: [
        HumerusLengthAllele,
        HumerusLengthAllele,
        HumerusLengthAllele,
        HumerusLengthAllele,
        HumerusLengthAllele,
        HumerusLengthAllele
    ];
    femurLength: [
        FemurLengthAllele,
        FemurLengthAllele
    ];
    tibiaLength: [
        TibiaLengthAllele,
        TibiaLengthAllele
    ];
    witherHeight: [
        WitherHeightAllele,
        WitherHeightAllele,
        WitherHeightAllele,
        WitherHeightAllele
    ];
    neckLength: [
        NeckLengthAllele,
        NeckLengthAllele,
        NeckLengthAllele,
        NeckLengthAllele
    ];
    croupAngle: [
        CroupAngleAllele,
        CroupAngleAllele,
        CroupAngleAllele,
        CroupAngleAllele,
        CroupAngleAllele,
        CroupAngleAllele,
        CroupAngleAllele,
        CroupAngleAllele
    ];
    pasternAngle: [
        PasternAngleAllele,
        PasternAngleAllele,
        PasternAngleAllele,
        PasternAngleAllele,
        PasternAngleAllele,
        PasternAngleAllele,
        PasternAngleAllele,
        PasternAngleAllele
    ];
    chestWidth: [
        ChestWidthAllele,
        ChestWidthAllele,
        ChestWidthAllele,
        ChestWidthAllele
    ];
}
