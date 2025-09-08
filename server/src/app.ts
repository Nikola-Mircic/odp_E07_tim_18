import express from 'express';
import cors from 'cors';
import { IAuthService } from './Domain/services/auth/IAuthService';
import { AuthService } from './Services/auth/AuthService';
import { IUserRepository } from './Domain/repositories/users/IUserRepository';
import { UserRepository } from './Database/repositories/users/UserRepository';
import { AuthController } from './WebAPI/controllers/AuthController';
import { IVestRepository } from './Domain/repositories/vesti/IVestRepository';
import { VestiRepository } from './Database/repositories/vesti/VestiRepository';
import { ITagRepository } from './Domain/repositories/tags/ITagRepository';
import { Tag } from './Domain/models/Tag';
import { TagRepository } from './Database/repositories/tags/TagRepository';
import { IUserService } from './Domain/services/users/IUserService';
import { UserService } from './Services/users/UserService';
import { IVestService } from './Domain/services/vesti/IVestService';
import { VestService } from './Services/vesti/VestService';
import { UserController } from './WebAPI/controllers/UserController';
import { VestController } from './WebAPI/controllers/VestController';
import { ICommentRepository } from './Domain/repositories/comment/ICommentRepository';
import { CommentRepository } from './Database/repositories/comments/CommentRepository';
import { ICommentService } from './Domain/services/comments/IComentService';
import { CommentsService } from './Services/comments/CommentsService';
import { CommentController } from './WebAPI/controllers/CommentController';
import { ITagService } from './Domain/services/tags/ITagService';
import { TagService } from './Services/Tag/TagService';
import { TagController } from './WebAPI/controllers/TagController';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Repositories
const userRepository: IUserRepository = new UserRepository();
const vestRepository: IVestRepository = new VestiRepository();
const tagsRepository: ITagRepository = new TagRepository();
const commentRepository: ICommentRepository = new CommentRepository();

// Services
const authService: IAuthService = new AuthService(userRepository);
const userService: IUserService = new UserService(userRepository);
const tagService: ITagService = new TagService(tagsRepository);
const vestService: IVestService = new VestService(vestRepository, userService, tagService);
const commentService: ICommentService = new CommentsService(commentRepository, userService, vestService);


// WebAPI routes
const authController = new AuthController(authService);
const userController = new UserController(userService);
const vestController = new VestController(vestService, userService);
const commentController = new CommentController(commentService); 
const tagController = new TagController(tagService);

// Registering routes
app.use('/api/v1', authController.getRouter());
app.use('/api/v1', userController.getRouter());
app.use('/api/v1', vestController.getRouter());
app.use('/api/v1', commentController.getRouter());
app.use('/api/v1', tagController.getRouter());

export default app;