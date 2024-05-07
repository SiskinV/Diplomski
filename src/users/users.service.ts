import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // here when creating a user create new vault in my tenant with address and give him a address to populate here
    const user = new User({
      ...createUserDto,
      addresses: [],
    });

    await this.entityManager.save(user);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
      relations: { addresses: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // check if old password is same as one we have if yes set new password

    const user = await this.usersRepository.findOne({ where: { id } });

    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }

    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }

    if (
      updateUserDto.oldPassword &&
      user.password === updateUserDto.oldPassword
    ) {
      user.password = updateUserDto.newPassword;
    }

    await this.entityManager.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
