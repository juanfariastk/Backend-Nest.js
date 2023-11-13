import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { LocalAuthGuard } from './local-auth.guard';

interface userData {
  email: string;
  password: string;
}

@Controller('login')
export class AuthorizationController {
  constructor(private readonly authService: AuthorizationService) {}
  @Post('')
  @UseGuards(LocalAuthGuard)
  async login(@Body() user: userData) {
    return this.authService.login(user.email);
  }
  /*
  @Post()
  create(@Body() createAuthorizationDto: CreateAuthorizationDto) {
    return this.authorizationService.create(createAuthorizationDto);
  }

  @Get()
  findAll() {
    return this.authorizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorizationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorizationDto: UpdateAuthorizationDto) {
    return this.authorizationService.update(+id, updateAuthorizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorizationService.remove(+id);
  }
  */
}