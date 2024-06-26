import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseService } from './exercise.service';
import { ConnectionManager } from 'src/config/connection_manager';
import { User } from 'src/entity/user.entity';
import { Exercise } from 'src/entity/exercise.entity';
import { BodyPart } from 'src/entity/bodyPart';
import { Equipment } from 'src/entity/equipment';
import { Muscle } from 'src/entity/muscle';
import { Instruction } from 'src/entity/instruction';
import { DTORequest } from 'src/workout_side/exercise/dtos/exercise_dto_request';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockFindOne = jest.fn();
const mockSave = jest.fn();

const mockConnectionManager = {
  getConnection: jest.fn().mockResolvedValue({
    manager: {
      findOne: mockFindOne,
      save: mockSave,
    },
  }),
};

describe('ExerciseService', () => {
  let service: ExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseService,
        {
          provide: ConnectionManager,
          useValue: mockConnectionManager,
        },
        {
          provide: getRepositoryToken(Exercise),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(BodyPart),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Equipment),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Muscle),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Instruction),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNewExerciseByUser', () => {
    it('should create a new exercise for the user', async () => {
      const dto: DTORequest = {
        bodyPart: 'Legs',
        equipments: ['Dumbbell', 'Bench'],
        gifUrl: 'http://example.com/gif',
        name: 'Squat',
        target: 'Quadriceps',
        secondaryMuscles: ['Glutes', 'Hamstrings'],
        instructions: [
          'Stand with feet shoulder-width apart',
          'Lower your body',
        ],
      };

      const user: User = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
      } as User;

      const connection = await mockConnectionManager.getConnection();
      const mockManager = connection.manager;

      console.log('mockManager', mockManager);

      // Mock findOne implementation
      mockFindOne.mockImplementation((entity, options) => {
        if (entity === BodyPart) {
          return null; // Simulate BodyPart not found
        } else if (entity === Equipment) {
          return null; // Simulate Equipment not found
        } else if (entity === Muscle) {
          return null; // Simulate Muscle not found
        } else {
          return null; // Default case
        }
      });

      mockSave.mockImplementation((entity) => Promise.resolve(entity));

      const result = await service.createNewExerciseByUser(dto, user);
      expect(result).toBe('Exercise created successfully');

      expect(mockFindOne).toHaveBeenCalledTimes(7);
      expect(mockSave).toHaveBeenCalledTimes(1);
    }, 10000); // Increased timeout to 10000 ms (10 seconds)
  });
});
