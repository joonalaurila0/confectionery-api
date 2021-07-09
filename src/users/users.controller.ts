import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from './user.entity';
import { ChangePasswordDto, ChangeEmailDto, CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UserRoleValidationPipe } from './pipes/user-role-validation.pipe';
import { GetUser } from './get_user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUsers(@Query(ValidationPipe) searchUserDto: SearchUserDto): Promise<User[]> {
    return this.usersService.getUsers(searchUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getUser(@GetUser() user: User): Promise<User> {
    return this.usersService.getUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/role')
  getRoleByUser(@GetUser() user: User): Promise<UserRole> {
    return this.usersService.getRoleByUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/role')
  getRole(@Param('id') id: string): Promise<User> {
    return this.usersService.getRole(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('changepw')
  changePassword(
    @GetUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto
  ): Promise<string> {
    return this.usersService.changePassword(user, changePasswordDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('email')
  changeEmail(@GetUser() user: User, @Body() changeEmailDto: ChangeEmailDto): Promise<string> {
    return this.usersService.changeEmail(user, changeEmailDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/role')
  updateUserRole(
    @Param('id') id: string,
    @Body('role', UserRoleValidationPipe) role: UserRole
  ): Promise<UserRole> {
    return this.usersService.updateUserRole(id, role);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUserById(id);
  }
}
