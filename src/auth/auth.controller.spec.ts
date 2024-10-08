import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com', role: 'admin' }),
            login: jest.fn().mockResolvedValue({ access_token: 'mocked_token', role: 'admin' }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should register a new user with role', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        role: 'admin',
      };

      const result = await authController.register(registerDto);

      expect(result).toEqual({ id: 1, email: 'test@example.com', role: 'admin' });
      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('should login a user and return an access token with role', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await authController.login(loginDto);

      expect(result).toEqual({ access_token: 'mocked_token', role: 'admin' });
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });
});
