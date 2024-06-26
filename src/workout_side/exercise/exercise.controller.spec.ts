// // write me unit tests for controller methods

// import { Test, TestingModule } from '@nestjs/testing';
// import { ExerciseController } from './exercise.controller';
// import { ExerciseService } from './exercise.service';
// import { DTORequest } from './dtos/exercise_dto_request';
// import { User } from 'src/entity/user.entity';

// describe('ExerciseController', () => {
//   let controller: ExerciseController;
//   let service: ExerciseService;

//   const mockExerciseService = {
//     createNewExerciseByUser: jest.fn(),
//     deleteExerciseByUser: jest.fn(),
//     getExercisesByUser: jest.fn(),
//     update: jest.fn(),
//     getBodyParts: jest.fn(),
//     getEquipments: jest.fn(),
//     getMuscles: jest.fn(),
//     getAllExercisesfromDB: jest.fn(),
//     getNewExerciseWithVersion: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ExerciseController],
//       providers: [{ provide: ExerciseService, useValue: mockExerciseService }],
//     }).compile();

//     controller = module.get<ExerciseController>(ExerciseController);
//     service = module.get<ExerciseService>(ExerciseService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   it('should create an exercise', async () => {
//     const dto: DTORequest = {
//       bodyPart: 'legs',
//       equipments: ['dumbbell'],
//       gifUrl: 'url',
//       name: 'Squat',
//       target: 'quads',
//       secondaryMuscles: ['hamstrings'],
//       instructions: ['step1', 'step2'],
//     };
//     const user = new User();
//     user.id = 13;

//     mockExerciseService.createNewExerciseByUser.mockResolvedValue(
//       'Exercise created successfully',
//     );

//     expect(await controller.createExercise(dto, user)).toBe(
//       'Exercise created successfully',
//     );
//     expect(mockExerciseService.createNewExerciseByUser).toHaveBeenCalledWith(
//       dto,
//       user,
//     );
//   });
// });

// // stop here to run it to make sure it works
