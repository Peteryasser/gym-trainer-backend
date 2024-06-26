import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IngredientService } from './ingredient.service';
import { IngredientCategory } from 'src/entity/ingredient_categories.entity';
import { Ingredient } from 'src/entity/ingredients.entity';
import { SavedIngredients } from 'src/entity/saved_ingredients.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CSVReaderService } from 'src/utils/Readers/csv_reader.service'; // Ensure this path is correct

describe('IngredientService', () => {
  let service: IngredientService;
  let ingredientRepository: Repository<Ingredient>;
  let savedIngredientsRepository: Repository<SavedIngredients>;
  let csvReaderService: CSVReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientService,
        {
          provide: getRepositoryToken(IngredientCategory),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Ingredient),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(SavedIngredients),
          useClass: Repository,
        },
        {
          provide: CSVReaderService,
          useValue: { /* mock implementation if necessary */ },
        },
      ],
    }).compile();

    service = module.get<IngredientService>(IngredientService);
    ingredientRepository = module.get<Repository<Ingredient>>(getRepositoryToken(Ingredient));
    savedIngredientsRepository = module.get<Repository<SavedIngredients>>(getRepositoryToken(SavedIngredients));
    csvReaderService = module.get<CSVReaderService>(CSVReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveIngredient', () => {
    it('should save an ingredient for the user and return the saved ingredient', async () => {
        const ingredient = { id: 1, category: {} } as Ingredient;
        const user = { id: 1 } as User;
        const savedIngredient = { id: 1, user, ingredient } as SavedIngredients;
    
        jest.spyOn(ingredientRepository, 'findOne').mockResolvedValue(ingredient);
        jest.spyOn(savedIngredientsRepository, 'create').mockReturnValue(savedIngredient);
        jest.spyOn(savedIngredientsRepository, 'save').mockResolvedValue(savedIngredient); // Adjusted to resolve with savedIngredient
    
        const result = await service.saveIngredient(1, user);
    
        expect(result).toEqual(savedIngredient);
        expect(ingredientRepository.findOne).toHaveBeenCalledWith({
          where: { id: 1 },
          relations: ['category'],
        });
        expect(savedIngredientsRepository.create).toHaveBeenCalledWith({
          user,
          ingredient,
        });
        expect(savedIngredientsRepository.save).toHaveBeenCalledWith(savedIngredient); // Ensure save returns savedIngredient
      });

    it('should throw NotFoundException if ingredient does not exist', async () => {
      const user = { id: 1 } as User;

      jest.spyOn(ingredientRepository, 'findOne').mockResolvedValue(null);

      await expect(service.saveIngredient(1, user)).rejects.toThrow(NotFoundException);
    });
  });

  describe('unSaveIngredient', () => {
    it('should unsave an ingredient for the user', async () => {
      const savedIngredient = { id: 1 } as SavedIngredients;
      const user = { id: 1 } as User;

      jest.spyOn(savedIngredientsRepository, 'findOne').mockResolvedValue(savedIngredient);
      jest.spyOn(savedIngredientsRepository, 'delete').mockResolvedValue(undefined);

      await expect(service.unSaveIngredient(1, user)).resolves.not.toThrow();

      expect(savedIngredientsRepository.findOne).toHaveBeenCalledWith({
        where: { ingredient: { id: 1 }, user: { id: user.id } },
      });
      expect(savedIngredientsRepository.delete).toHaveBeenCalledWith({ id: savedIngredient.id });
    });

    it('should throw NotFoundException if saved ingredient does not exist', async () => {
      const user = { id: 1 } as User;

      jest.spyOn(savedIngredientsRepository, 'findOne').mockResolvedValue(null);

      await expect(service.unSaveIngredient(1, user)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAllSaved', () => {
    it('should return all saved ingredients for the user', async () => {
      const user = { id: 1 } as User;
      const savedIngredients = [
        { ingredient: { id: 1, category: {} } },
        { ingredient: { id: 2, category: {} } },
      ] as SavedIngredients[];

      jest.spyOn(savedIngredientsRepository, 'find').mockResolvedValue(savedIngredients);

      const result = await service.getAllSaved(user);

      expect(result).toEqual([
        { id: 1, category: {} },
        { id: 2, category: {} },
      ]);
    });

    it('should throw NotFoundException if no saved ingredients are found', async () => {
      const user = { id: 1 } as User;

      jest.spyOn(savedIngredientsRepository, 'find').mockResolvedValue([]);

      await expect(service.getAllSaved(user)).rejects.toThrow(NotFoundException);
    });
  });
});
