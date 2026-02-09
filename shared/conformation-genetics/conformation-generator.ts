//imports
import { 
    ConformationGenetics,
    ShoulderSlopeGene,
    ShoulderAngleGene,
    HumerusLengthGene,
    FemurLengthGene,
    TibiaLengthGene,
    WitherHeightGene,
    NeckLengthGene,
    CroupAngleGene,
    PasternAngleGene,
    ChestWidthGene
} from "../types/conformation-genetics.types";

//Generate random genetics for a foundation horse.
export function generateRandomConformationGenetics() : ConformationGenetics {
    return {
        shoulderSlope: randomGenes(8, ['i','m','u']) as ShoulderSlopeGene,
        shoulderAngle: randomGenes(8, ['c','m','o']) as ShoulderAngleGene,
        humerusLength: randomGenes(6, ['s','m','l']) as HumerusLengthGene,
        femurLength: randomGenes(2, ['s','m','l']) as FemurLengthGene,
        tibiaLength: randomGenes(2, ['s','m','l']) as TibiaLengthGene,
        witherHeight: randomGenes(4, ['l','m','h']) as WitherHeightGene,
        neckLength: randomGenes(4, ['s','m','l']) as NeckLengthGene,
        croupAngle: randomGenes(8, ['f','m','s']) as CroupAngleGene,
        pasternAngle: randomGenes(8, ['i','m','u']) as PasternAngleGene,
        chestWidth: randomGenes(4, ['n','m','w']) as ChestWidthGene
    }
}

//Choose alleles randomly given number needed and possible values.
function randomGenes<T>(numGenes: number, alleles: T[]): T[] {
    const result: T[] = [];

    for(let i=0; i<numGenes; i++){
        const randomIndex = Math.floor(Math.random()*alleles.length);
        result.push(alleles[randomIndex]);
    }
    return result;
}