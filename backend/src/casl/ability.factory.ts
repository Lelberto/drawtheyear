import { AbilityTuple, ExtractSubjectType, MongoAbility, MongoQuery, Subject, defineAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Emotion } from '../models/emotions/entities/emotion.entity';
import { User } from '../models/users/entities/user.entity';
import { Action } from './action.enum';
import { Role } from '../common/constants/role.enum';

type AppAbility = MongoAbility<AbilityTuple, MongoQuery>;

@Injectable()
export class AbilityFactory {

  public createForUser(user: User): AppAbility {
    return defineAbility(can => {
      switch (user.role) {
        case Role.ADMIN:
          can(Action.MANAGE, 'all');
          break;
        case Role.USER:
          can(Action.READ, User);
          can(Action.UPDATE, User, { id: user.id });
          can(Action.READ, Emotion);
          can(Action.CREATE, Emotion);
          can(Action.UPDATE, Emotion, { userId: user.id });
          can(Action.DELETE, Emotion, { userId: user.id });
          break;
      }
    }, {
      detectSubjectType: subject => subject.constructor as ExtractSubjectType<Subject>
    });
  }
}
