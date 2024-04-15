export type ExerciseCreationParams = {
    "bodyPart":BodyPartCreationParams,
    "equipment":EquipmentCreationParams,
    "gifUrl":string,
    "name":string,
    "target":MuscleCreationParams,
    "secondaryMuscles":MuscleCreationParams[],
    "instructions":InstructionCreationParams[]
}

export type InstructionCreationParams = {
    'description': string,
    'order': number
}

export type MuscleCreationParams = {
    'name': string
}

export type BodyPartCreationParams = {
    'name': string
}

export type EquipmentCreationParams = {
    'name': string
}