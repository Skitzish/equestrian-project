import { 
    ConformationGenetics, 
    ShoulderSlopeGene, 
    ShoulderAngleGene,
    HumerusLengthGene,
    FemurLengthAllele,
    TibiaLengthAllele,
    WitherHeightGene,
    NeckLengthGene,
    CroupAngleGene,
    PasternAngleGene,
    ChestWidthGene
} from "../types/conformation-genetics.types";

export function breedConformationGenetics(
    sire: ConformationGenetics,
    dam: ConformationGenetics
): ConformationGenetics {
    return{
        shoulderSlope: inheritMultiAllelicGene(sire.shoulderSlope, dam.shoulderSlope) as ShoulderSlopeGene,
        shoulderAngle: inheritMultiAllelicGene(sire.shoulderAngle, dam.shoulderAngle) as ShoulderAngleGene,
        humerusLength: inheritMultiAllelicGene(sire.humerusLength, dam.humerusLength) as HumerusLengthGene,
        femurLength: inheritSimpleGene(sire.femurLength, dam.femurLength) as [FemurLengthAllele, FemurLengthAllele],
        tibiaLength: inheritSimpleGene(sire.tibiaLength, dam.tibiaLength) as [TibiaLengthAllele, TibiaLengthAllele],
        witherHeight: inheritMultiAllelicGene(sire.witherHeight, dam.witherHeight) as WitherHeightGene,
        neckLength: inheritMultiAllelicGene(sire.neckLength, dam.neckLength) as NeckLengthGene,
        croupAngle: inheritMultiAllelicGene(sire.croupAngle, dam.croupAngle) as CroupAngleGene,
        pasternAngle: inheritMultiAllelicGene(sire.pasternAngle, dam.pasternAngle) as PasternAngleGene,
        chestWidth: inheritMultiAllelicGene(sire.chestWidth, dam.chestWidth) as ChestWidthGene
    };
}

function inheritSimpleGene<T>(sireGene: [T,T], damGene: [T,T]): [T, T] {
    const fromSire = randomAllele(sireGene);
    const fromDam = randomAllele(damGene);
    return [fromSire, fromDam];
}

function randomAllele<T>(gene: [T, T]): T{
    return Math.random() < 0.5 ? gene[0] : gene[1];
}

function inheritMultiAllelicGene<T>(sireAlleles: T[], damAlleles: T[]): T[] {
    const halfFromSire = randomHalf(sireAlleles);
    const halfFromDam = randomHalf(damAlleles);
    return [...halfFromSire, ...halfFromDam];
}

function randomHalf<T>(alleles: T[]): T[] {
    const numToSelect = Math.floor(alleles.length /2);
    const shuffled = [...alleles].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numToSelect);
}