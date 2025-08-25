import express from 'express';
import cors from 'cors';
import { IAuthService } from './Domain/services/auth/IAuthService';
import { AuthService } from './Services/auth/AuthService';
import { IUserRepository } from './Domain/repositories/users/IUserRepository';
import { UserRepository } from './Database/repositories/users/UserRepository';
import { AuthController } from './WebAPI/controllers/AuthController';
import { IVestRepository } from './Domain/repositories/vesti/IVestRepository';
import { VestiRepository } from './Database/repositories/vesti/VestiRepository';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Repositories
const userRepository: IUserRepository = new UserRepository();
const vestRepository: IVestRepository = new VestiRepository();

vestRepository.getByTime().then(res => console.log(res));

// Services
//const authService: IAuthService = new AuthService(userRepository);

// WebAPI routes
//const authController = new AuthController(authService);

// Registering routes
//app.use('/api/v1', authController.getRouter());

export default app;