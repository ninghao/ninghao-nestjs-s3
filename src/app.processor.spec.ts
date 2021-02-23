import { Test, TestingModule } from '@nestjs/testing';
import { AppProcessor } from './app.processor';

describe('AppProcessor', () => {
  let provider: AppProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppProcessor],
    }).compile();

    provider = module.get<AppProcessor>(AppProcessor);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
