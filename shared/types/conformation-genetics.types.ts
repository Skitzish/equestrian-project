//Shoulder slope - how steep or upright the shoulder is. Controlled by eight alleles.
export type ShoulderSlopeAllele = 'i' | 'm' | 'u';
export type ShoulderSlopeGene = [ 
    ShoulderSlopeAllele, ShoulderSlopeAllele, ShoulderSlopeAllele, ShoulderSlopeAllele,
    ShoulderSlopeAllele, ShoulderSlopeAllele, ShoulderSlopeAllele, ShoulderSlopeAllele
]

//Shoulder angle - how the scapula and humerus connect. Controlled by eight alleles.
export type ShoulderAngleAllele = 'c' | 'm' | 'o';
export type ShoulderAngleGene = [
    ShoulderAngleAllele, ShoulderAngleAllele, ShoulderAngleAllele, ShoulderAngleAllele,
    ShoulderAngleAllele, ShoulderAngleAllele, ShoulderAngleAllele, ShoulderAngleAllele
]

//Humerus length (in comparison to scapula). Controlled by six alleles.
export type HumerusLengthAllele = 's' | 'm' | 'l';
export type HumerusLengthGene = [
    HumerusLengthAllele, HumerusLengthAllele, HumerusLengthAllele,
    HumerusLengthAllele, HumerusLengthAllele, HumerusLengthAllele
]

//Femur length. Controlled by two alleles.
export type FemurLengthAllele = 's' | 'm' | 'l';
export type FemurLengthGene = [FemurLengthAllele, FemurLengthAllele]

//Tibia length. Controlled by two alleles.
export type TibiaLengthAllele = 's' | 'm' | 'l';
export type TibiaLengthGene = [TibiaLengthAllele, TibiaLengthAllele]

//Wither height. Controlled by four alleles.
export type WitherHeightAllele = 'l' | 'm' | 'h';
export type WitherHeightGene = [
    WitherHeightAllele, WitherHeightAllele,
    WitherHeightAllele, WitherHeightAllele
]

//Neck length. Controlled by four alleles.
export type NeckLengthAllele = 's' | 'm' | 'l';
export type NeckLengthGene = [
    NeckLengthAllele, NeckLengthAllele,
    NeckLengthAllele, NeckLengthAllele
]

//Croup angle. The angle of the pelvis. Controlled by eight alleles.
export type CroupAngleAllele = 'f' | 'm' | 's';
export type CroupAngleGene = [
    CroupAngleAllele, CroupAngleAllele, CroupAngleAllele, CroupAngleAllele,
    CroupAngleAllele, CroupAngleAllele, CroupAngleAllele, CroupAngleAllele
]

//Pastern angle. Relative to the ground. Controlled by eight alleles.
export type PasternAngleAllele = 'i' | 'm' | 'u';
export type PasternAngleGene = [
    PasternAngleAllele, PasternAngleAllele, PasternAngleAllele, PasternAngleAllele,
    PasternAngleAllele, PasternAngleAllele, PasternAngleAllele, PasternAngleAllele
]

//Chest width. How far apart the front legs are. Controlled by four alleles.
export type ChestWidthAllele = 'n' | 'm' | 'w';
export type ChestWidthGene = [
    ChestWidthAllele, ChestWidthAllele,
    ChestWidthAllele, ChestWidthAllele
]

export interface ConformationGenetics {
    shoulderSlope: [
        ShoulderSlopeAllele, //allele 1
        ShoulderSlopeAllele, //allele 2
        ShoulderSlopeAllele, //allele 3
        ShoulderSlopeAllele, //allele 4
        ShoulderSlopeAllele, //allele 5
        ShoulderSlopeAllele, //allele 6
        ShoulderSlopeAllele, //allele 7
        ShoulderSlopeAllele  //allele 8
    ];
    shoulderAngle: [
        ShoulderAngleAllele, //allele 1
        ShoulderAngleAllele, //allele 2
        ShoulderAngleAllele, //allele 3
        ShoulderAngleAllele, //allele 4
        ShoulderAngleAllele, //allele 5
        ShoulderAngleAllele, //allele 6
        ShoulderAngleAllele, //allele 7
        ShoulderAngleAllele  //allele 8
    ];
    humerusLength: [
        HumerusLengthAllele, //allele 1
        HumerusLengthAllele, //allele 2
        HumerusLengthAllele, //allele 3
        HumerusLengthAllele, //allele 4
        HumerusLengthAllele, //allele 5
        HumerusLengthAllele  //allele 6
    ];
    femurLength: [
        FemurLengthAllele, //allele 1
        FemurLengthAllele  //allele 2
    ];
    tibiaLength: [
        TibiaLengthAllele, //allele 1
        TibiaLengthAllele  //allele 2
    ];
    witherHeight: [
        WitherHeightAllele, //allele 1
        WitherHeightAllele, //allele 2
        WitherHeightAllele, //allele 3
        WitherHeightAllele  //allele 4
    ];
    neckLength: [
        NeckLengthAllele, //allele 1
        NeckLengthAllele, //allele 2
        NeckLengthAllele, //allele 3
        NeckLengthAllele  //allele 4
    ];
    croupAngle: [
        CroupAngleAllele, //allele 1
        CroupAngleAllele, //allele 2
        CroupAngleAllele, //allele 3
        CroupAngleAllele, //allele 4
        CroupAngleAllele, //allele 5
        CroupAngleAllele, //allele 6
        CroupAngleAllele, //allele 7
        CroupAngleAllele  //allele 8
    ];
    pasternAngle: [
        PasternAngleAllele, //allele 1
        PasternAngleAllele, //allele 2
        PasternAngleAllele, //allele 3
        PasternAngleAllele, //allele 4
        PasternAngleAllele, //allele 5
        PasternAngleAllele, //allele 6
        PasternAngleAllele, //allele 7
        PasternAngleAllele  //allele 8
    ];
    chestWidth: [
        ChestWidthAllele, //allele 1
        ChestWidthAllele, //allele 2
        ChestWidthAllele, //allele 3
        ChestWidthAllele  //allele 4
    ]
}